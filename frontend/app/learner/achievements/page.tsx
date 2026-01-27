'use client';

import React, { useState } from 'react';
import MainLayout from '@/components/MainLayout';

// Mock achievements data
const mockAchievements = {
  userStats: {
    totalPoints: 2450,
    currentLevel: 'Level 5',
    levelProgress: 65,
    nextLevelPoints: 3000,
    currentStreak: 15,
    longestStreak: 45,
    rank: 12,
    totalUsers: 156
  },
  badges: [
    {
      id: 1,
      title: 'Fast Learner',
      description: 'ทำหลักสูตรแรกเสร็จภายใน 7 วัน',
      icon: '🚀',
      category: 'speed',
      rarity: 'common',
      earnedAt: '2024-01-15',
      points: 50,
      progress: 100,
      maxProgress: 1
    },
    {
      id: 2,
      title: 'Safety Expert',
      description: 'ทำหลักสูตรความปลอดภัย 5 หลักสูตร',
      icon: '🛡️',
      category: 'safety',
      rarity: 'rare',
      earnedAt: '2024-01-20',
      points: 150,
      progress: 5,
      maxProgress: 5
    },
    {
      id: 3,
      title: 'Quiz Master',
      description: 'ทำแบบทดสอบได้คะแนน 90% ขึ้นไป 10 ครั้ง',
      icon: '🧠',
      category: 'academic',
      rarity: 'epic',
      earnedAt: '2024-01-25',
      points: 200,
      progress: 10,
      maxProgress: 10
    },
    {
      id: 4,
      title: 'Team Player',
      description: 'ช่วยเหลือเพื่อนในกระทู้สนทนา 20 ครั้ง',
      icon: '🤝',
      category: 'social',
      rarity: 'uncommon',
      earnedAt: '2024-02-01',
      points: 100,
      progress: 20,
      maxProgress: 20
    },
    {
      id: 5,
      title: 'Perfect Score',
      description: 'ทำแบบทดสอบได้คะแนนเต็ม 5 ครั้ง',
      icon: '💯',
      category: 'academic',
      rarity: 'rare',
      earnedAt: '2024-02-05',
      points: 250,
      progress: 5,
      maxProgress: 5
    },
    {
      id: 6,
      title: 'Early Bird',
      description: 'เข้าเรียนตรงเวลา 30 ครั้งติดต่อกัน',
      icon: '🦅',
      category: 'consistency',
      rarity: 'uncommon',
      earnedAt: null,
      points: 75,
      progress: 22,
      maxProgress: 30
    },
    {
      id: 7,
      title: 'Knowledge Sharer',
      description: 'ตอบกระทู้ได้รับการโหวต "คำตอบที่ดีที่สุด" 10 ครั้ง',
      icon: '💡',
      category: 'social',
      rarity: 'epic',
      earnedAt: null,
      points: 300,
      progress: 7,
      maxProgress: 10
    },
    {
      id: 8,
      title: 'Marathon Learner',
      description: 'เรียนต่อเนื่อง 30 วัน',
      icon: '🏃',
      category: 'consistency',
      rarity: 'rare',
      earnedAt: null,
      points: 200,
      progress: 15,
      maxProgress: 30
    }
  ],
  leaderboards: [
    {
      category: 'points',
      title: 'คะแนนสูงสุด',
      users: [
        { rank: 1, name: 'วีระชัย มุ่งมั่น', points: 3250, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face', level: 'Level 7' },
        { rank: 2, name: 'สมศรี มั่นคง', points: 3100, avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face', level: 'Level 6' },
        { rank: 3, name: 'มานี รักงาน', points: 2950, avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face', level: 'Level 6' },
        { rank: 4, name: 'ประสิทธิ์ สุขใจ', points: 2800, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face', level: 'Level 6' },
        { rank: 5, name: 'สมชาย ใจดี', points: 2650, avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face', level: 'Level 5' },
        { rank: 12, name: 'คุณ', points: 2450, avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face', level: 'Level 5', isCurrentUser: true }
      ]
    },
    {
      category: 'streak',
      title: 'สตรีคยาวที่สุด',
      users: [
        { rank: 1, name: 'วีระชัย มุ่งมั่น', points: 67, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face', level: 'Level 7' },
        { rank: 2, name: 'สมศรี มั่นคง', points: 52, avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face', level: 'Level 6' },
        { rank: 3, name: 'มานี รักงาน', points: 48, avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face', level: 'Level 6' },
        { rank: 4, name: 'ประสิทธิ์ สุขใจ', points: 45, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face', level: 'Level 6' },
        { rank: 5, name: 'สมชาย ใจดี', points: 45, avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face', level: 'Level 5' },
        { rank: 8, name: 'คุณ', points: 15, avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face', level: 'Level 5', isCurrentUser: true }
      ]
    },
    {
      category: 'badges',
      title: 'เหรียญเยอะที่สุด',
      users: [
        { rank: 1, name: 'วีระชัย มุ่งมั่น', points: 18, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face', level: 'Level 7' },
        { rank: 2, name: 'สมศรี มั่นคง', points: 15, avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face', level: 'Level 6' },
        { rank: 3, name: 'มานี รักงาน', points: 14, avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face', level: 'Level 6' },
        { rank: 4, name: 'ประสิทธิ์ สุขใจ', points: 12, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face', level: 'Level 6' },
        { rank: 5, name: 'สมชาย ใจดี', points: 11, avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face', level: 'Level 5' },
        { rank: 10, name: 'คุณ', points: 5, avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face', level: 'Level 5', isCurrentUser: true }
      ]
    }
  ],
  rewards: [
    {
      id: 1,
      title: 'Voucher สตาร์บัคส์',
      description: 'รับไปเลย voucher สตาร์บัคส์ 100 บาท',
      points: 500,
      category: 'redeem',
      icon: '☕',
      available: true,
      claimed: false
    },
    {
      id: 2,
      title: 'อุปกรณ์สำนักงาน',
      description: 'ปากกา, สมุด, หรืออุปกรณ์อื่นๆ',
      points: 300,
      category: 'redeem',
      icon: '🖊️',
      available: true,
      claimed: false
    },
    {
      id: 3,
      title: 'วันหยุดเพิ่ม 1 วัน',
      description: 'ขอวันหยุดพักผ่อนเพิ่ม 1 วัน',
      points: 1000,
      category: 'special',
      icon: '🏖️',
      available: true,
      claimed: false
    },
    {
      id: 4,
      title: 'Certificate พิเศษ',
      description: 'ใบประกาศนียบัตรพิเศษจากบริษัท',
      points: 800,
      category: 'recognition',
      icon: '🏆',
      available: true,
      claimed: false
    }
  ]
};

export default function AchievementsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTab, setSelectedTab] = useState('badges');
  const [showRewardModal, setShowRewardModal] = useState<number | null>(null);

  const getRarityColor = (rarity: string) => {
    const colors = {
      'common': 'bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700',
      'uncommon': 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800',
      'rare': 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800',
      'epic': 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800',
      'legendary': 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800'
    };
    return colors[rarity as keyof typeof colors] || colors.common;
  };

  const getRarityLabel = (rarity: string) => {
    const labels = {
      'common': 'ทั่วไป',
      'uncommon': 'หายาก',
      'rare': 'สูง',
      'epic': 'ยิ่งใหญ่',
      'legendary': 'ตำนาน'
    };
    return labels[rarity as keyof typeof labels] || 'ทั่วไป';
  };

  const filteredBadges = mockAchievements.badges.filter(badge => {
    if (selectedCategory === 'all') return true;
    return badge.category === selectedCategory;
  });

  const earnedBadges = filteredBadges.filter(badge => badge.earnedAt);
  const inProgressBadges = filteredBadges.filter(badge => !badge.earnedAt);

  return (
    <MainLayout userName="ผู้เรียน" userRole="learner">
      <div className="pt-4">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">🏆 ความสำเร็จ</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            เก็บเกี่ยวความสำเร็จและแข่งขันกับเพื่อนๆ
          </p>
        </div>

        {/* User Stats Overview */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Points & Level */}
            <div className="text-center">
              <div className="text-3xl font-bold text-[#A21D21] dark:text-[#C92828] mb-2">
                {mockAchievements.userStats.totalPoints.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">คะแนนสะสม</div>
              <div className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                {mockAchievements.userStats.currentLevel}
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-[#A21D21] to-[#7A1818] h-2 rounded-full transition-all duration-500"
                  style={{ width: `${mockAchievements.userStats.levelProgress}%` }}
                ></div>
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {mockAchievements.userStats.nextLevelPoints - mockAchievements.userStats.totalPoints} คะแนนถึงระดับถัดไป
              </div>
            </div>

            {/* Streak */}
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-500 mb-2">
                🔥 {mockAchievements.userStats.currentStreak}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">สตรีคปัจจุบัน</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                สูงสุด: {mockAchievements.userStats.longestStreak} วัน
              </div>
            </div>

            {/* Rank */}
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-500 mb-2">
                #{mockAchievements.userStats.rank}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">อันดับ</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                จาก {mockAchievements.userStats.totalUsers} คน
              </div>
            </div>

            {/* Badges */}
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-500 mb-2">
                {earnedBadges.length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">เหรียญที่ได้</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                จากทั้งหมด {mockAchievements.badges.length} เหรียญ
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="flex gap-2 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <button
              onClick={() => setSelectedTab('badges')}
              className={`flex-1 px-4 py-2 rounded-md font-medium transition-colors ${selectedTab === 'badges'
                  ? 'bg-white dark:bg-gray-700 text-[#A21D21] dark:text-red-400 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
            >
              🏆 เหรียญ
            </button>
            <button
              onClick={() => setSelectedTab('leaderboard')}
              className={`flex-1 px-4 py-2 rounded-md font-medium transition-colors ${selectedTab === 'leaderboard'
                  ? 'bg-white dark:bg-gray-700 text-[#A21D21] dark:text-red-400 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
            >
              🏅 ลีดเดอร์บอร์ด
            </button>
            <button
              onClick={() => setSelectedTab('rewards')}
              className={`flex-1 px-4 py-2 rounded-md font-medium transition-colors ${selectedTab === 'rewards'
                  ? 'bg-white dark:bg-gray-700 text-[#A21D21] dark:text-red-400 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
            >
              🎁 รางวัล
            </button>
          </div>
        </div>

        {/* Badges Tab */}
        {selectedTab === 'badges' && (
          <div>
            {/* Category Filter */}
            <div className="mb-6">
              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${selectedCategory === 'all'
                      ? 'bg-[#A21D21] text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                >
                  ทั้งหมด
                </button>
                <button
                  onClick={() => setSelectedCategory('speed')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${selectedCategory === 'speed'
                      ? 'bg-[#A21D21] text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                >
                  🚀 ความเร็ว
                </button>
                <button
                  onClick={() => setSelectedCategory('academic')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${selectedCategory === 'academic'
                      ? 'bg-[#A21D21] text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                >
                  🧠 การเรียน
                </button>
                <button
                  onClick={() => setSelectedCategory('social')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${selectedCategory === 'social'
                      ? 'bg-[#A21D21] text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                >
                  🤝 สังคม
                </button>
                <button
                  onClick={() => setSelectedCategory('consistency')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${selectedCategory === 'consistency'
                      ? 'bg-[#A21D21] text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                >
                  📈 ความสม่ำเสมอ
                </button>
              </div>
            </div>

            {/* Earned Badges */}
            {earnedBadges.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">เหรียญที่ได้รับ</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {earnedBadges.map((badge) => (
                    <div
                      key={badge.id}
                      className={`border rounded-lg p-4 ${getRarityColor(badge.rarity)}`}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="text-3xl">{badge.icon}</div>
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900 dark:text-white">
                            {badge.title}
                          </h3>
                          <span className={`text-xs px-2 py-1 rounded-full ${getRarityColor(badge.rarity)}`}>
                            {getRarityLabel(badge.rarity)}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        {badge.description}
                      </p>
                      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                        <span>+{badge.points} คะแนน</span>
                        <span>📅 {badge.earnedAt}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* In Progress Badges */}
            {inProgressBadges.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">กำลังทำ</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {inProgressBadges.map((badge) => (
                    <div
                      key={badge.id}
                      className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 opacity-75"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="text-3xl grayscale">{badge.icon}</div>
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900 dark:text-white">
                            {badge.title}
                          </h3>
                          <span className={`text-xs px-2 py-1 rounded-full ${getRarityColor(badge.rarity)}`}>
                            {getRarityLabel(badge.rarity)}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        {badge.description}
                      </p>
                      <div className="mb-2">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-gray-600 dark:text-gray-400">
                            ความคืบหน้า
                          </span>
                          <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                            {badge.progress}/{badge.maxProgress}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-[#A21D21] to-[#7A1818] h-2 rounded-full transition-all duration-500"
                            style={{ width: `${(badge.progress / badge.maxProgress) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        +{badge.points} คะแนนเมื่อสำเร็จ
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Leaderboard Tab */}
        {selectedTab === 'leaderboard' && (
          <div className="space-y-6">
            {mockAchievements.leaderboards.map((leaderboard) => (
              <div key={leaderboard.category} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  {leaderboard.title}
                </h2>
                <div className="space-y-3">
                  {leaderboard.users.map((user) => (
                    <div
                      key={user.rank}
                      className={`flex items-center gap-4 p-3 rounded-lg ${user.isCurrentUser
                          ? 'bg-[#A21D21]/10 dark:bg-[#C92828]/20 border border-[#A21D21]/30'
                          : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                        }`}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${user.rank === 1 ? 'bg-yellow-500 text-white' :
                          user.rank === 2 ? 'bg-gray-400 text-white' :
                            user.rank === 3 ? 'bg-orange-600 text-white' :
                              'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                        }`}>
                        {user.rank}
                      </div>
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div className="flex-1">
                        <div className="font-medium text-gray-900 dark:text-white">
                          {user.name}
                          {user.isCurrentUser && <span className="ml-2 text-sm text-[#A21D21] dark:text-[#C92828]">(คุณ)</span>}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {user.level}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-gray-900 dark:text-white">
                          {leaderboard.category === 'points' && `${user.points.toLocaleString()} คะแนน`}
                          {leaderboard.category === 'streak' && `${user.points} วัน`}
                          {leaderboard.category === 'badges' && `${user.points} เหรียญ`}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Rewards Tab */}
        {selectedTab === 'rewards' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockAchievements.rewards.map((reward) => (
              <div key={reward.id} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-4xl">{reward.icon}</div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                      {reward.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {reward.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-lg font-bold text-[#A21D21] dark:text-[#C92828]">
                    {reward.points} คะแนน
                  </div>
                  <button
                    onClick={() => setShowRewardModal(reward.id)}
                    disabled={!reward.available || reward.points > mockAchievements.userStats.totalPoints}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${reward.available && reward.points <= mockAchievements.userStats.totalPoints
                        ? 'bg-[#A21D21] text-white hover:bg-[#8A1919]'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                      }`}
                  >
                    {reward.claimed ? 'ได้รับแล้ว' :
                      reward.points > mockAchievements.userStats.totalPoints ? 'คะแนนไม่พอ' :
                        'แลกรับ'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Reward Modal */}
        {showRewardModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                ยืนยันการแลกรับรางวัล
              </h2>
              {(() => {
                const reward = mockAchievements.rewards.find(r => r.id === showRewardModal);
                return reward ? (
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-5xl mb-4">{reward.icon}</div>
                      <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                        {reward.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        {reward.description}
                      </p>
                      <div className="text-lg font-bold text-[#A21D21] dark:text-[#C92828] mb-4">
                        ใช้ {reward.points} คะแนน
                      </div>
                    </div>
                    <div className="flex justify-end gap-3">
                      <button
                        onClick={() => setShowRewardModal(null)}
                        className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                      >
                        ยกเลิก
                      </button>
                      <button
                        onClick={() => setShowRewardModal(null)}
                        className="px-6 py-2 bg-[#A21D21] text-white rounded-lg hover:bg-[#8A1919] transition-colors"
                      >
                        ยืนยันการแลกรับ
                      </button>
                    </div>
                  </div>
                ) : null;
              })()}
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
