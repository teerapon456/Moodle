'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { authenticateUser } from '@/app/database/mockData';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [ssoLoading, setSsoLoading] = useState(false);
  const [microsoftLoading, setMicrosoftLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    // Simulate authentication delay
    setTimeout(() => {
      // Authenticate user
      const user = authenticateUser(formData.email, formData.password);
      
      if (user) {
        // Store user data
        localStorage.setItem('user', JSON.stringify({
          id: user.id,
          name: user.name,
          email: user.email,
          employeeId: user.employeeId,
          role: user.role,
          department: user.department,
          division: user.division,
          position: user.position,
          avatar: user.avatar,
          authMethod: 'Form',
          loginTime: new Date().toISOString(),
        }));
        localStorage.setItem('authToken', 'mock_token_' + Date.now());
        
        // Redirect based on role
        const redirectMap: Record<string, string> = {
          'learner': '/learner',
          'instructor': '/instructor',
          'admin': '/admin',
          'course-creator': '/instructor',
        };
        
        const redirectPath = redirectMap[user.role] || '/dashboard';
        router.push(redirectPath);
      } else {
        // Show error message
        setErrors({
          general: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง',
        });
      }
      
      setLoading(false);
    }, 1000);
  };

  // Mock SSO Login Handler
  const handleSSOLogin = () => {
    setSsoLoading(true);
    
    // Simulate SSO authentication flow
    setTimeout(() => {
      // Mock SSO response with user data
      const ssoUserData = {
        id: 'SSO001',
        name: 'วิชัย สมบูรณ์',
        email: 'wichai.s@company.com',
        employeeId: 'EMP001',
        role: 'instructor',
        department: 'ฝ่ายพัฒนาบุคลากร',
        division: 'ส่วนฝึกอบรม',
        position: 'วิทยากรอาวุโส',
        avatar: 'https://i.pravatar.cc/150?img=12',
        authMethod: 'SSO',
        loginTime: new Date().toISOString(),
      };

      // Store user data
      localStorage.setItem('user', JSON.stringify(ssoUserData));
      localStorage.setItem('authToken', 'mock_sso_token_' + Date.now());
      
      // Redirect based on role
      const redirectPath = ssoUserData.role === 'instructor' ? '/instructor' : '/dashboard';
      router.push(redirectPath);
      setSsoLoading(false);
    }, 2000); // Simulate network delay
  };

  // Mock Microsoft Login Handler
  const handleMicrosoftLogin = () => {
    setMicrosoftLoading(true);
    
    // Simulate Microsoft OAuth flow
    setTimeout(() => {
      // Mock Microsoft response with user data
      const microsoftUserData = {
        id: 'MS365001',
        name: 'สุรชัย ทองดี',
        email: 'surachai.t@company.com',
        employeeId: 'EMP002',
        role: 'admin',
        department: 'ฝ่าย IT',
        division: 'ส่วนระบบสารสนเทศ',
        position: 'ผู้จัดการระบบ',
        avatar: 'https://i.pravatar.cc/150?img=33',
        authMethod: 'Microsoft',
        microsoftId: 'ms_' + Date.now(),
        loginTime: new Date().toISOString(),
      };

      // Store user data
      localStorage.setItem('user', JSON.stringify(microsoftUserData));
      localStorage.setItem('authToken', 'mock_microsoft_token_' + Date.now());
      
      // Redirect based on role
      const redirectPath = microsoftUserData.role === 'admin' ? '/admin' : '/dashboard';
      router.push(redirectPath);
      setMicrosoftLoading(false);
    }, 2000); // Simulate network delay
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 px-4 py-6 sm:py-12">
      <div className="w-full max-w-[420px]">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-6 sm:p-8">
          {/* Logo & Title */}
          <div className="text-center mb-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-[#A21D21] to-[#8B1538] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg transform hover:scale-105 transition-transform">
              <svg className="w-9 h-9 sm:w-11 sm:h-11 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[#A21D21] to-[#8B1538] bg-clip-text text-transparent mb-2">ยินดีต้อนรับกลับมา</h1>
            <p className="text-gray-600 dark:text-gray-400 text-sm">เข้าสู่ระบบเพื่อเริ่มเรียนและพัฒนาทักษะของคุณ</p>
          </div>

          {/* Divider */}
          <div className="relative mb-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-3 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 font-medium">เข้าสู่ระบบด้วย</span>
            </div>
          </div>

          <div className="space-y-5">{/* Form Container */}
            {/* Error Message */}
            {errors.general && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 flex items-start">
                <svg className="w-5 h-5 text-red-600 dark:text-red-400 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-sm text-red-800 dark:text-red-300 font-medium">{errors.general}</p>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4 mb-5">
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                  อีเมลหรือรหัสพนักงาน
                </label>
                <div className="relative group">
                  <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500 group-focus-within:text-[#A21D21] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <input
                    type="text"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-10 pr-3 py-2.5 text-sm border-2 border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#A21D21] focus:border-[#A21D21] transition-all bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 hover:border-gray-300 dark:hover:border-gray-500"
                    placeholder="user@company.com หรือ EMP001"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                  รหัสผ่าน
                </label>
                <div className="relative group">
                  <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500 group-focus-within:text-[#A21D21] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <input
                    type="password"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full pl-10 pr-3 py-2.5 text-sm border-2 border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#A21D21] focus:border-[#A21D21] transition-all bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 hover:border-gray-300 dark:hover:border-gray-500"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={formData.rememberMe}
                    onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
                    className="w-3.5 h-3.5 text-[#A21D21] border-gray-300 dark:border-gray-600 rounded focus:ring-[#A21D21] cursor-pointer"
                  />
                  <span className="ml-2 text-xs text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-200 transition-colors">จดจำการเข้าสู่ระบบ</span>
                </label>
                <Link href="/forgot-password" className="text-xs text-[#A21D21] dark:text-[#C92828] hover:text-[#7A1818] dark:hover:text-[#A21D21] font-semibold transition-colors hover:underline">
                  ลืมรหัสผ่าน?
                </Link>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full px-4 py-3 bg-gradient-to-r from-[#A21D21] to-[#8B1538] text-white rounded-lg hover:from-[#8B1538] hover:to-[#A21D21] transition-all font-bold text-sm disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    กำลังเข้าสู่ระบบ...
                  </span>
                ) : 'เข้าสู่ระบบ'}
              </button>
            </form>

            {/* SSO Buttons */}
            <div className="grid grid-cols-1 gap-2.5">
              <button
                type="button"
                onClick={handleSSOLogin}
                disabled={ssoLoading || microsoftLoading || loading}
                className="w-full flex items-center justify-center px-4 py-2.5 text-sm border-2 border-[#A21D21] rounded-lg bg-white dark:bg-gray-800 text-[#A21D21] dark:text-[#C92828] hover:bg-[#A21D21] hover:text-white dark:hover:bg-[#A21D21] transition-all font-bold shadow-sm hover:shadow-md transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {ssoLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    กำลังเชื่อมต่อ SSO...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    เข้าสู่ระบบด้วย SSO (Single Sign-On)
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={handleMicrosoftLogin}
                disabled={ssoLoading || microsoftLoading || loading}
                className="w-full flex items-center justify-center px-4 py-2.5 text-sm border-2 border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-500 transition-all font-bold shadow-sm hover:shadow-md transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {microsoftLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    กำลังเชื่อมต่อ Microsoft...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4 mr-2" viewBox="0 0 23 23" fill="none">
                      <path d="M0 0h10.5v10.5H0V0z" fill="#F25022" />
                      <path d="M12.5 0H23v10.5H12.5V0z" fill="#7FBA00" />
                      <path d="M0 12.5h10.5V23H0V12.5z" fill="#00A4EF" />
                      <path d="M12.5 12.5H23V23H12.5V12.5z" fill="#FFB900" />
                    </svg>
                    เข้าสู่ระบบด้วย Microsoft
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 pt-5 border-t border-gray-200 dark:border-gray-700">
            <p className="text-center text-xs text-gray-600 dark:text-gray-400">
              ยังไม่มีบัญชี?{' '}
              <Link href="/register" className="text-[#A21D21] dark:text-[#C92828] hover:text-[#7A1818] dark:hover:text-[#A21D21] font-bold transition-colors hover:underline">
                สมัครสมาชิก
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
