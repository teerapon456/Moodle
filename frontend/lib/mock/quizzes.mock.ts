// ========================================
// MOCK QUIZZES DATA
// Format: Moodle mod_quiz API response
// ========================================

import { MoodleQuiz, MoodleQuizAttempt, MoodleQuizQuestion } from '../api/moodle-types';

// ========================================
// MOCK QUIZZES
// ========================================

export const mockQuizzes: MoodleQuiz[] = [
  {
    id: 1,
    course: 1,
    coursemodule: 101,
    name: 'Quiz บทที่ 1: พื้นฐาน Lean Manufacturing',
    intro: '<p>ทดสอบความเข้าใจหลักการพื้นฐานของ Lean Manufacturing</p>',
    introformat: 1,
    introfiles: [],
    timeopen: 1704067200,
    timeclose: 1711929600,
    timelimit: 1800, // 30 minutes
    overduehandling: 'autosubmit',
    graceperiod: 0,
    preferredbehaviour: 'deferredfeedback',
    canredoquestions: 0,
    attempts: 3,
    attemptonlast: 0,
    grademethod: 1, // Highest grade
    decimalpoints: 2,
    questiondecimalpoints: -1,
    reviewattempt: 69904,
    reviewcorrectness: 69904,
    reviewmarks: 69904,
    reviewspecificfeedback: 69904,
    reviewgeneralfeedback: 69904,
    reviewrightanswer: 69904,
    reviewoverallfeedback: 69904,
    questionsperpage: 1,
    navmethod: 'free',
    shuffleanswers: 1,
    sumgrades: 100,
    grade: 100,
    timecreated: 1701388800,
    timemodified: 1706400000,
    password: '',
    subnet: '',
    browsersecurity: '-',
    delay1: 0,
    delay2: 0,
    showuserpicture: 0,
    showblocks: 0,
    completionattemptsexhausted: 0,
    completionminattempts: 1,
    allowofflineattempts: 0,
    autosaveperiod: 60,
    hasfeedback: 1,
    hasquestions: 1,
    section: 1,
    visible: 1,
    groupmode: 0,
    groupingid: 0,
  },
  {
    id: 2,
    course: 1,
    coursemodule: 102,
    name: 'Quiz บทที่ 2: Waste Identification',
    intro: '<p>ทดสอบความสามารถในการระบุและจำแนกประเภทของ Waste</p>',
    introformat: 1,
    introfiles: [],
    timeopen: 1704672000,
    timeclose: 1711929600,
    timelimit: 2700, // 45 minutes
    overduehandling: 'autosubmit',
    graceperiod: 0,
    preferredbehaviour: 'deferredfeedback',
    canredoquestions: 0,
    attempts: 2,
    attemptonlast: 0,
    grademethod: 1,
    decimalpoints: 2,
    questiondecimalpoints: -1,
    reviewattempt: 69904,
    reviewcorrectness: 69904,
    reviewmarks: 69904,
    reviewspecificfeedback: 69904,
    reviewgeneralfeedback: 69904,
    reviewrightanswer: 69904,
    reviewoverallfeedback: 69904,
    questionsperpage: 1,
    navmethod: 'free',
    shuffleanswers: 1,
    sumgrades: 100,
    grade: 100,
    timecreated: 1701388800,
    timemodified: 1706400000,
    password: '',
    subnet: '',
    browsersecurity: '-',
    delay1: 0,
    delay2: 0,
    showuserpicture: 0,
    showblocks: 0,
    completionattemptsexhausted: 0,
    completionminattempts: 1,
    allowofflineattempts: 0,
    autosaveperiod: 60,
    hasfeedback: 1,
    hasquestions: 1,
    section: 2,
    visible: 1,
    groupmode: 0,
    groupingid: 0,
  },
  {
    id: 3,
    course: 2,
    coursemodule: 201,
    name: 'แบบทดสอบทักษะการสื่อสาร',
    intro: '<p>ทดสอบความเข้าใจเกี่ยวกับหลักการสื่อสารที่มีประสิทธิภาพ</p>',
    introformat: 1,
    introfiles: [],
    timeopen: 1705276800,
    timeclose: 1710547200,
    timelimit: 1200, // 20 minutes
    overduehandling: 'autosubmit',
    graceperiod: 0,
    preferredbehaviour: 'deferredfeedback',
    canredoquestions: 0,
    attempts: 0, // Unlimited
    attemptonlast: 0,
    grademethod: 1,
    decimalpoints: 2,
    questiondecimalpoints: -1,
    reviewattempt: 69904,
    reviewcorrectness: 69904,
    reviewmarks: 69904,
    reviewspecificfeedback: 69904,
    reviewgeneralfeedback: 69904,
    reviewrightanswer: 69904,
    reviewoverallfeedback: 69904,
    questionsperpage: 5,
    navmethod: 'free',
    shuffleanswers: 1,
    sumgrades: 50,
    grade: 100,
    timecreated: 1701388800,
    timemodified: 1706400000,
    password: '',
    subnet: '',
    browsersecurity: '-',
    delay1: 0,
    delay2: 0,
    showuserpicture: 0,
    showblocks: 0,
    completionattemptsexhausted: 0,
    completionminattempts: 1,
    allowofflineattempts: 0,
    autosaveperiod: 60,
    hasfeedback: 1,
    hasquestions: 1,
    section: 1,
    visible: 1,
    groupmode: 0,
    groupingid: 0,
  },
  {
    id: 4,
    course: 4,
    coursemodule: 401,
    name: 'แบบทดสอบความปลอดภัย (บังคับ)',
    intro: '<p>แบบทดสอบความรู้ด้านความปลอดภัยในการทำงาน - ต้องผ่าน 80% จึงจะถือว่าสำเร็จ</p>',
    introformat: 1,
    introfiles: [],
    timeopen: 1709337600,
    timeclose: 1714521600,
    timelimit: 3600, // 60 minutes
    overduehandling: 'autosubmit',
    graceperiod: 0,
    preferredbehaviour: 'deferredfeedback',
    canredoquestions: 0,
    attempts: 0, // Unlimited for compliance
    attemptonlast: 0,
    grademethod: 1,
    decimalpoints: 2,
    questiondecimalpoints: -1,
    reviewattempt: 69904,
    reviewcorrectness: 69904,
    reviewmarks: 69904,
    reviewspecificfeedback: 69904,
    reviewgeneralfeedback: 69904,
    reviewrightanswer: 69904,
    reviewoverallfeedback: 69904,
    questionsperpage: 1,
    navmethod: 'sequential',
    shuffleanswers: 1,
    sumgrades: 100,
    grade: 100,
    timecreated: 1704067200,
    timemodified: 1706400000,
    password: '',
    subnet: '',
    browsersecurity: 'securewindow',
    delay1: 0,
    delay2: 0,
    showuserpicture: 0,
    showblocks: 0,
    completionattemptsexhausted: 0,
    completionminattempts: 1,
    allowofflineattempts: 0,
    autosaveperiod: 60,
    hasfeedback: 1,
    hasquestions: 1,
    section: 1,
    visible: 1,
    groupmode: 0,
    groupingid: 0,
  },
];

// ========================================
// MOCK QUIZ ATTEMPTS
// ========================================

export const mockQuizAttempts: MoodleQuizAttempt[] = [
  // User 1 attempts for Quiz 1
  {
    id: 1,
    quiz: 1,
    userid: 1,
    attempt: 1,
    uniqueid: 1001,
    layout: '1,2,3,4,5,0',
    currentpage: 0,
    preview: 0,
    state: 'finished',
    timestart: 1704153600,
    timefinish: 1704155400,
    timemodified: 1704155400,
    timemodifiedoffline: 0,
    timecheckstate: null,
    sumgrades: 85,
    gradednotificationsenttime: 1704155400,
  },
  // User 1 attempts for Quiz 3 (Communication)
  {
    id: 2,
    quiz: 3,
    userid: 1,
    attempt: 1,
    uniqueid: 1002,
    layout: '1,2,3,4,5,0',
    currentpage: 0,
    preview: 0,
    state: 'finished',
    timestart: 1705363200,
    timefinish: 1705364400,
    timemodified: 1705364400,
    timemodifiedoffline: 0,
    timecheckstate: null,
    sumgrades: 92,
    gradednotificationsenttime: 1705364400,
  },
  // User 5 attempts
  {
    id: 3,
    quiz: 1,
    userid: 5,
    attempt: 1,
    uniqueid: 1003,
    layout: '1,2,3,4,5,0',
    currentpage: 0,
    preview: 0,
    state: 'finished',
    timestart: 1704240000,
    timefinish: 1704241800,
    timemodified: 1704241800,
    timemodifiedoffline: 0,
    timecheckstate: null,
    sumgrades: 78,
    gradednotificationsenttime: 1704241800,
  },
  // In progress attempt
  {
    id: 4,
    quiz: 2,
    userid: 1,
    attempt: 1,
    uniqueid: 1004,
    layout: '1,2,3,4,5,6,7,8,0',
    currentpage: 3,
    preview: 0,
    state: 'inprogress',
    timestart: 1706486400,
    timefinish: 0,
    timemodified: 1706487000,
    timemodifiedoffline: 0,
    timecheckstate: null,
    sumgrades: null,
    gradednotificationsenttime: null,
  },
];

// ========================================
// MOCK QUIZ QUESTIONS
// ========================================

export interface MockQuizQuestionData {
  quizid: number;
  questions: {
    id: number;
    slot: number;
    type: 'multichoice' | 'truefalse' | 'shortanswer' | 'essay';
    questiontext: string;
    questiontextformat: number;
    answers?: {
      id: number;
      answer: string;
      fraction: number; // 1 = correct, 0 = incorrect
      feedback: string;
    }[];
    correctanswer?: boolean; // For true/false
    maxmark: number;
  }[];
}

export const mockQuizQuestions: MockQuizQuestionData[] = [
  {
    quizid: 1,
    questions: [
      {
        id: 1,
        slot: 1,
        type: 'multichoice',
        questiontext: 'Lean Manufacturing มีต้นกำเนิดมาจากบริษัทใด?',
        questiontextformat: 1,
        answers: [
          { id: 1, answer: 'Ford Motor Company', fraction: 0, feedback: 'ไม่ถูกต้อง Ford เป็นต้นแบบของ Mass Production' },
          { id: 2, answer: 'Toyota Motor Corporation', fraction: 1, feedback: 'ถูกต้อง! Toyota Production System เป็นต้นแบบของ Lean' },
          { id: 3, answer: 'General Electric', fraction: 0, feedback: 'ไม่ถูกต้อง GE เป็นที่รู้จักจาก Six Sigma' },
          { id: 4, answer: 'Honda Motor Company', fraction: 0, feedback: 'ไม่ถูกต้อง แม้ Honda จะใช้ Lean แต่ไม่ใช่ต้นกำเนิด' },
        ],
        maxmark: 10,
      },
      {
        id: 2,
        slot: 2,
        type: 'multichoice',
        questiontext: 'หลักการ 5S ไม่รวมข้อใด?',
        questiontextformat: 1,
        answers: [
          { id: 5, answer: 'Sort (สะสาง)', fraction: 0, feedback: 'นี่เป็นส่วนหนึ่งของ 5S' },
          { id: 6, answer: 'Set in Order (สะดวก)', fraction: 0, feedback: 'นี่เป็นส่วนหนึ่งของ 5S' },
          { id: 7, answer: 'Speed (ความเร็ว)', fraction: 1, feedback: 'ถูกต้อง! Speed ไม่ใช่ส่วนหนึ่งของ 5S' },
          { id: 8, answer: 'Standardize (สร้างมาตรฐาน)', fraction: 0, feedback: 'นี่เป็นส่วนหนึ่งของ 5S' },
        ],
        maxmark: 10,
      },
      {
        id: 3,
        slot: 3,
        type: 'truefalse',
        questiontext: 'Kaizen หมายถึงการปรับปรุงอย่างต่อเนื่อง',
        questiontextformat: 1,
        correctanswer: true,
        maxmark: 10,
      },
      {
        id: 4,
        slot: 4,
        type: 'multichoice',
        questiontext: 'ข้อใดไม่ใช่ประเภทของ Waste (Muda) ตามหลัก Lean?',
        questiontextformat: 1,
        answers: [
          { id: 9, answer: 'Overproduction (การผลิตเกิน)', fraction: 0, feedback: 'นี่เป็น Waste ประเภทหนึ่ง' },
          { id: 10, answer: 'Waiting (การรอคอย)', fraction: 0, feedback: 'นี่เป็น Waste ประเภทหนึ่ง' },
          { id: 11, answer: 'Quality (คุณภาพ)', fraction: 1, feedback: 'ถูกต้อง! Quality ไม่ใช่ประเภทของ Waste' },
          { id: 12, answer: 'Inventory (สินค้าคงคลัง)', fraction: 0, feedback: 'นี่เป็น Waste ประเภทหนึ่ง' },
        ],
        maxmark: 10,
      },
      {
        id: 5,
        slot: 5,
        type: 'essay',
        questiontext: 'อธิบายความหมายของ Value Stream Mapping และประโยชน์ในการนำไปใช้',
        questiontextformat: 1,
        maxmark: 20,
      },
    ],
  },
  {
    quizid: 4, // Safety quiz
    questions: [
      {
        id: 10,
        slot: 1,
        type: 'multichoice',
        questiontext: 'อุปกรณ์ป้องกันภัยส่วนบุคคล (PPE) ที่ต้องใช้ในพื้นที่การผลิตคือข้อใด?',
        questiontextformat: 1,
        answers: [
          { id: 20, answer: 'หมวกนิรภัย, รองเท้านิรภัย, แว่นตานิรภัย', fraction: 1, feedback: 'ถูกต้อง!' },
          { id: 21, answer: 'เสื้อแจ็คเก็ต, รองเท้าผ้าใบ', fraction: 0, feedback: 'ไม่ถูกต้อง อุปกรณ์เหล่านี้ไม่ใช่ PPE' },
          { id: 22, answer: 'นาฬิกา, แหวน', fraction: 0, feedback: 'ไม่ถูกต้อง เครื่องประดับไม่ใช่ PPE' },
        ],
        maxmark: 10,
      },
      {
        id: 11,
        slot: 2,
        type: 'truefalse',
        questiontext: 'เมื่อพบเห็นสภาพที่ไม่ปลอดภัย ควรรายงานหัวหน้างานทันที',
        questiontextformat: 1,
        correctanswer: true,
        maxmark: 10,
      },
    ],
  },
];

// ========================================
// HELPER FUNCTIONS
// ========================================

export function getQuizzesByCourse(courseid: number): MoodleQuiz[] {
  return mockQuizzes.filter(q => q.course === courseid);
}

export function getQuizById(quizid: number): MoodleQuiz | undefined {
  return mockQuizzes.find(q => q.id === quizid);
}

export function getUserQuizAttempts(quizid: number, userid: number): MoodleQuizAttempt[] {
  return mockQuizAttempts.filter(a => a.quiz === quizid && a.userid === userid);
}

export function getQuizQuestions(quizid: number): MockQuizQuestionData['questions'] {
  const quizData = mockQuizQuestions.find(q => q.quizid === quizid);
  return quizData?.questions || [];
}

export function calculateQuizScore(quizid: number, answers: Record<number, any>): {
  score: number;
  maxScore: number;
  percentage: number;
  passed: boolean;
  passingScore: number;
} {
  const questions = getQuizQuestions(quizid);
  const quiz = getQuizById(quizid);

  let score = 0;
  let maxScore = 0;

  questions.forEach(q => {
    maxScore += q.maxmark;
    const userAnswer = answers[q.id];

    if (q.type === 'multichoice' && q.answers) {
      const correctAnswer = q.answers.find(a => a.fraction === 1);
      if (correctAnswer && userAnswer === correctAnswer.id) {
        score += q.maxmark;
      }
    } else if (q.type === 'truefalse') {
      if (userAnswer === q.correctanswer) {
        score += q.maxmark;
      }
    }
    // Essay questions need manual grading
  });

  const percentage = maxScore > 0 ? (score / maxScore) * 100 : 0;
  const passingScore = 70; // Default passing score

  return {
    score,
    maxScore,
    percentage,
    passed: percentage >= passingScore,
    passingScore,
  };
}
