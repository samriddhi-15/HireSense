export const ROLES = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "Data Scientist",
  "ML Engineer",
  "DevOps Engineer",
  "Product Manager",
  "System Design",
];

export const EXPERIENCE_LEVELS = ["Fresher (0-1 yr)", "Junior (1-3 yrs)", "Mid (3-5 yrs)", "Senior (5-8 yrs)", "Staff (8+ yrs)"];

export const INTERVIEW_TYPES = ["Technical", "Behavioural", "System Design", "Coding", "Mixed"];

export const DIFFICULTIES = ["Easy", "Medium", "Hard", "Expert"];

export const DURATIONS = ["15 min", "30 min", "45 min", "60 min", "90 min"];

export const LANGUAGES = ["Python", "JavaScript", "Java", "C++", "Go", "TypeScript", "Rust"];

export const TIMELINE_STEPS = [
  { id: 1, label: "Introduction",      icon: "👋", done: true,  active: false },
  { id: 2, label: "Technical Round",   icon: "⚙️", done: true,  active: false },
  { id: 3, label: "Coding Round",      icon: "💻", done: false, active: true  },
  { id: 4, label: "HR Round",          icon: "🤝", done: false, active: false },
  { id: 5, label: "Final Evaluation",  icon: "🏆", done: false, active: false },
];

export const QUESTIONS = [
  {
    id: 1,
    number: 1,
    difficulty: "Easy",
    category: "Behavioural",
    text: "Tell me about yourself and what motivated you to apply for this role at our company.",
    hint: "Structure your answer using the Present-Past-Future framework. Keep it under 2 minutes.",
  },
  {
    id: 2,
    number: 2,
    difficulty: "Medium",
    category: "Technical",
    text: "Explain the difference between `useState` and `useReducer` in React. When would you choose one over the other?",
    hint: "Think about complexity of state shape and whether actions are predictable.",
  },
  {
    id: 3,
    number: 3,
    difficulty: "Hard",
    category: "System Design",
    text: "Design a URL shortening service like bit.ly. Walk me through your architecture decisions, database schema, and how you would handle 100M requests per day.",
    hint: "Start with requirements, then work through components: API gateway, hashing strategy, database choice, caching layer.",
  },
  {
    id: 4,
    number: 4,
    difficulty: "Medium",
    category: "Coding",
    text: "Given an array of integers, find two numbers such that they add up to a specific target number. Return the indices of the two numbers.",
    hint: "Can you solve it in O(n) time using a hash map?",
  },
];

export const TRANSCRIPT = [
  { id: 1, role: "ai",        text: "Hello! I'm your AI interviewer today. Welcome to your mock interview session for the Frontend Developer position. I'll be asking you a series of questions to evaluate your skills. Are you ready to begin?", time: "00:00" },
  { id: 2, role: "candidate", text: "Yes, absolutely! I'm ready to get started. Thank you for the opportunity.", time: "00:12" },
  { id: 3, role: "ai",        text: "Great! Let's start with a brief introduction. Could you please tell me about yourself and what motivated you to apply for this role?", time: "00:18" },
  { id: 4, role: "candidate", text: "Sure! I'm a frontend developer with 4 years of experience specializing in React and TypeScript. I've worked on large-scale applications at two startups and have a strong passion for building performant, accessible user interfaces...", time: "00:31" },
  { id: 5, role: "ai",        text: "That's a solid background. Now let's dive into some technical questions. I'd like to understand your depth in React internals.", time: "01:45" },
];

export const FEEDBACK_METRICS = [
  { label: "Confidence",          value: 78, color: "#f5a623" },
  { label: "Communication",       value: 85, color: "#4a9fd5" },
  { label: "Technical Accuracy",  value: 72, color: "#e8920f" },
  { label: "Problem Solving",     value: 80, color: "#f5a623" },
  { label: "Fluency",             value: 88, color: "#4a9fd5" },
];

export const AI_SUGGESTIONS = [
  "✦ Use more specific examples from past projects",
  "✦ Break complex answers into clear steps",
  "✦ Ask clarifying questions before answering system design",
  "✦ Mention trade-offs in your technical decisions",
];

export const TOPIC_PERFORMANCE = [
  { topic: "Arrays & Strings",    score: 88, color: "#22c55e"  },
  { topic: "Dynamic Programming", score: 54, color: "#ef4444"  },
  { topic: "System Design",       score: 70, color: "#f5a623"  },
  { topic: "React & Hooks",       score: 91, color: "#4a9fd5"  },
  { topic: "Behavioural",         score: 82, color: "#22c55e"  },
  { topic: "Graphs & Trees",      score: 63, color: "#f59e0b"  },
];

export const INTERVIEW_HISTORY = [
  { id: 1, role: "Frontend Dev",  date: "May 10",   score: 84, difficulty: "Medium", status: "Completed" },
  { id: 2, role: "Full Stack",    date: "May 7",    score: 71, difficulty: "Hard",   status: "Completed" },
  { id: 3, role: "React Specialist", date: "May 3", score: 90, difficulty: "Easy",   status: "Completed" },
  { id: 4, role: "Senior FE",     date: "Apr 29",   score: 68, difficulty: "Expert", status: "Abandoned" },
];

export const RECOMMENDATIONS = [
  { icon: "🔢", title: "Arrays & DP",          desc: "Strengthen weak areas in dynamic programming problems.", tag: "DSA",        color: "#f5a623" },
  { icon: "⚛️", title: "React Advanced",       desc: "Deep dive into React internals, concurrent mode & Suspense.", tag: "Frontend", color: "#4a9fd5" },
  { icon: "🏗️", title: "System Design",        desc: "Practice designing large-scale distributed systems.",  tag: "Architecture", color: "#e8920f" },
  { icon: "🤝", title: "Behavioural STAR",      desc: "Master the STAR method for behavioural round answers.", tag: "Soft Skills", color: "#f5a623" },
];

export const DUMMY_CODE = `def two_sum(nums, target):
    """
    Find two numbers that add up to target.
    Time: O(n)  Space: O(n)
    """
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []

# Test
print(two_sum([2, 7, 11, 15], 9))  # [0, 1]
print(two_sum([3, 2, 4], 6))       # [1, 2]`;

export const TEST_CASES = [
  { id: 1, input: "nums=[2,7,11,15], target=9",  expected: "[0,1]",  status: "pass"    },
  { id: 2, input: "nums=[3,2,4], target=6",       expected: "[1,2]",  status: "pass"    },
  { id: 3, input: "nums=[3,3], target=6",          expected: "[0,1]",  status: "running" },
  { id: 4, input: "nums=[-1,-2,-3], target=-4",   expected: "[0,2]",  status: "pending" },
];

export const DUMMY_OUTPUT = `Running test cases...
✓ Test 1: [2,7,11,15] target=9 → [0,1]  ✓ PASS  (2ms)
✓ Test 2: [3,2,4] target=6    → [1,2]  ✓ PASS  (1ms)
⏳ Test 3: Running...
◯ Test 4: Pending

2/4 passed · Runtime: 52ms · Memory: 15.2 MB`;