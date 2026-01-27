'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');

  // Featured courses
  const featuredCourses = [
    {
      id: 1,
      title: 'มาตรฐานความปลอดภัยในโรงงาน',
      instructor: 'ดร.สมชาย ใจดี',
      category: 'ความปลอดภัย',
      level: 'L2',
      duration: '20 ชั่วโมง',
      enrolled: 1234,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400',
      price: 'ฟรี',
      badge: 'ยอดนิยม'
    },
    {
      id: 2,
      title: 'การใช้งาน ERP System สำหรับการผลิต',
      instructor: 'อ.วิไล เก่งมาก',
      category: 'เทคโนโลยี',
      level: 'L3',
      duration: '25 ชั่วโมง',
      enrolled: 856,
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400',
      price: 'ฟรี',
      badge: 'ใหม่'
    },
    {
      id: 3,
      title: 'การควบคุมคุณภาพผลิตภัณฑ์',
      instructor: 'อ.สมหญิง รักงาน',
      category: 'คุณภาพ',
      level: 'L2',
      duration: '18 ชั่วโมง',
      enrolled: 2341,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400',
      price: 'ฟรี',
      badge: 'แนะนำ'
    },
    {
      id: 4,
      title: 'Digital Transformation for Manufacturing',
      instructor: 'ดร.ดิจิทัล นวัตกรรม',
      category: 'Digital & Innovation',
      level: 'L3-L6',
      duration: '35 ชั่วโมง',
      enrolled: 567,
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400',
      price: 'ฟรี',
      badge: 'พิเศษ'
    }
  ];

  // Categories
  const categories = [
    { name: 'ความปลอดภัย', icon: '🛡️', count: 45, color: 'bg-red-500' },
    { name: 'เทคโนโลยี', icon: '💻', count: 38, color: 'bg-blue-500' },
    { name: 'คุณภาพ', icon: '✅', count: 29, color: 'bg-green-500' },
    { name: 'การจัดการ', icon: '📊', count: 52, color: 'bg-purple-500' },
    { name: 'ทักษะอ่อน', icon: '🤝', count: 31, color: 'bg-yellow-500' },
    { name: 'Digital', icon: '🚀', count: 24, color: 'bg-indigo-500' }
  ];

  // Learning paths
  const learningPaths = [
    {
      title: 'เส้นทางการเป็นผู้จัดการคุณภาพ',
      description: 'พัฒนาทักษะด้านการจัดการคุณภาพอย่างครบวงจร',
      courses: 5,
      duration: '80 ชั่วโมง',
      level: 'L2-L4',
      color: 'bg-green-500'
    },
    {
      title: 'เส้นทาง Digital Transformation',
      description: 'เตรียมพร้อมสำหรับยุคดิจิทัล 4.0',
      courses: 6,
      duration: '120 ชั่วโมง',
      level: 'L3-L6',
      color: 'bg-blue-500'
    },
    {
      title: 'เส้นทางการเป็น Safety Officer',
      description: 'พัฒนาทักษะด้านความปลอดภัยในโรงงาน',
      courses: 4,
      duration: '60 ชั่วโมง',
      level: 'L1-L3',
      color: 'bg-red-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-[#A21D21] rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">E</span>
                </div>
                <span className="text-xl font-bold text-gray-900">E-Learning</span>
              </Link>

              <nav className="hidden md:flex space-x-6">
                <Link href="/catalog" className="text-gray-700 hover:text-[#A21D21] font-medium">หลักสูตรทั้งหมด</Link>
                <Link href="/learning-paths" className="text-gray-700 hover:text-[#A21D21] font-medium">เส้นทางการเรียน</Link>
                <Link href="/about" className="text-gray-700 hover:text-[#A21D21] font-medium">เกี่ยวกับเรา</Link>
                <Link href="/contact" className="text-gray-700 hover:text-[#A21D21] font-medium">ติดต่อ</Link>
              </nav>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative hidden md:block">
                <input
                  type="text"
                  placeholder="ค้นหาหลักสูตร..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64 px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A21D21]"
                />
                <svg className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              <Link href="/learn" className="px-4 py-2 bg-[#A21D21] text-white rounded-lg hover:bg-[#8A1919] transition-colors font-medium">
                เข้าเรียน
              </Link>
              <Link href="/login" className="px-4 py-2 text-[#A21D21] border border-[#A21D21] rounded-lg hover:bg-[#A21D21] hover:text-white transition-colors font-medium">
                เข้าสู่ระบบ
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#A21D21] to-[#8A1919] text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">เรียนรู้ไปกับ E-Learning Platform</h1>
            <p className="text-xl mb-8 text-gray-100">
              พัฒนาทักษะและความรู้กับหลักสูตรคุณภาพจากผู้เชี่ยวชาญ พร้อมใบประกาศนียบัตรที่รับรอง
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/learn" className="px-8 py-3 bg-white text-[#A21D21] rounded-lg hover:bg-gray-100 transition-colors font-semibold">
                เข้าเรียนทันที
              </Link>
              <Link href="/catalog" className="px-8 py-3 bg-transparent border-2 border-white rounded-lg hover:bg-white hover:text-[#A21D21] transition-colors font-semibold">
                ดูหลักสูตรทั้งหมด
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Access Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">เข้าถึงระบบเรียน</h2>
            <p className="text-gray-600">เลือกเข้าสู่ระบบการเรียนตามบทบาทของคุณ</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">สำหรับผู้เรียน</h3>
              <p className="text-gray-600 mb-4">เข้าสู่ระบบการเรียนและพัฒนาทักษะของคุณ</p>
              <Link href="/learn" className="inline-block px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors font-semibold">
                เข้าเรียน
              </Link>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">สำหรับวิทยากร</h3>
              <p className="text-gray-600 mb-4">จัดการหลักสูตรและติดตามความคืบหน้าผู้เรียน</p>
              <Link href="/instructor" className="inline-block px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-semibold">
                จัดการคอร์ส
              </Link>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">สำหรับผู้ดูแล</h3>
              <p className="text-gray-600 mb-4">จัดการระบบและรายงานการเรียนทั้งหมด</p>
              <Link href="/admin" className="inline-block px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-semibold">
                จัดการระบบ
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#A21D21] mb-2">15,000+</div>
              <div className="text-gray-600">ผู้เรียน</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#A21D21] mb-2">200+</div>
              <div className="text-gray-600">หลักสูตร</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#A21D21] mb-2">50+</div>
              <div className="text-gray-600">ผู้สอน</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#A21D21] mb-2">95%</div>
              <div className="text-gray-600">ความพึงพอใจ</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">หลักสูตรแนะนำ</h2>
            <p className="text-gray-600">เลือกเรียนหลักสูตรยอดนิยมจากผู้เชี่ยวชาญ</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCourses.map((course) => (
              <div key={course.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img src={course.image} alt={course.title} className="w-full h-48 object-cover rounded-t-lg" />
                  <div className="absolute top-2 left-2">
                    <span className="px-2 py-1 bg-[#A21D21] text-white text-xs rounded-full">
                      {course.badge}
                    </span>
                  </div>
                  <div className="absolute top-2 right-2">
                    <span className="px-2 py-1 bg-green-500 text-white text-xs rounded-full">
                      {course.price}
                    </span>
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">{course.category}</span>
                    <span className="text-xs text-gray-500">{course.level}</span>
                  </div>

                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{course.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{course.instructor}</p>

                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className={`w-4 h-4 ${i < Math.floor(course.rating) ? 'fill-current' : 'fill-gray-300'}`} viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-sm text-gray-600 ml-1">{course.rating}</span>
                    </div>
                    <span className="text-sm text-gray-500">{course.duration}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{course.enrolled} ผู้เรียน</span>
                    <Link href={`/learn/${course.id}`} className="px-3 py-1 bg-[#A21D21] text-white text-sm rounded hover:bg-[#8A1919] transition-colors">
                      เริ่มเรียน
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/catalog" className="px-6 py-3 bg-[#A21D21] text-white rounded-lg hover:bg-[#8A1919] transition-colors font-semibold">
              ดูหลักสูตรทั้งหมด
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">หมวดหมู่หลักสูตร</h2>
            <p className="text-gray-600">เลือกเรียนตามหมวดหมู่ที่คุณสนใจ</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, index) => (
              <Link key={index} href={`/catalog?category=${category.name}`} className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
                <div className={`w-12 h-12 ${category.color} rounded-full flex items-center justify-center mx-auto mb-3`}>
                  <span className="text-2xl">{category.icon}</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{category.name}</h3>
                <p className="text-sm text-gray-500">{category.count} หลักสูตร</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Paths */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">เส้นทางการเรียน</h2>
            <p className="text-gray-600">พัฒนาทักษะอย่างเป็นระบบกับเส้นทางการเรียนที่ออกแบบมาเป็นพิเศษ</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {learningPaths.map((path, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
                <div className={`w-12 h-12 ${path.color} rounded-full flex items-center justify-center mb-4`}>
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{path.title}</h3>
                <p className="text-gray-600 mb-4">{path.description}</p>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">จำนวนหลักสูตร:</span>
                    <span className="font-medium">{path.courses} หลักสูตร</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">ระยะเวลา:</span>
                    <span className="font-medium">{path.duration}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">ระดับ:</span>
                    <span className="font-medium">{path.level}</span>
                  </div>
                </div>
                <Link href={`/learning-paths/${index + 1}`} className="block w-full px-4 py-2 bg-[#A21D21] text-white text-center rounded-lg hover:bg-[#8A1919] transition-colors">
                  เริ่มเรียน
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#A21D21] to-[#8A1919] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">เริ่มต้นการเรียนรู้วันนี้</h2>
          <p className="text-xl mb-8 text-gray-100">สมัครสมาชิกฟรีและเข้าถึงหลักสูตรคุณภาพได้ทันที</p>
          <Link href="/register" className="px-8 py-3 bg-white text-[#A21D21] rounded-lg hover:bg-gray-100 transition-colors font-semibold">
            สมัครสมาชิกฟรี
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                  <span className="text-[#A21D21] font-bold">E</span>
                </div>
                <span className="text-xl font-bold">E-Learning</span>
              </div>
              <p className="text-gray-400">แพลตฟอร์มการเรียนรู้ออนไลน์สำหรับพัฒนาบุคลากรภายในองค์กร</p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">เมนูหลัก</h3>
              <ul className="space-y-2">
                <li><Link href="/catalog" className="text-gray-400 hover:text-white">หลักสูตรทั้งหมด</Link></li>
                <li><Link href="/learning-paths" className="text-gray-400 hover:text-white">เส้นทางการเรียน</Link></li>
                <li><Link href="/about" className="text-gray-400 hover:text-white">เกี่ยวกับเรา</Link></li>
                <li><Link href="/contact" className="text-gray-400 hover:text-white">ติดต่อ</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">หมวดหมู่</h3>
              <ul className="space-y-2">
                <li><Link href="/catalog?category=ความปลอดภัย" className="text-gray-400 hover:text-white">ความปลอดภัย</Link></li>
                <li><Link href="/catalog?category=เทคโนโลยี" className="text-gray-400 hover:text-white">เทคโนโลยี</Link></li>
                <li><Link href="/catalog?category=คุณภาพ" className="text-gray-400 hover:text-white">คุณภาพ</Link></li>
                <li><Link href="/catalog?category=การจัดการ" className="text-gray-400 hover:text-white">การจัดการ</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">ติดต่อเรา</h3>
              <ul className="space-y-2">
                <li className="text-gray-400">อีเมล: info@elearning.com</li>
                <li className="text-gray-400">โทร: 02-123-4567</li>
                <li className="text-gray-400">ที่อยู่: กรุงเทพมหานคร</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">© 2024 E-Learning Platform. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
