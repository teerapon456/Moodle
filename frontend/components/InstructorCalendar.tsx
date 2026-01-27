'use client';

import { useState } from 'react';

interface InstructorCalendarProps {
  currentDate: Date;
  onMonthChange: (direction: number) => void;
  calendarView: 'month' | 'week' | 'day';
  onViewChange: (view: 'month' | 'week' | 'day') => void;
}

export default function InstructorCalendar({
  currentDate,
  onMonthChange,
  calendarView,
  onViewChange
}: InstructorCalendarProps) {
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Add empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    return days;
  };

  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 shadow-xl dark:shadow-2xl rounded-2xl p-8 transition-all duration-300">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Schedule Calendar
        </h2>
        <div className="flex items-center gap-4">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border border-gray-200/50 dark:border-gray-700/50 rounded-xl p-1 flex">
            {['month', 'week', 'day'].map((view) => (
              <button
                key={view}
                onClick={() => onViewChange(view as 'month' | 'week' | 'day')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${calendarView === view
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
              >
                {view.charAt(0).toUpperCase() + view.slice(1)}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onMonthChange(-1)}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <span className="text-lg font-semibold text-gray-900 dark:text-white min-w-[150px] text-center">
              {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </span>
            <button
              onClick={() => onMonthChange(1)}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Calendar Grid */}
      {calendarView === 'month' && (
        <div>
          <div className="grid grid-cols-7 gap-2 mb-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="text-center text-sm font-semibold text-gray-600 dark:text-gray-400 py-2">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-2">
            {generateCalendarDays().map((day, index) => (
              <div
                key={index}
                className={`aspect-square border border-gray-200 dark:border-gray-600 rounded-lg p-2 transition-all duration-200 ${day ? 'hover:bg-blue-50 dark:hover:bg-blue-900/20 cursor-pointer' : ''
                  } ${day === new Date().getDate() &&
                    currentDate.getMonth() === new Date().getMonth() &&
                    currentDate.getFullYear() === new Date().getFullYear()
                    ? 'bg-blue-100 dark:bg-blue-900 border-blue-500'
                    : 'bg-white dark:bg-gray-800'
                  }`}
              >
                {day && (
                  <div className="h-full flex flex-col">
                    <span className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                      {day}
                    </span>
                    {/* Sample events for specific days */}
                    {day === 15 && (
                      <div className="flex-1 space-y-1">
                        <div className="text-xs p-1 bg-blue-500 text-white rounded truncate">
                          10:00 Math Class
                        </div>
                        <div className="text-xs p-1 bg-green-500 text-white rounded truncate">
                          14:00 Physics Lab
                        </div>
                      </div>
                    )}
                    {day === 20 && (
                      <div className="flex-1 space-y-1">
                        <div className="text-xs p-1 bg-purple-500 text-white rounded truncate">
                          09:00 Chemistry
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Week View */}
      {calendarView === 'week' && (
        <div>
          <div className="grid grid-cols-8 gap-2">
            <div className="text-center text-sm font-semibold text-gray-600 dark:text-gray-400 py-2">
              Time
            </div>
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
              <div key={day} className="text-center text-sm font-semibold text-gray-600 dark:text-gray-400 py-2">
                {day}
              </div>
            ))}
          </div>
          <div className="space-y-2">
            {['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'].map((time) => (
              <div key={time} className="grid grid-cols-8 gap-2">
                <div className="text-sm text-gray-600 dark:text-gray-400 py-4 text-right pr-2">
                  {time}
                </div>
                {Array(7).fill(null).map((_, dayIndex) => (
                  <div
                    key={dayIndex}
                    className="border border-gray-200 dark:border-gray-600 rounded-lg p-2 min-h-[60px] hover:bg-blue-50 dark:hover:bg-blue-900/20 cursor-pointer transition-colors"
                  >
                    {/* Sample events */}
                    {time === '10:00' && dayIndex === 1 && (
                      <div className="text-xs p-1 bg-blue-500 text-white rounded">
                        Math Class
                      </div>
                    )}
                    {time === '14:00' && dayIndex === 3 && (
                      <div className="text-xs p-1 bg-green-500 text-white rounded">
                        Physics Lab
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Day View */}
      {calendarView === 'day' && (
        <div>
          <div className="space-y-2">
            {['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'].map((time) => (
              <div key={time} className="flex gap-4">
                <div className="text-sm text-gray-600 dark:text-gray-400 py-4 w-16 text-right">
                  {time}
                </div>
                <div className="flex-1 border border-gray-200 dark:border-gray-600 rounded-lg p-4 min-h-[80px] hover:bg-blue-50 dark:hover:bg-blue-900/20 cursor-pointer transition-colors">
                  {/* Sample events */}
                  {time === '09:00' && (
                    <div className="p-2 bg-blue-500 text-white rounded">
                      <div className="font-medium">Mathematics 101</div>
                      <div className="text-xs">Room 201 - 45 students</div>
                    </div>
                  )}
                  {time === '11:00' && (
                    <div className="p-2 bg-purple-500 text-white rounded">
                      <div className="font-medium">Chemistry Lab</div>
                      <div className="text-xs">Lab A - 20 students</div>
                    </div>
                  )}
                  {time === '14:00' && (
                    <div className="p-2 bg-green-500 text-white rounded">
                      <div className="font-medium">Physics Tutorial</div>
                      <div className="text-xs">Room 105 - 30 students</div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
