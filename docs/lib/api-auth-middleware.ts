// API Authentication Middleware
import { NextRequest, NextResponse } from 'next/server';
import { extractApiKey, verifyApiKey, checkRateLimit, logApiAccess, hasApiPermission } from './api-key';
import { getCurrentUser } from './auth';
import type { ApiResponse } from '../../types';

export interface ApiAuthOptions {
  requireApiKey?: boolean;
  requireAuth?: boolean;
  requiredPermission?: string;
  allowedServiceTypes?: ('internal' | 'external' | 'service-account')[];
}

/**
 * API Authentication Middleware
 * Supports both API Key and JWT Token authentication
 */
export async function apiAuth(
  request: NextRequest,
  options: ApiAuthOptions = {}
): Promise<{
  authorized: boolean;
  response?: NextResponse;
  serviceAccount?: any;
  user?: any;
}> {
  const {
    requireApiKey = false,
    requireAuth = false,
    requiredPermission,
    allowedServiceTypes,
  } = options;

  const startTime = Date.now();
  const ipAddress = request.headers.get('x-forwarded-for') ||
    request.headers.get('x-real-ip') ||
    'unknown';
  const userAgent = request.headers.get('user-agent') || 'unknown';
  const endpoint = request.nextUrl.pathname;
  const method = request.method;

  // Try API Key authentication first
  const apiKey = extractApiKey(request);
  if (apiKey) {
    const validation = await verifyApiKey(apiKey);

    if (!validation.valid || !validation.serviceAccount) {
      const responseTime = Date.now() - startTime;
      await logApiAccess(
        null,
        apiKey,
        endpoint,
        method,
        ipAddress,
        userAgent,
        401,
        responseTime
      );

      return {
        authorized: false,
        response: NextResponse.json<ApiResponse<null>>({
          success: false,
          error: validation.error || 'Invalid API key',
        }, { status: 401 }),
      };
    }

    const serviceAccount = validation.serviceAccount;

    // Check service type
    if (allowedServiceTypes && !allowedServiceTypes.includes(serviceAccount.serviceType)) {
      const responseTime = Date.now() - startTime;
      await logApiAccess(
        serviceAccount.id,
        apiKey,
        endpoint,
        method,
        ipAddress,
        userAgent,
        403,
        responseTime
      );

      return {
        authorized: false,
        response: NextResponse.json<ApiResponse<null>>({
          success: false,
          error: 'Service type not allowed',
        }, { status: 403 }),
      };
    }

    // Check permission
    if (requiredPermission && !hasApiPermission(serviceAccount, requiredPermission)) {
      const responseTime = Date.now() - startTime;
      await logApiAccess(
        serviceAccount.id,
        apiKey,
        endpoint,
        method,
        ipAddress,
        userAgent,
        403,
        responseTime
      );

      return {
        authorized: false,
        response: NextResponse.json<ApiResponse<null>>({
          success: false,
          error: 'Insufficient permissions',
        }, { status: 403 }),
      };
    }

    // Check rate limit
    const rateLimit = await checkRateLimit(apiKey, serviceAccount.rateLimitPerMinute);
    if (!rateLimit.allowed) {
      const responseTime = Date.now() - startTime;
      await logApiAccess(
        serviceAccount.id,
        apiKey,
        endpoint,
        method,
        ipAddress,
        userAgent,
        429,
        responseTime
      );

      return {
        authorized: false,
        response: NextResponse.json<ApiResponse<null>>({
          success: false,
          error: 'Rate limit exceeded',
        }, {
          status: 429,
          headers: {
            'X-RateLimit-Limit': serviceAccount.rateLimitPerMinute.toString(),
            'X-RateLimit-Remaining': rateLimit.remaining.toString(),
            'Retry-After': '60',
          },
        }),
      };
    }

    return {
      authorized: true,
      serviceAccount,
    };
  }

  // If API key is required but not provided
  if (requireApiKey) {
    const responseTime = Date.now() - startTime;
    await logApiAccess(
      null,
      'none',
      endpoint,
      method,
      ipAddress,
      userAgent,
      401,
      responseTime
    );

    return {
      authorized: false,
      response: NextResponse.json<ApiResponse<null>>({
        success: false,
        error: 'API key required',
      }, { status: 401 }),
    };
  }

  // Try JWT authentication
  if (requireAuth) {
    const user = await getCurrentUser();
    if (!user) {
      const responseTime = Date.now() - startTime;
      await logApiAccess(
        null,
        'none',
        endpoint,
        method,
        ipAddress,
        userAgent,
        401,
        responseTime
      );

      return {
        authorized: false,
        response: NextResponse.json<ApiResponse<null>>({
          success: false,
          error: 'Authentication required',
        }, { status: 401 }),
      };
    }

    return {
      authorized: true,
      user,
    };
  }

  // No authentication required
  return {
    authorized: true,
  };
}
