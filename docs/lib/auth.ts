// Authentication Utilities
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import type { User, UserRole } from '../../types';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const JWT_EXPIRES_IN = '7d';

export interface JWTPayload {
  userId: string;
  email: string;
  role: UserRole;
  moodleUserId?: number;
}

/**
 * Hash password using bcrypt
 */
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

/**
 * Verify password
 */
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

/**
 * Generate JWT token
 */
export function generateToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
}

/**
 * Verify and decode JWT token
 */
export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  } catch (error) {
    return null;
  }
}

/**
 * Get current user from token
 */
export async function getCurrentUser(): Promise<JWTPayload | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth-token')?.value;

    if (!token) {
      return null;
    }

    return verifyToken(token);
  } catch (error) {
    return null;
  }
}

/**
 * Set authentication token in cookie
 */
export async function setAuthToken(token: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set('auth-token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  });
}

/**
 * Remove authentication token
 */
export async function removeAuthToken(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete('auth-token');
}

/**
 * Check if user has required role
 */
export function hasRole(user: JWTPayload | null, requiredRole: UserRole | UserRole[]): boolean {
  if (!user) return false;

  const roles: UserRole[] = ['learner', 'instructor', 'course-creator', 'admin'];
  const userRoleIndex = roles.indexOf(user.role);

  if (Array.isArray(requiredRole)) {
    return requiredRole.some(role => {
      const requiredRoleIndex = roles.indexOf(role);
      return userRoleIndex >= requiredRoleIndex;
    });
  }

  const requiredRoleIndex = roles.indexOf(requiredRole);
  return userRoleIndex >= requiredRoleIndex;
}

/**
 * Require authentication middleware
 */
export async function requireAuth(requiredRole?: UserRole | UserRole[]): Promise<JWTPayload> {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error('Unauthorized');
  }

  if (requiredRole && !hasRole(user, requiredRole)) {
    throw new Error('Forbidden');
  }

  return user;
}
