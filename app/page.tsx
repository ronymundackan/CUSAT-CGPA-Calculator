"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  GraduationCap,
  Calculator,
  BookOpen,
  Trophy,
  Sparkles,
  ArrowLeft,
  Share2,
  RotateCcw,
  AlertCircle,
} from "lucide-react"
import confetti from "canvas-confetti"

// Enhanced mock data with more departments
const departments = [
  {
    id: "cse",
    name: "Computer Science & Engineering",
    icon: "💻",
    color: "from-blue-500 to-purple-600",
    pattern: "tech",
  },
  {
    id: "ece",
    name: "Electronics & Communication",
    icon: "⚡",
    color: "from-yellow-500 to-orange-600",
    pattern: "circuit",
  },
  {
    id: "me",
    name: "Mechanical Engineering",
    icon: "⚙️",
    color: "from-gray-500 to-slate-600",
    pattern: "gear",
  },
  {
    id: "ce",
    name: "Civil Engineering",
    icon: "🏗️",
    color: "from-green-500 to-emerald-600",
    pattern: "building",
  },
  {
    id: "ee",
    name: "Electrical Engineering",
    icon: "🔌",
    color: "from-red-500 to-pink-600",
    pattern: "electric",
  },
  {
    id: "ae",
    name: "Safety And Fire Engineering",
    icon: "🔥",
    color: "from-indigo-500 to-blue-600",
    pattern: "space",
  },
  {
    id: "it",
    name: "Information Technology",
    icon: "🖥️",
    color: "from-cyan-500 to-teal-600",
    pattern: "network",
  },
]

const subjectData = {
  cse: {
    1: [
      { code: "CS101", name: "Programming in C", credits: 4 },
      { code: "MA101", name: "Engineering Mathematics I", credits: 4 },
      { code: "PH101", name: "Engineering Physics", credits: 3 },
      { code: "CH101", name: "Engineering Chemistry", credits: 3 },
      { code: "EG101", name: "Engineering Graphics", credits: 2 },
      { code: "HS101", name: "Communication Skills", credits: 2 },
    ],
    2: [
      { code: "CS201", name: "Data Structures & Algorithms", credits: 4 },
      { code: "MA201", name: "Engineering Mathematics II", credits: 4 },
      { code: "CS202", name: "Digital Logic Design", credits: 3 },
      { code: "CS203", name: "Computer Organization", credits: 3 },
      { code: "HS201", name: "Technical Communication", credits: 2 },
      { code: "CS204", name: "Object Oriented Programming", credits: 3 },
    ],
    3: [
      { code: "CS301", name: "Database Management Systems", credits: 4 },
      { code: "CS302", name: "Computer Networks", credits: 4 },
      { code: "CS303", name: "Operating Systems", credits: 3 },
      { code: "CS304", name: "Software Engineering", credits: 3 },
      { code: "MA301", name: "Discrete Mathematics", credits: 3 },
      { code: "CS305", name: "Web Technologies", credits: 2 },
    ],
  },
  ece: {
    1: [
      { code: "EC101", name: "Basic Electronics", credits: 4 },
      { code: "MA101", name: "Engineering Mathematics I", credits: 4 },
      { code: "PH101", name: "Engineering Physics", credits: 3 },
      { code: "CH101", name: "Engineering Chemistry", credits: 3 },
      { code: "EG101", name: "Engineering Graphics", credits: 2 },
      { code: "HS101", name: "Communication Skills", credits: 2 },
    ],
    2: [
      { code: "EC201", name: "Electronic Circuits", credits: 4 },
      { code: "MA201", name: "Engineering Mathematics II", credits: 4 },
      { code: "EC202", name: "Digital Electronics", credits: 3 },
      { code: "EC203", name: "Signals and Systems", credits: 3 },
      { code: "HS201", name: "Technical Communication", credits: 2 },
      { code: "EC204", name: "Network Analysis", credits: 3 },
    ],
  },
  it: {
    1: [
      { code: "IT101", name: "Programming Fundamentals", credits: 4 },
      { code: "MA101", name: "Engineering Mathematics I", credits: 4 },
      { code: "PH101", name: "Engineering Physics", credits: 3 },
      { code: "CH101", name: "Engineering Chemistry", credits: 3 },
      { code: "EG101", name: "Engineering Graphics", credits: 2 },
      { code: "HS101", name: "Communication Skills", credits: 2 },
    ],
    2: [
      { code: "IT201", name: "Database Management Systems", credits: 4 },
      { code: "MA201", name: "Engineering Mathematics II", credits: 4 },
      { code: "IT202", name: "Computer Networks", credits: 3 },
      { code: "IT203", name: "Web Technologies", credits: 3 },
      { code: "HS201", name: "Technical Communication", credits: 2 },
      { code: "IT204", name: "Software Engineering", credits: 3 },
    ],
    3: [
      { code: "IT301", name: "System Administration", credits: 4 },
      { code: "IT302", name: "Network Security", credits: 4 },
      { code: "IT303", name: "Mobile App Development", credits: 3 },
      { code: "IT304", name: "Cloud Computing", credits: 3 },
      { code: "IT305", name: "Data Analytics", credits: 3 },
      { code: "IT306", name: "Project Management", credits: 2 },
    ],
  },
  me: {
    1: [
      { code: "ME101", name: "Engineering Mechanics", credits: 4 },
      { code: "MA101", name: "Engineering Mathematics I", credits: 4 },
      { code: "PH101", name: "Engineering Physics", credits: 3 },
      { code: "CH101", name: "Engineering Chemistry", credits: 3 },
      { code: "EG101", name: "Engineering Graphics", credits: 2 },
      { code: "HS101", name: "Communication Skills", credits: 2 },
    ],
  },
  ce: {
    1: [
      { code: "CE101", name: "Building Materials", credits: 4 },
      { code: "MA101", name: "Engineering Mathematics I", credits: 4 },
      { code: "PH101", name: "Engineering Physics", credits: 3 },
      { code: "CH101", name: "Engineering Chemistry", credits: 3 },
      { code: "EG101", name: "Engineering Graphics", credits: 2 },
      { code: "HS101", name: "Communication Skills", credits: 2 },
    ],
  },
  ee: {
    1: [
      { code: "EE101", name: "Electrical Circuits", credits: 4 },
      { code: "MA101", name: "Engineering Mathematics I", credits: 4 },
      { code: "PH101", name: "Engineering Physics", credits: 3 },
      { code: "CH101", name: "Engineering Chemistry", credits: 3 },
      { code: "EG101", name: "Engineering Graphics", credits: 2 },
      { code: "HS101", name: "Communication Skills", credits: 2 },
    ],
  },
  ae: {
    1: [
      { code: "AE101", name: "Fire Safety Fundamentals", credits: 4 },
      { code: "MA101", name: "Engineering Mathematics I", credits: 4 },
      { code: "PH101", name: "Engineering Physics", credits: 3 },
      { code: "CH101", name: "Engineering Chemistry", credits: 3 },
      { code: "EG101", name: "Engineering Graphics", credits: 2 },
      { code: "HS101", name: "Communication Skills", credits: 2 },
    ],
  },
}

const gradeOptions = [
  { value: "S", label: "S", points: 10, color: "from-green-400 to-emerald-500" },
  { value: "A", label: "A", points: 9, color: "from-blue-400 to-blue-500" },
  { value: "B", label: "B", points: 8, color: "from-indigo-400 to-purple-500" },
  { value: "C", label: "C", points: 7, color: "from-purple-400 to-pink-500" },
  { value: "D", label: "D", points: 6, color: "from-yellow-400 to-orange-500" },
  { value: "F", label: "F", points: 0, color: "from-red-400 to-red-600" },
]

const themes = [
  {
    id: "default",
    name: "Ocean Breeze",
    bg: "from-blue-50 via-indigo-50 to-purple-50",
    primary: "from-blue-500 to-purple-600",
  },
  {
    id: "dark",
    name: "Dark Academia",
    bg: "from-gray-900 via-purple-900 to-violet-900",
    primary: "from-amber-500 to-orange-600",
  },
  {
    id: "neon",
    name: "Neon Future",
    bg: "from-black via-purple-900 to-black",
    primary: "from-cyan-400 to-pink-500",
  },
  {
    id: "pastel",
    name: "Pastel Dreams",
    bg: "from-pink-50 via-purple-50 to-indigo-50",
    primary: "from-pink-400 to-purple-500",
  },
]

interface Subject {
  code: string
  name: string
  credits: number
  grade?: string
}

interface CGPAResult {
  cgpa: number
  totalCredits: number
  totalGradePoints: number
  subjects: (Subject & { gradePoints: number })[]
}

export default function VibrantCGPACalculator() {
  const [step, setStep] = useState(0) // 0: welcome, 1: selection, 2: subjects, 3: results
  const [department, setDepartment] = useState("")
  const [semester, setSemester] = useState(1)
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [result, setResult] = useState<CGPAResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [currentTheme, setCurrentTheme] = useState("default")
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [titleText, setTitleText] = useState("")
  const [showConfetti, setShowConfetti] = useState(false)

  const semesterSectionRef = useRef<HTMLDivElement>(null)

  const theme = themes.find((t) => t.id === currentTheme) || themes[0]

  // Typing animation for title
  useEffect(() => {
    if (step === 0) {
      const text = "CUSAT CGPA Calculator"
      let i = 0
      const timer = setInterval(() => {
        setTitleText(text.slice(0, i))
        i++
        if (i > text.length) {
          clearInterval(timer)
        }
      }, 100)
      return () => clearInterval(timer)
    }
  }, [step])

  const playSound = (type: "click" | "success" | "transition" | "error") => {
    if (!soundEnabled) return
    // Sound implementation would go here
    console.log(`Playing ${type} sound`)
  }

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    })
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 3000)
  }

  const handleDepartmentSelect = (deptId: string) => {
    setDepartment(deptId)
    setError("") // Clear any previous errors
    playSound("click")

    // Auto-scroll to semester section with a slight delay for better UX
    setTimeout(() => {
      semesterSectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      })
    }, 300)
  }

  const handleSemesterSelect = (sem: number) => {
    setSemester(sem)
    setError("") // Clear any previous errors
    playSound("click")
  }

  const handleContinue = async () => {
    setLoading(true)
    setError("")
    playSound("transition")

    try {
      // Simulate processing with a shorter delay
      await new Promise((resolve) => setTimeout(resolve, 800))

      // Get subjects for the selected department and semester
      const deptSubjects = subjectData[department as keyof typeof subjectData]?.[semester]

      if (!deptSubjects || deptSubjects.length === 0) {
        // Handle case where no subjects are found
        setError(
          `No subjects found for ${departments.find((d) => d.id === department)?.name} - Semester ${semester}. Please try a different semester or contact support.`,
        )
        playSound("error")
        setLoading(false)
        return
      }

      // Successfully found subjects, proceed to next step
      setSubjects(deptSubjects.map((subject) => ({ ...subject, grade: "" })))
      setStep(2)

      // Scroll to top of the new page for better UX
      window.scrollTo({ top: 0, behavior: "smooth" })
    } catch (err) {
      setError("An unexpected error occurred. Please try again.")
      playSound("error")
    } finally {
      setLoading(false)
    }
  }

  const handleGradeChange = (subjectIndex: number, grade: string) => {
    const updatedSubjects = [...subjects]
    updatedSubjects[subjectIndex].grade = grade
    setSubjects(updatedSubjects)
    playSound("click")
  }

  const calculateCGPA = async () => {
    setLoading(true)
    setError("")
    playSound("transition")

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      let totalGradePoints = 0
      let totalCredits = 0

      const subjectsWithGradePoints = subjects.map((subject) => {
        const gradeOption = gradeOptions.find((g) => g.value === subject.grade)
        const gradePoints = (gradeOption?.points || 0) * subject.credits

        // Only include credits for courses with grades other than F (as per section 1.10.2)
        if (subject.grade !== "F") {
          totalGradePoints += gradePoints
          totalCredits += subject.credits
        }

        return {
          ...subject,
          gradePoints,
        }
      })

      // Handle edge cases - no credited courses or division by zero
      const sgpa = totalCredits > 0 ? totalGradePoints / totalCredits : 0

      setResult({
        cgpa: Math.round(sgpa * 100) / 100, // Format to 2 decimal places
        totalCredits,
        totalGradePoints,
        subjects: subjectsWithGradePoints,
      })

      setStep(3)

      // Scroll to top of results page
      window.scrollTo({ top: 0, behavior: "smooth" })

      if (sgpa >= 8.5) {
        triggerConfetti()
        playSound("success")
      }
    } catch (err) {
      setError("Failed to calculate SGPA. Please try again.")
      playSound("error")
    } finally {
      setLoading(false)
    }
  }

  const startOver = () => {
    setStep(0)
    setDepartment("")
    setSemester(1)
    setSubjects([])
    setResult(null)
    setError("")
    setTitleText("")
    playSound("transition")
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const canContinue = department && semester && !loading
  const canCalculate = subjects.length > 0 && subjects.every((subject) => subject.grade) && !loading

  return (
    <div className={`min-h-screen bg-gradient-to-br ${theme.bg} relative overflow-hidden transition-all duration-1000`}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full blur-xl"
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            scale: [1, 0.8, 1],
          }}
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 1,
          }}
        />
        <motion.div
          className="absolute bottom-20 left-1/3 w-40 h-40 bg-gradient-to-r from-green-400/20 to-emerald-400/20 rounded-full blur-xl"
          animate={{
            x: [0, 120, 0],
            y: [0, -80, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent z-50"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: step / 3 }}
        transition={{ duration: 0.5 }}
      />

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <AnimatePresence mode="wait">
          {/* Welcome Screen */}
          {step === 0 && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-2xl"
            >
              <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="mb-8"
              >
                <div className="text-8xl mb-4">🎓</div>
                <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
                  {titleText}
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                    className="text-purple-500"
                  >
                    |
                  </motion.span>
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300">Calculate your CGPA with style and precision</p>
              </motion.div>

              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                <Button
                  onClick={() => setStep(1)}
                  className={`px-12 py-6 text-xl font-semibold bg-gradient-to-r ${theme.primary} text-white rounded-full shadow-2xl hover:shadow-purple-500/25 transition-all duration-300`}
                >
                  <motion.span whileHover={{ scale: 1.05 }} className="flex items-center gap-3">
                    Get Started <Sparkles className="w-6 h-6" />
                  </motion.span>
                </Button>
              </motion.div>
            </motion.div>
          )}

          {/* Selection Screen */}
          {step === 1 && (
            <motion.div
              key="selection"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.6 }}
              className="w-full max-w-4xl"
            >
              <Card className="bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl rounded-3xl p-8">
                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-center mb-8"
                >
                  <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">Choose Your Path</h2>
                  <p className="text-gray-600 dark:text-gray-300">Select your department and semester to begin</p>
                </motion.div>

                {/* Error Message */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3"
                  >
                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                    <p className="text-red-700 dark:text-red-300">{error}</p>
                  </motion.div>
                )}

                {/* Department Selection */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">Department</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {departments.map((dept, index) => (
                      <motion.div
                        key={dept.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * index }}
                        whileHover={{ scale: 1.05, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleDepartmentSelect(dept.id)}
                        className={`cursor-pointer p-6 rounded-2xl bg-gradient-to-br ${dept.color} text-white shadow-lg hover:shadow-xl transition-all duration-300 ${
                          department === dept.id ? "ring-4 ring-white/50 shadow-2xl" : ""
                        }`}
                      >
                        <div className="text-4xl mb-3">{dept.icon}</div>
                        <h4 className="font-semibold text-lg leading-tight">{dept.name}</h4>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Semester Selection */}
                <motion.div
                  ref={semesterSectionRef}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: department ? 1 : 0.5 }}
                  transition={{ duration: 0.3 }}
                  className="mb-8"
                >
                  <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">Semester: {semester}</h3>
                  <div className="flex flex-wrap gap-2">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                      <motion.button
                        key={sem}
                        onClick={() => handleSemesterSelect(sem)}
                        disabled={!department}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className={`w-12 h-12 rounded-full font-semibold transition-all duration-300 ${
                          semester === sem
                            ? `bg-gradient-to-r ${theme.primary} text-white shadow-lg`
                            : "bg-white/20 text-gray-600 dark:text-gray-300 hover:bg-white/30"
                        } ${!department ? "opacity-50 cursor-not-allowed" : ""}`}
                      >
                        {sem}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>

                {/* Continue Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-center"
                >
                  <Button
                    onClick={handleContinue}
                    disabled={!canContinue}
                    className={`px-8 py-4 text-lg font-semibold bg-gradient-to-r ${theme.primary} text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 ${
                      loading ? "animate-pulse" : ""
                    }`}
                  >
                    <motion.span
                      animate={loading ? { scale: [1, 1.02, 1] } : {}}
                      transition={{ duration: 0.8, repeat: loading ? Number.POSITIVE_INFINITY : 0, ease: "easeInOut" }}
                      className="flex items-center gap-2"
                    >
                      <BookOpen className={`w-5 h-5 ${loading ? "animate-pulse" : ""}`} />
                      {loading ? "Processing..." : "Continue"}
                    </motion.span>
                  </Button>
                </motion.div>
              </Card>
            </motion.div>
          )}

          {/* Subject Selection Screen */}
          {step === 2 && (
            <motion.div
              key="subjects"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.6 }}
              className="w-full max-w-5xl"
            >
              <Card className="bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl rounded-3xl p-8">
                <div className="flex items-center gap-4 mb-8">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setStep(1)}
                    className="rounded-full bg-white/20 hover:bg-white/30"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </Button>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Enter Your Grades</h2>
                    <p className="text-gray-600 dark:text-gray-300">
                      {departments.find((d) => d.id === department)?.name} - Semester {semester}
                    </p>
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3"
                  >
                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                    <p className="text-red-700 dark:text-red-300">{error}</p>
                  </motion.div>
                )}

                <div className="space-y-4 mb-8">
                  {subjects.map((subject, index) => (
                    <motion.div
                      key={subject.code}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300"
                    >
                      <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <Badge variant="outline" className="bg-white/20 text-gray-700 dark:text-gray-200">
                              {subject.code}
                            </Badge>
                            <Badge variant="secondary" className="bg-blue-500/20 text-blue-700 dark:text-blue-300">
                              {subject.credits} credits
                            </Badge>
                          </div>
                          <h3 className="font-semibold text-lg text-gray-800 dark:text-white">{subject.name}</h3>
                        </div>

                        <div className="flex gap-2 flex-wrap">
                          {gradeOptions.map((grade) => (
                            <motion.button
                              key={grade.value}
                              onClick={() => handleGradeChange(index, grade.value)}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className={`w-12 h-12 rounded-full font-semibold text-white shadow-lg transition-all duration-300 ${
                                subject.grade === grade.value
                                  ? `bg-gradient-to-r ${grade.color} ring-4 ring-white/50 shadow-xl`
                                  : `bg-gradient-to-r ${grade.color} opacity-60 hover:opacity-100`
                              }`}
                            >
                              {grade.label}
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-center"
                >
                  <Button
                    onClick={calculateCGPA}
                    disabled={!canCalculate}
                    className={`px-12 py-6 text-xl font-semibold bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full shadow-2xl hover:shadow-green-500/25 transition-all duration-300 disabled:opacity-50`}
                  >
                    <motion.span
                      animate={loading ? { scale: [1, 1.1, 1] } : {}}
                      transition={{ duration: 0.5, repeat: loading ? Number.POSITIVE_INFINITY : 0 }}
                      className="flex items-center gap-3"
                    >
                      <Calculator className="w-6 h-6" />
                      {loading ? "Calculating..." : "Calculate SGPA"}
                    </motion.span>
                  </Button>
                </motion.div>
              </Card>
            </motion.div>
          )}

          {/* Results Screen */}
          {step === 3 && result && (
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.6 }}
              className="w-full max-w-4xl"
            >
              <Card className="bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl rounded-3xl p-8 text-center">
                <motion.div
                  initial={{ y: -50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="mb-8"
                >
                  <div className="text-6xl mb-4">
                    {result.cgpa >= 9 ? "🏆" : result.cgpa >= 8 ? "🎉" : result.cgpa >= 7 ? "👏" : "📚"}
                  </div>
                  <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">Your SGPA Result</h2>

                  {/* Animated CGPA Display */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                    className="relative inline-block"
                  >
                    <div
                      className={`text-8xl font-bold bg-gradient-to-r ${theme.primary} bg-clip-text text-transparent`}
                    >
                      {result.cgpa.toFixed(2)}
                    </div>
                    {showConfetti && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: [0, 1.5, 1] }}
                        className="absolute -top-4 -right-4 text-4xl"
                      >
                        ✨
                      </motion.div>
                    )}
                  </motion.div>

                  <p className="text-xl text-gray-600 dark:text-gray-300 mt-4">
                    Based on {result.totalCredits} total credits
                  </p>
                </motion.div>

                {/* Grade Breakdown */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 mb-8"
                >
                  <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Grade Breakdown</h3>
                  <div className="grid gap-3">
                    {result.subjects.map((subject, index) => (
                      <motion.div
                        key={subject.code}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 + 0.1 * index }}
                        className="flex justify-between items-center p-3 bg-white/5 rounded-lg"
                      >
                        <div className="text-left">
                          <span className="font-medium text-gray-800 dark:text-white">{subject.code}</span>
                          <span className="text-gray-600 dark:text-gray-300 ml-2">- {subject.name}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge
                            className={`bg-gradient-to-r ${
                              gradeOptions.find((g) => g.value === subject.grade)?.color || "from-gray-400 to-gray-500"
                            } text-white`}
                          >
                            {subject.grade}
                          </Badge>
                          <span className="text-gray-600 dark:text-gray-300 min-w-[60px] text-right">
                            {subject.gradePoints} pts
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                  <Button
                    onClick={() => setStep(2)}
                    variant="outline"
                    className="px-6 py-3 bg-white/10 border-white/20 text-gray-700 dark:text-gray-200 hover:bg-white/20"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Recalculate
                  </Button>
                  <Button
                    onClick={startOver}
                    className={`px-6 py-3 bg-gradient-to-r ${theme.primary} text-white hover:shadow-lg`}
                  >
                    <GraduationCap className="w-4 h-4 mr-2" />
                    Start Over
                  </Button>
                  <Button
                    variant="outline"
                    className="px-6 py-3 bg-white/10 border-white/20 text-gray-700 dark:text-gray-200 hover:bg-white/20"
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    Share Result
                  </Button>
                </motion.div>

                {/* Achievement Badge */}
                {result.cgpa >= 8.5 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.2, type: "spring" }}
                    className="mt-6"
                  >
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full font-semibold">
                      <Trophy className="w-5 h-5" />
                      Excellence Achievement Unlocked!
                    </div>
                  </motion.div>
                )}
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
