//!!!!!新方法！ every 方法！总是返回true 或 false !用于test 
const exams = [80, 98, 92, 78, 77, 90, 89, 84, 81, 77]

exams.every(score => score >= 75)

exams.some(score => score <= 80)