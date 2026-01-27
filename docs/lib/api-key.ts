// API Key Management and Validation
import crypto from 'crypto';
import { dbCustom } from './db-custom';
import type { ApiResponse } from '../../types';

export interface ServiceAccount {
  id: number;
  name: string;
  description?: string;
  apiKey: string;
  apiSecret: string;
  serviceType: 'internal' | 'external' | 'service-account';
  permissions: Record<string, any>;
  rateLimitPerMinute: number;
  isActive: boolean;
  expiresAt?: Date;
  lastUsedAt?: Date;
}

export interface ApiKeyValidationResult {
  valid: boolean;
  serviceAccount?: ServiceAccount;
  error?: string;
}

/**
 * Generate API Key and Secret
 */
export function generateApiKey(): { apiKey: string; apiSecret: string } {
  const apiKey = `sk_${crypto.randomBytes(32).toString('hex')}`;
  const apiSecret = crypto.randomBytes(64).toString('hex');
  return { apiKey, apiSecret };
}

/**
 * Hash API Secret
 */
export function hashApiSecret(secret: string): string {
  return crypto.createHash('sha256').update(secret).digest('hex');
}

/**
 * Verify API Key from request
 */
export async function verifyApiKey(apiKey: string): Promise<ApiKeyValidationResult> {
  try {
    // Check environment variables first (for system keys)
    const systemApiKey = process.env.SYSTEM_API_KEY;
    const systemApiSecret = process.env.SYSTEM_API_SECRET;

    if (systemApiKey && apiKey === systemApiKey) {
      return {
        valid: true,
        serviceAccount: {
          id: 0,
          name: 'System API Key',
          apiKey: systemApiKey,
          apiSecret: systemApiSecret || '',
          serviceType: 'internal',
          permissions: { '*': true },
          rateLimitPerMinute: 1000,
          isActive: true,
        } as ServiceAccount,
      };
    }

    // Check database for service accounts
    const sql = `
      SELECT * FROM service_accounts 
      WHERE api_key = ? AND is_active = TRUE 
      AND (expires_at IS NULL OR expires_at > NOW())
    `;
    const accounts = await dbCustom.query<ServiceAccount>(sql, [apiKey]);

    if (accounts.length === 0) {
      return {
        valid: false,
        error: 'Invalid API key',
      };
    }

    const account = accounts[0];

    // Update last used timestamp
    await dbCustom.query(
      'UPDATE service_accounts SET last_used_at = NOW() WHERE id = ?',
      [account.id]
    );

    return {
      valid: true,
      serviceAccount: account,
    };
  } catch (error: any) {
    return {
      valid: false,
      error: error.message || 'API key verification failed',
    };
  }
}

/**
 * Check if API key has permission
 */
export function hasApiPermission(
  serviceAccount: ServiceAccount,
  permission: string
): boolean {
  if (!serviceAccount.permissions) return false;

  // Check wildcard permission
  if (serviceAccount.permissions['*'] === true) return true;

  // Check specific permission
  return serviceAccount.permissions[permission] === true;
}

/**
 * Log API access
 */
export async function logApiAccess(
  serviceAccountId: number | null,
  apiKey: string,
  endpoint: string,
  method: string,
  ipAddress: string,
  userAgent: string,
  statusCode: number,
  responseTimeMs: number
): Promise<void> {
  try {
    const sql = `
      INSERT INTO api_access_logs 
      (service_account_id, api_key, endpoint, method, ip_address, user_agent, status_code, response_time_ms)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    await dbCustom.query(sql, [
      serviceAccountId,
      apiKey,
      endpoint,
      method,
      ipAddress,
      userAgent,
      statusCode,
      responseTimeMs,
    ]);
  } catch (error) {
    // Log error but don't throw
    console.error('Failed to log API access:', error);
  }
}

/**
 * Check rate limit
 */
export async function checkRateLimit(
  apiKey: string,
  rateLimitPerMinute: number
): Promise<{ allowed: boolean; remaining: number }> {
  try {
    const oneMinuteAgo = new Date(Date.now() - 60000);
    const sql = `
      SELECT COUNT(*) as count 
      FROM api_access_logs 
      WHERE api_key = ? AND created_at > ?
    `;
    const result = await dbCustom.query<{ count: number }>(sql, [apiKey, oneMinuteAgo]);
    const count = result[0]?.count || 0;
    const remaining = Math.max(0, rateLimitPerMinute - count);

    return {
      allowed: count < rateLimitPerMinute,
      remaining,
    };
  } catch (error) {
    // On error, allow the request
    return { allowed: true, remaining: rateLimitPerMinute };
  }
}

/**
 * Extract API key from request
 */
export function extractApiKey(request: Request): string | null {
  // Check Authorization header: Bearer <api-key>
  const authHeader = request.headers.get('authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }

  // Check X-API-Key header
  const apiKeyHeader = request.headers.get('x-api-key');
  if (apiKeyHeader) {
    return apiKeyHeader;
  }

  // Check query parameter (less secure, not recommended)
  const url = new URL(request.url);
  const apiKeyParam = url.searchParams.get('api_key');
  if (apiKeyParam) {
    return apiKeyParam;
  }

  return null;
}
