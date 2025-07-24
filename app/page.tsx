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
    icon: "📡",
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
    icon: "🧱",
    color: "from-green-500 to-emerald-600",
    pattern: "building",
  },
  {
    id: "ee",
    name: "Electrical Engineering",
    icon: "⚡️",
    color: "from-red-500 to-pink-600",
    pattern: "electric",
  },
  {
    id: "sf",
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
    { "code": "23-200-0101B", "name": "Calculus", "credits": 4 },
    { "code": "23-200-0102B", "name": "Engineering Physics", "credits": 3 },
    { "code": "23-200-0103B", "name": "Introduction to Electronic devices & Circuits", "credits": 4 },
    { "code": "23-200-0104B", "name": "Introduction to Electrical Engineering", "credits": 3 },
    { "code": "23-200-0105B", "name": "Computer programming", "credits": 3 },
    { "code": "23-200-0106B", "name": "Soft Skills Development", "credits": 2 },
    { "code": "23-200-0107B", "name": "Computer Programming Laboratory", "credits": 1 },
    { "code": "23-200-0108B", "name": "Basic Electrical Lab", "credits": 1 },
    { "code": "23-200-0109B", "name": "Language Laboratory", "credits": 1 },
    { "code": "23-200-0110B", "name": "NSS/Nature conservation Activities/Yoga", "credits": 0 }
  ],
  2: [
    { "code": "23-200-0201B", "name": "Linear Algebra & Transform Techniques", "credits": 4 },
    { "code": "23-200-0202B", "name": "Engineering Chemistry", "credits": 3 },
    { "code": "23-200-0203B", "name": "Digital Electronics", "credits": 3 },
    { "code": "23-200-0204B", "name": "Object Oriented Programming in C++", "credits": 4 },
    { "code": "23-200-0205B", "name": "Introduction to Cyber Physical Systems", "credits": 3 },
    { "code": "23-200-0206B", "name": "Environmental and Life Sciences", "credits": 3 },
    { "code": "23-200-0207B", "name": "Digital Electronics Lab", "credits": 1 },
    { "code": "23-200-0208B", "name": "Basic Electronics Lab", "credits": 1 }
  ],
  3: [
    { "code": "23-200-0301B*", "name": "Differential Equations and Complex Variables", "credits": 3 },
    { "code": "23-202-0302", "name": "Discrete Computational Structures", "credits": 3 },
    { "code": "23-202-0303", "name": "Data Structures and Algorithms", "credits": 3 },
    { "code": "23-202-0304", "name": "Computer Organization and Architecture", "credits": 3 },
    { "code": "23-202-0305", "name": "Database Management Systems", "credits": 3 },
    { "code": "23-202-0306", "name": "Object Oriented Programming Lab", "credits": 1 },
    { "code": "23-202-0307", "name": "Data Structures Lab", "credits": 1 },
    { "code": "23-202-0308", "name": "Database Management Systems Lab", "credits": 1 },
    { "code": "23-202-0309", "name": "Internship-I", "credits": 1 }
  ],
  4: [
    { "code": "23-200-0401B*", "name": "Numerical and Statistical Techniques", "credits": 3 },
    { "code": "23-202-0402", "name": "Operating Systems", "credits": 3 },
    { "code": "23-202-0403", "name": "Formal Languages and Automata Theory", "credits": 3 },
    { "code": "23-202-0404", "name": "Analysis and Design of Algorithms", "credits": 3 },
    { "code": "23-202-0405", "name": "Microprocessor and Microcontrollers", "credits": 3 },
    { "code": "23-202-0406", "name": "Data Communication", "credits": 3 },
    { "code": "23-200-0407**", "name": "Universal Human Values", "credits": 3 },
    { "code": "23-202-0408", "name": "Operating Systems Lab", "credits": 1 },
    { "code": "23-202-0409", "name": "Hardware Design Lab", "credits": 1 }
  ],
  5: [
    { "code": "23-202-0501", "name": "Compiler Design", "credits": 3 },
    { "code": "23-202-0502", "name": "Software Engineering", "credits": 3 },
    { "code": "23-202-0503", "name": "Computer Networks", "credits": 3 },
    { "code": "23-202-0504", "name": "Artificial Intelligence", "credits": 3 },
    { "code": "23-202-0505", "name": "Microprocessors & Microcontrollers Lab", "credits": 1 },
    { "code": "23-202-05**", "name": "Professional Elective-I", "credits": 3 },
    { "code": "23-202-0510", "name": "Networks Lab", "credits": 1 },
    { "code": "23-202-0511", "name": "Software Engineering Lab", "credits": 1 },
    { "code": "23-202-0512", "name": "Mini Project", "credits": 1 },
    { "code": "23-202-0513", "name": "Internship-II", "credits": 1 }
  ],
  6: [
    { "code": "23-202-0601", "name": "Machine Learning", "credits": 3 },
    { "code": "23-202-0602", "name": "Cloud Computing", "credits": 3 },
    { "code": "23-202-0603", "name": "Object Oriented Modeling & Design", "credits": 3 },
    { "code": "23-202-0604", "name": "Internet Programming", "credits": 3 },
    { "code": "23-202-0605", "name": "Theory of Computation", "credits": 3 },
    { "code": "23-202-06**", "name": "Professional Elective-II", "credits": 3 },
    { "code": "23-202-06**", "name": "Professional Elective-III", "credits": 3 },
    { "code": "23-202-0610", "name": "Cloud Computing Lab", "credits": 1 },
    { "code": "23-202-0611", "name": "Web Technology Lab", "credits": 1 }
  ],
  7: [
    { "code": "23-200-0701*", "name": "Principles of Management", "credits": 3 },
    { "code": "23-202-0702", "name": "Internet of Things", "credits": 3 },
    { "code": "23-202-0703", "name": "Cyber Security", "credits": 3 },
    { "code": "23-202-07**", "name": "Professional Elective-IV", "credits": 3 },
    { "code": "23-202-07**", "name": "Professional Elective-V", "credits": 3 },
    { "code": "23-202-07**", "name": "Open Elective-I", "credits": 3 },
    { "code": "23-202-0710", "name": "Machine Learning Lab", "credits": 1 },
    { "code": "23-202-0711", "name": "Mini Project", "credits": 1 },
    { "code": "23-202-0712", "name": "Entrepreneurship Development", "credits": 1 },
    { "code": "23-202-0713", "name": "Project Phase I", "credits": 2 },
    { "code": "23-202-0714", "name": "Internship-III", "credits": 1 }
  ],
  8: [
    { "code": "23-202-08**", "name": "Professional Elective-VI", "credits": 3 },
    { "code": "23-202-08**", "name": "Professional Elective-VII", "credits": 3 },
    { "code": "23-202-08**", "name": "Professional Elective-VIII", "credits": 3 },
    { "code": "23-202-08**", "name": "Open Elective-II", "credits": 3 },
    { "code": "23-202-0818", "name": "Seminar", "credits": 1 },
    { "code": "23-202-0819", "name": "Project Phase II", "credits": 6 },
    { "code": "23-202-0820", "name": "Comprehensive Viva Voce", "credits": 1 }
  ]
},
  ece: {
  1: [
    { "code": "23-200-0101B", "name": "Calculus", "credits": 4 },
    { "code": "23-200-0102B", "name": "Engineering Physics", "credits": 3 },
    { "code": "23-200-0103B", "name": "Introduction to Electronics devices & Circuits", "credits": 4 },
    { "code": "23-200-0104B", "name": "Introduction to Electrical Engineering", "credits": 3 },
    { "code": "23-200-0105B", "name": "Computer programming", "credits": 3 },
    { "code": "23-200-0106B", "name": "Soft Skills Development", "credits": 2 },
    { "code": "23-200-0107B", "name": "Computer Programming Laboratory", "credits": 1 },
    { "code": "23-200-0108B", "name": "Basic Electrical lab", "credits": 1 },
    { "code": "23-200-0109B", "name": "Language Laboratory", "credits": 1 },
    { "code": "23-200-0110B", "name": "NSS/Nature conservation Activities/Yoga", "credits": 0 }
  ],
  2: [
    { "code": "23-200-0201B", "name": "Linear Algebra & Transform Techniques", "credits": 4 },
    { "code": "23-200-0202B", "name": "Engineering Chemistry", "credits": 3 },
    { "code": "23-200-0203B", "name": "Digital Electronics", "credits": 3 },
    { "code": "23-200-0204B", "name": "Object Oriented Programming in C++", "credits": 4 },
    { "code": "23-200-0205B", "name": "Introduction to Cyber Physical Systems", "credits": 3 },
    { "code": "23-200-0206B", "name": "Environmental and Life Sciences", "credits": 3 },
    { "code": "23-200-0207B", "name": "Digital Electronics Lab", "credits": 1 },
    { "code": "23-200-0208B", "name": "Basic Electronics Lab", "credits": 1 }
  ],
  3: [
    { "code": "23-200-0301B*", "name": "Differential Equations and Complex Variables", "credits": 3 },
    { "code": "23-203-0302", "name": "Network Theory", "credits": 3 },
    { "code": "23-203-0303", "name": "Electronic Circuits", "credits": 3 },
    { "code": "23-203-0304", "name": "Digital System Design", "credits": 3 },
    { "code": "23-203-0305", "name": "Microprocessors and Microcontrollers", "credits": 3 },
    { "code": "23-203-0306", "name": "Solid State Devices", "credits": 3 },
    { "code": "23-203-0307", "name": "Electronic Circuits Laboratory", "credits": 1 },
    { "code": "23-203-0308", "name": "Digital Systems & Programming Laboratory", "credits": 1 },
    { "code": "23-203-0309", "name": "Internship-1", "credits": 1 }
  ],
  4: [
    { "code": "23-200-0401B*", "name": "Numerical and Statistical Techniques", "credits": 3 },
    { "code": "23-203-0402", "name": "Analog integrated Circuits", "credits": 3 },
    { "code": "23-203-0403", "name": "Signals & Systems", "credits": 3 },
    { "code": "23-203-0404", "name": "Electromagnetic Theory", "credits": 3 },
    { "code": "23-203-0405", "name": "Introduction to Communication Engineering", "credits": 3 },
    { "code": "23-203-0406", "name": "Python for Machine Learning Applications", "credits": 2 },
    { "code": "23-200-0407**", "name": "Universal Human Values", "credits": 3 },
    { "code": "23-203-0408", "name": "Mini Project", "credits": 2 },
    { "code": "23-203-0409", "name": "Analog Integrated Circuit Laboratory", "credits": 1 }
  ],
  5: [
    { "code": "23-203-0501", "name": "Embedded Systems", "credits": 3 },
    { "code": "23-203-0502", "name": "Microwave Engineering", "credits": 3 },
    { "code": "23-203-0503", "name": "Digital Communication Engineering", "credits": 3 },
    { "code": "23-203-0504", "name": "VLSI design", "credits": 3 },
    { "code": "23-203-0505", "name": "Digital Signal Processing", "credits": 3 },
    { "code": "23-203-05**", "name": "Professional Elective I (MOOC)", "credits": 3 },
    { "code": "23-203-0510", "name": "Digital Signal Processing Laboratory", "credits": 1 },
    { "code": "23-203-0511", "name": "Communication Laboratory", "credits": 1 },
    { "code": "23-203-0512", "name": "Internship-II", "credits": 1 }
  ],
  6: [
    { "code": "23-203-0601", "name": "Information theory and Coding", "credits": 3 },
    { "code": "23-203-0602", "name": "Digital Image Processing", "credits": 3 },
    { "code": "23-203-0603", "name": "Control System", "credits": 3 },
    { "code": "23-203-0604", "name": "Antenna Theory", "credits": 3 },
    { "code": "23-203-06**", "name": "Professional Elective - II", "credits": 4 },
    { "code": "23-203-06**", "name": "Professional Elective - III", "credits": 3 },
    { "code": "23-203-0613", "name": "Minor Project based on embedded systems", "credits": 2 },
    { "code": "23-203-0614", "name": "Microwave Engineering Laboratory", "credits": 1 }
  ],
  7: [
    { "code": "23-200-0701*", "name": "Principles of Management", "credits": 3 },
    { "code": "23-203-0702", "name": "Wireless Communication", "credits": 4 },
    { "code": "23-203-07**", "name": "Professional Elective - IV", "credits": 4 },
    { "code": "23-203-07**", "name": "Professional Elective - V", "credits": 3 },
    { "code": "23-203-07**", "name": "Open Elective I", "credits": 3 },
    { "code": "23-203-0714", "name": "Entrepreneurship Development", "credits": 1 },
    { "code": "23-203-0715", "name": "Seminar", "credits": 1 },
    { "code": "23-203-0716", "name": "Project phase I", "credits": 2 },
    { "code": "23-203-0717", "name": "Internship-III", "credits": 1 }
  ],
  8: [
    { "code": "23-203-08**", "name": "Professional Elective VI", "credits": 4 },
    { "code": "23-203-08**", "name": "Professional Elective VII", "credits": 3 },
    { "code": "23-20*-08**", "name": "Open Elective II", "credits": 3 },
    { "code": "23-203-0813", "name": "Project phase II", "credits": 6 },
    { "code": "23-203-0814", "name": "Comprehensive Viva Voce", "credits": 1 }
  ]
},
  me: {
  1: [
    { "code": "23-200-0101A", "name": "Calculus", "credits": 3 },
    { "code": "23-200-0102A", "name": "Engineering Chemistry", "credits": 3 },
    { "code": "23-200-0103A", "name": "Engineering Graphics", "credits": 3 },
    { "code": "23-200-0104A", "name": "Basic Civil Engineering", "credits": 4 },
    { "code": "23-200-0105A", "name": "Basic Mechanical Engineering", "credits": 4 },
    { "code": "23-200-0106A", "name": "Environmental and Life Sciences", "credits": 3 },
    { "code": "23-200-0107A", "name": "Civil Engineering Workshop", "credits": 1 },
    { "code": "23-200-0108A", "name": "Mechanical Engineering Workshop", "credits": 1 }
  ],
  2: [
    { "code": "23-200-0201A", "name": "Computer Programming & Problem Solving", "credits": 4 },
    { "code": "23-200-0202A", "name": "Engineering Physics", "credits": 3 },
    { "code": "23-200-0203A", "name": "Engineering Mechanics", "credits": 4 },
    { "code": "23-200-0204A", "name": "Basic Electrical Engineering", "credits": 3 },
    { "code": "23-200-0205A", "name": "Basic Electronics Engineering", "credits": 3 },
    { "code": "23-200-0206A", "name": "Soft Skills Development", "credits": 2 },
    { "code": "23-200-0207A", "name": "Programming Lab", "credits": 1 },
    { "code": "23-200-0208A", "name": "Electrical & Electronics Lab", "credits": 1 },
    { "code": "23-200-0209A", "name": "Language Lab", "credits": 1 },
    { "code": "23-200-0210A", "name": "NSS/Nature/Yoga", "credits": 0 }
  ],
  3: [
    { "code": "23-200-0301A", "name": "Linear Algebra & Transform Techniques", "credits": 3 },
    { "code": "23-205-0302", "name": "Electrical Technology", "credits": 3 },
    { "code": "23-205-0303", "name": "Mechanics of Solids", "credits": 3 },
    { "code": "23-205-0304", "name": "Fluid Mechanics & Hydraulic Machinery", "credits": 3 },
    { "code": "23-205-0305", "name": "Metallurgy & Materials Science", "credits": 3 },
    { "code": "23-205-0306", "name": "Machine Drawing", "credits": 3 },
    { "code": "23-205-0307", "name": "Strength of Materials Lab", "credits": 1 },
    { "code": "23-205-0308", "name": "Fluid Mechanics Lab", "credits": 1 },
    { "code": "23-205-0309", "name": "Internship I", "credits": 1 }
  ],
  4: [
    { "code": "23-200-0401A", "name": "Complex Variables & PDE", "credits": 3 },
    { "code": "23-205-0402", "name": "Metrology & Instrumentation", "credits": 3 },
    { "code": "23-205-0403", "name": "Mechatronics", "credits": 3 },
    { "code": "23-205-0404", "name": "Applied Thermodynamics", "credits": 3 },
    { "code": "23-205-0405", "name": "Mgmt. & Industrial Engineering", "credits": 3 },
    { "code": "23-205-0406", "name": "Manufacturing Processes", "credits": 3 },
    { "code": "23-200-0407", "name": "Universal Human Values", "credits": 3 },
    { "code": "23-205-0408", "name": "Metrology Lab", "credits": 1 },
    { "code": "23-205-0409", "name": "Hydraulic Machinery Lab", "credits": 1 }
  ],
  5: [
    { "code": "23-200-0501A", "name": "Numerical & Statistical Methods", "credits": 3 },
    { "code": "23-205-0502", "name": "Mechanics of Machinery", "credits": 3 },
    { "code": "23-205-0503", "name": "Machine Tools", "credits": 3 },
    { "code": "23-205-0504", "name": "Thermal Engineering", "credits": 3 },
    { "code": "23-205-0505", "name": "Advanced Manufacturing Tech.", "credits": 3 },
    { "code": "23-205-05**", "name": "Professional Elective I (MOOC)", "credits": 3 },
    { "code": "23-205-0510", "name": "Computational Methods Lab", "credits": 1 },
    { "code": "23-205-0511", "name": "Machine Shop I", "credits": 1 },
    { "code": "23-205-0512", "name": "Internship II", "credits": 1 }
  ],
  6: [
    { "code": "23-205-0601", "name": "Dynamics of Machinery", "credits": 3 },
    { "code": "23-205-0602", "name": "Design of Machine Elements I", "credits": 3 },
    { "code": "23-205-0603", "name": "Compressible Fluid Flow", "credits": 3 },
    { "code": "23-205-0604", "name": "Heat & Mass Transfer", "credits": 3 },
    { "code": "23-205-0605", "name": "CAD & Analysis", "credits": 3 },
    { "code": "23-205-06**", "name": "Professional Elective II", "credits": 3 },
    { "code": "23-205-0610", "name": "Machine Shop II", "credits": 1 },
    { "code": "23-205-0611", "name": "Thermal Engineering Lab", "credits": 1 }
  ],
  7: [
    { "code": "23-205-0701", "name": "Refrigeration & AC", "credits": 3 },
    { "code": "23-205-0702", "name": "Vibration & Noise Control", "credits": 3 },
    { "code": "23-205-0703", "name": "Design of Machine Elements II", "credits": 3 },
    { "code": "23-205-07**", "name": "Prof. Elective III", "credits": 3 },
    { "code": "23-205-07**", "name": "Open Elective I", "credits": 3 },
    { "code": "23-205-0712", "name": "Heat & Mass Transfer Lab", "credits": 1 },
    { "code": "23-205-0713", "name": "CAD & Analysis Lab", "credits": 1 },
    { "code": "23-205-0714", "name": "Entrepreneurship", "credits": 1 },
    { "code": "23-205-0715", "name": "Project Phase I", "credits": 2 },
    { "code": "23-205-0716", "name": "Internship III", "credits": 1 }
  ],
  8: [
    { "code": "23-205-08**", "name": "Prof. Elective IV", "credits": 3 },
    { "code": "23-205-08**", "name": "Prof. Elective V", "credits": 3 },
    { "code": "23-205-08**", "name": "Prof. Elective VI", "credits": 3 },
    { "code": "23-205-08**", "name": "Open Elective II", "credits": 3 },
    { "code": "23-205-0818", "name": "Seminar", "credits": 1 },
    { "code": "23-205-0819", "name": "Project Phase II", "credits": 6 },
    { "code": "23-205-0820", "name": "Comprehensive Viva", "credits": 1 }
  ]
},
  ce: {
  1: [
    { "code": "23-200-0101A", "name": "Calculus", "credits": 3 },
    { "code": "23-200-0102A", "name": "Engineering Chemistry", "credits": 3 },
    { "code": "23-200-0103A", "name": "Engineering Graphics", "credits": 3 },
    { "code": "23-200-0104A", "name": "Basic Civil Engineering", "credits": 4 },
    { "code": "23-200-0105A", "name": "Basic Mechanical Engineering", "credits": 4 },
    { "code": "23-200-0106A", "name": "Environmental and Life Sciences", "credits": 3 },
    { "code": "23-200-0107A", "name": "Civil Engineering Workshop", "credits": 1 },
    { "code": "23-200-0108A", "name": "Mechanical Engineering Workshop", "credits": 1 }
  ],
  2: [
    { "code": "23-200-0201A", "name": "Computer Programming and Problem Solving", "credits": 4 },
    { "code": "23-200-0202A", "name": "Engineering Physics", "credits": 3 },
    { "code": "23-200-0203A", "name": "Engineering Mechanics", "credits": 4 },
    { "code": "23-200-0204A", "name": "Basic Electrical Engineering", "credits": 3 },
    { "code": "23-200-0205A", "name": "Basic Electronics Engineering", "credits": 3 },
    { "code": "23-200-0206A", "name": "Soft Skills Development", "credits": 2 },
    { "code": "23-200-0207A", "name": "Computer Programming Laboratory", "credits": 1 },
    { "code": "23-200-0208A", "name": "Basic Electrical and Electronics Engineering Laboratory", "credits": 1 },
    { "code": "23-200-0209A", "name": "Language Laboratory", "credits": 1 },
    { "code": "23-200-0210A", "name": "NSS/Nature conservation Activities/Yoga", "credits": 0 }
  ],
  3: [
    { "code": "23-200-0301A*", "name": "Linear Algebra and Transform Techniques", "credits": 3 },
    { "code": "23-201-0302", "name": "Surveying -I", "credits": 3 },
    { "code": "23-201-0303", "name": "Strength of Materials", "credits": 3 },
    { "code": "23-201-0304", "name": "Concrete Technology", "credits": 3 },
    { "code": "23-201-0305", "name": "Fluid Mechanics -I", "credits": 3 },
    { "code": "23-201-0306", "name": "Building Technology and Functional Planning", "credits": 3 },
    { "code": "23-201-0307", "name": "Strength of Materials Testing Laboratory", "credits": 1 },
    { "code": "23-201-0308", "name": "Concrete Testing Laboratory", "credits": 1 },
    { "code": "23-201-0309", "name": "Internship-1", "credits": 1 }
  ],
  4: [
    { "code": "23-200-0401A*", "name": "Complex Variables and Partial Differential Equations", "credits": 3 },
    { "code": "23-201-0402", "name": "Surveying -II", "credits": 3 },
    { "code": "23-201-0403", "name": "Analysis of Structures -I", "credits": 3 },
    { "code": "23-201-0404", "name": "Transportation Engineering -I", "credits": 3 },
    { "code": "23-201-0405", "name": "Fluid Mechanics II", "credits": 3 },
    { "code": "23-201-0406", "name": "Geotechnical Engineering -I", "credits": 3 },
    { "code": "23-201-0407**", "name": "Universal Human Values", "credits": 3 },
    { "code": "23-201-0408", "name": "Survey Practices Laboratory", "credits": 1 },
    { "code": "23-201-0409", "name": "Fluid Mechanics Laboratory", "credits": 1 }
  ],
  5: [
    { "code": "23-200-0501A*", "name": "Numerical and Statistical Methods", "credits": 3 },
    { "code": "23-201-0502", "name": "Design of Concrete Structures-I", "credits": 3 },
    { "code": "23-201-0503", "name": "Analysis of Structures -II", "credits": 3 },
    { "code": "23-201-0504", "name": "Transportation Engineering -II", "credits": 3 },
    { "code": "23-201-0505", "name": "Geotechnical Engineering -II", "credits": 3 },
    { "code": "23-201-05**", "name": "Professional Elective -I (MOOC)", "credits": 3 },
    { "code": "23-201-0510", "name": "Geotechnical Engineering Laboratory", "credits": 1 },
    { "code": "23-201-0511", "name": "Transportation Engineering Laboratory", "credits": 1 },
    { "code": "23-201-0512", "name": "Internship-II", "credits": 1 }
  ],
  6: [
    { "code": "23-201-0601", "name": "Environmental Engineering -I", "credits": 3 },
    { "code": "23-201-0602", "name": "Design of Steel Structures", "credits": 3 },
    { "code": "23-201-0603", "name": "Advanced Methods of Structural Analysis", "credits": 3 },
    { "code": "23-201-0604", "name": "Water Resources and Irrigation Engineering", "credits": 3 },
    { "code": "23-201-0605", "name": "Construction Management", "credits": 3 },
    { "code": "23-201-06**", "name": "Professional Elective - II", "credits": 3 },
    { "code": "23-201-0610", "name": "Environmental Engineering Laboratory", "credits": 1 },
    { "code": "23-201-0611", "name": "Mini Project-Architecture Design Studio", "credits": 1 }
  ],
  7: [
    { "code": "23-201-0701", "name": "Environmental Engineering - II", "credits": 3 },
    { "code": "23-201-0702", "name": "Quantity Surveying and Valuation", "credits": 3 },
    { "code": "23-201-0703", "name": "Design of Concrete Structures -II", "credits": 3 },
    { "code": "23-201-07**", "name": "Professional Elective - III", "credits": 3 },
    { "code": "23-201-07**", "name": "Open Elective-I", "credits": 3 },
    { "code": "23-201-0712", "name": "Structural Design Studio", "credits": 1 },
    { "code": "23-201-0713", "name": "Structural Engineering and Building Technology Laboratory", "credits": 1 },
    { "code": "23-201-0714", "name": "Entrepreneurship Development", "credits": 1 },
    { "code": "23-201-0715", "name": "Project-Phase I", "credits": 2 },
    { "code": "23-201-0716", "name": "Internship-III", "credits": 1 }
  ],
  8: [
    { "code": "23-201-08**", "name": "Professional Elective IV", "credits": 3 },
    { "code": "23-201-08**", "name": "Professional Elective V", "credits": 3 },
    { "code": "23-201-08**", "name": "Professional Elective VI", "credits": 3 },
    { "code": "23-201-08**", "name": "Open Elective II", "credits": 3 },
    { "code": "23-201-0818", "name": "Seminar", "credits": 1 },
    { "code": "23-201-0819", "name": "Project Phase II", "credits": 6 },
    { "code": "23-201-0820", "name": "Comprehensive Viva Voce", "credits": 1 }
  ]
},
  ee: {
  1: [
    { "code": "23-200-0101B", "name": "Calculus", "credits": 4 },
    { "code": "23-200-0102B", "name": "Engineering Physics", "credits": 3 },
    { "code": "23-200-0103B", "name": "Introduction to Electronic devices and Circuits", "credits": 4 },
    { "code": "23-200-0104B", "name": "Introduction to Electrical Engineering", "credits": 3 },
    { "code": "23-200-0105B", "name": "Computer programming", "credits": 3 },
    { "code": "23-200-0106B", "name": "Soft Skills Development", "credits": 2 },
    { "code": "23-200-0107B", "name": "Computer Programming Laboratory", "credits": 1 },
    { "code": "23-200-0108B", "name": "Basic Electrical Engineering Laboratory", "credits": 1 },
    { "code": "23-200-0109B", "name": "Language Laboratory", "credits": 1 },
    { "code": "23-200-0110B", "name": "NSS/Nature conservation Activities/Yoga", "credits": 0 }
  ],
  2: [
    { "code": "23-200-0201B", "name": "Linear Algebra and Transform Techniques", "credits": 4 },
    { "code": "23-200-0202B", "name": "Engineering Chemistry", "credits": 3 },
    { "code": "23-200-0203B", "name": "Digital Electronics", "credits": 3 },
    { "code": "23-200-0204B", "name": "Object Oriented Programming in C++", "credits": 4 },
    { "code": "23-200-0205B", "name": "Introduction to Cyber Physical Systems", "credits": 3 },
    { "code": "23-200-0206B", "name": "Environmental and Life Sciences", "credits": 3 },
    { "code": "23-200-0207B", "name": "Digital electronics Laboratory", "credits": 1 },
    { "code": "23-200-0208B", "name": "Basic Electronics Laboratory", "credits": 1 }
  ],
  3: [
    { "code": "23-200-0301B*", "name": "Differential Equations and Complex Variables", "credits": 3 },
    { "code": "23-209-0302", "name": "Electrical Machines-I", "credits": 3 },
    { "code": "23-209-0303", "name": "Circuits and Networks", "credits": 3 },
    { "code": "23-209-0304", "name": "Measurements and Instrumentation", "credits": 3 },
    { "code": "23-209-0305", "name": "Analog Integrated Circuits I", "credits": 3 },
    { "code": "23-209-0306", "name": "Microprocessor and Microcontroller Based systems", "credits": 3 },
    { "code": "23-209-0307", "name": "Measurements and Instrumentation Laboratory", "credits": 1 },
    { "code": "23-209-0308", "name": "Cyber Physical Systems Laboratory", "credits": 1 },
    { "code": "23-209-0309", "name": "Internship-1", "credits": 1 }
  ],
  4: [
    { "code": "23-200-0401B*", "name": "Statistical Numerical and Techniques", "credits": 3 },
    { "code": "23-209-0402", "name": "Signals and Systems", "credits": 3 },
    { "code": "23-209-0403", "name": "Electrical Machines-II", "credits": 3 },
    { "code": "23-209-0404", "name": "Power Electronics", "credits": 3 },
    { "code": "23-209-0405", "name": "Electro Magnetic Theory", "credits": 3 },
    { "code": "23-209-0406", "name": "Analog Integrated Circuits II", "credits": 3 },
    { "code": "23-200-0407**", "name": "Universal Human Values", "credits": 3 },
    { "code": "23-209-0408", "name": "Electrical Machines Laboratory -I", "credits": 1 },
    { "code": "23-209-0409", "name": "Analog Integrated Circuits Laboratory", "credits": 1 }
  ],
  5: [
    { "code": "23-209-0501", "name": "Power Semiconductor Drives", "credits": 3 },
    { "code": "23-209-0502", "name": "Control Systems I", "credits": 3 },
    { "code": "23-209-0503", "name": "Renewable Energy Sources", "credits": 3 },
    { "code": "23-209-0504", "name": "Digital Signal Processing", "credits": 3 },
    { "code": "23-209-0505", "name": "Power Systems-I", "credits": 3 },
    { "code": "23-209-05**", "name": "Professional Elective I", "credits": 3 },
    { "code": "23-209-0510", "name": "Power Electronics Laboratory", "credits": 1 },
    { "code": "23-209-0511", "name": "Electrical Machines Laboratory -II", "credits": 1 }
  ],
  6: [
    { "code": "23-209-0601", "name": "Power Systems-II", "credits": 3 },
    { "code": "23-209-0602", "name": "Control Systems-II", "credits": 3 },
    { "code": "23-209-0603", "name": "Electric Vehicles", "credits": 3 },
    { "code": "23-209-0604", "name": "Machine Learning", "credits": 3 },
    { "code": "23-209-0605", "name": "VLSI design", "credits": 3 },
    { "code": "23-209-06**", "name": "Professional Elective -II", "credits": 3 },
    { "code": "23-209-0610", "name": "Mini Project", "credits": 1 },
    { "code": "23-209-0611", "name": "Power Systems Laboratory", "credits": 1 }
  ],
  7: [
    { "code": "23-200-0701*", "name": "Principles of Management", "credits": 3 },
    { "code": "23-209-0702", "name": "Electrical System Design", "credits": 3 },
    { "code": "23-209-0703", "name": "Communication Engineering", "credits": 3 },
    { "code": "23-209-07**", "name": "Professional Elective-III", "credits": 3 },
    { "code": "23-209-07**", "name": "Open Elective-I", "credits": 3 },
    { "code": "23-209-0712", "name": "Computer Aided Design Laboratory", "credits": 1 },
    { "code": "23-209-0713", "name": "Control Systems Laboratory", "credits": 1 },
    { "code": "23-209-0714", "name": "Entrepreneurship Development", "credits": 1 },
    { "code": "23-209-0715", "name": "Project Phase I", "credits": 2 },
    { "code": "23-209-0716", "name": "Internship-III", "credits": 1 }
  ],
  8: [
    { "code": "23-209-08**", "name": "Professional Elective IV", "credits": 3 },
    { "code": "23-209-08**", "name": "Professional Elective V", "credits": 3 },
    { "code": "23-209-08**", "name": "Professional Elective VI", "credits": 3 },
    { "code": "23-209-08**", "name": "Open Elective II", "credits": 3 },
    { "code": "23-209-0818", "name": "Seminar", "credits": 1 },
    { "code": "23-209-0819", "name": "Project Phase II", "credits": 6 },
    { "code": "23-209-0820", "name": "Comprehensive Viva Voce", "credits": 1 }
  ]
},

  sf: {
  1: [
    { "code": "23-200-0101A", "name": "Calculus", "credits": 3 },
    { "code": "23-200-0102A", "name": "Engineering Chemistry", "credits": 3 },
    { "code": "23-200-0103A", "name": "Engineering Graphics", "credits": 3 },
    { "code": "23-200-0104A", "name": "Basic Civil Engineering", "credits": 4 },
    { "code": "23-200-0105A", "name": "Basic Mechanical Engineering", "credits": 4 },
    { "code": "23-200-0106A", "name": "Environmental and Life Sciences", "credits": 3 },
    { "code": "23-200-0107A", "name": "Civil Engineering Workshop", "credits": 1 },
    { "code": "23-200-0108A", "name": "Mechanical Engineering Workshop", "credits": 1 }
  ],
  2: [
    { "code": "23-200-0201A", "name": "Computer Programming and Problem Solving", "credits": 4 },
    { "code": "23-200-0202A", "name": "Engineering Physics", "credits": 3 },
    { "code": "23-200-0203A", "name": "Engineering Mechanics", "credits": 4 },
    { "code": "23-200-0204A", "name": "Basic Electrical Engineering", "credits": 3 },
    { "code": "23-200-0205A", "name": "Basic Electronics Engineering", "credits": 3 },
    { "code": "23-200-0206A", "name": "Soft Skills Development", "credits": 2 },
    { "code": "23-200-0207A", "name": "Computer Programming Laboratory", "credits": 1 },
    { "code": "23-200-0208A", "name": "Basic Electrical and Electronics Engineering Laboratory", "credits": 1 },
    { "code": "23-200-0209A", "name": "Language Laboratory", "credits": 1 },
    { "code": "23-200-0210A", "name": "NSS/Nature Conservation Activities/Yoga", "credits": 0 }
  ],
  3: [
    { "code": "23-200-0301A*", "name": "Linear Algebra & Transform Techniques", "credits": 3 },
    { "code": "23-206-0302", "name": "Chemical Process Principles", "credits": 3 },
    { "code": "23-206-0303", "name": "Engineering Fluid Mechanics and Introduction to CFD", "credits": 3 },
    { "code": "23-206-0304", "name": "Fire Engineering Fundamentals", "credits": 3 },
    { "code": "23-206-0305", "name": "Occupational Safety and Industrial Hygiene", "credits": 3 },
    { "code": "23-206-0306", "name": "Principles of Safety Management", "credits": 3 },
    { "code": "23-206-0307", "name": "Fluid Mechanics and Machinery Laboratory", "credits": 1 },
    { "code": "23-206-0308", "name": "Industrial Hygiene Laboratory", "credits": 1 },
    { "code": "23-206-0309", "name": "Internship-1", "credits": 1 }
  ],
  4: [
    { "code": "23-200-0401A*", "name": "Complex Variables and Partial Differential Equations", "credits": 3 },
    { "code": "23-206-0402", "name": "Heat Transfer Operations", "credits": 3 },
    { "code": "23-206-0403", "name": "Strength of Materials", "credits": 3 },
    { "code": "23-206-0404", "name": "Planning and Design of Fire Protection Systems", "credits": 3 },
    { "code": "23-206-0405", "name": "Electrical Technology and Safety", "credits": 3 },
    { "code": "23-206-0406", "name": "Manufacturing Processes", "credits": 3 },
    { "code": "23-200-0407**", "name": "Universal Human Values", "credits": 3 },
    { "code": "23-206-0408", "name": "Strength of Materials Laboratory", "credits": 1 },
    { "code": "23-206-0409", "name": "Electrical Technology Laboratory", "credits": 1 }
  ],
  5: [
    { "code": "23-200-0501A*", "name": "Numerical and Statistical Methods", "credits": 3 },
    { "code": "23-206-0502", "name": "Mass Transfer Operations", "credits": 3 },
    { "code": "23-206-0503", "name": "Principles of Engineering Design", "credits": 3 },
    { "code": "23-206-0504", "name": "Structural Fire Safety", "credits": 3 },
    { "code": "23-206-0505", "name": "Chemical Technology and Reaction Engineering", "credits": 3 },
    { "code": "23-206-05**", "name": "Professional Elective I (MOOC)", "credits": 3 },
    { "code": "23-206-0510", "name": "Computer Applications in Safety and Fire Engineering Laboratory I", "credits": 1 },
    { "code": "23-206-0511", "name": "Fire Safety Training", "credits": 1 },
    { "code": "23-206-0512", "name": "Internship-II", "credits": 1 }
  ],
  6: [
    { "code": "23-206-0601", "name": "Legal Aspects of HSE", "credits": 3 },
    { "code": "23-206-0602", "name": "IOT based Process Instrumentation and Control", "credits": 3 },
    { "code": "23-206-0603", "name": "Chemical Process Safety", "credits": 3 },
    { "code": "23-206-0604", "name": "Life Safety in Building Fire", "credits": 3 },
    { "code": "23-206-0605", "name": "Environmental Engineering and Management", "credits": 3 },
    { "code": "23-206-06**", "name": "Professional Elective - II", "credits": 3 },
    { "code": "23-206-0610", "name": "Computer Applications in Safety and Fire Engineering Laboratory II", "credits": 1 },
    { "code": "23-206-0611", "name": "Machine Shop", "credits": 1 }
  ],
  7: [
    { "code": "23-206-0701", "name": "Hazard Identification and Risk Assessment", "credits": 3 },
    { "code": "23-206-0702", "name": "Disaster Management", "credits": 3 },
    { "code": "23-206-0703", "name": "Safety in Construction", "credits": 3 },
    { "code": "23-206-07**", "name": "Professional Elective III", "credits": 3 },
    { "code": "23-206-07**", "name": "Open Elective -I", "credits": 3 },
    { "code": "23-206-0712", "name": "Chemical and Environmental Engineering Laboratory", "credits": 1 },
    { "code": "23-206-0713", "name": "Fire Engineering Laboratory", "credits": 1 },
    { "code": "23-206-0714", "name": "Entrepreneurship Development", "credits": 1 },
    { "code": "23-206-0715", "name": "Project Phase I", "credits": 2 },
    { "code": "23-206-0716", "name": "Internship-III", "credits": 1 }
  ],
  8: [
    { "code": "23-206-08**", "name": "Professional Elective IV", "credits": 3 },
    { "code": "23-206-08**", "name": "Professional Elective V", "credits": 3 },
    { "code": "23-206-08**", "name": "Professional Elective VI", "credits": 3 },
    { "code": "23-206-08**", "name": "Open Elective II", "credits": 3 },
    { "code": "23-206-0818", "name": "Seminar", "credits": 1 },
    { "code": "23-206-0819", "name": "Project Phase II", "credits": 6 },
    { "code": "23-206-0820", "name": "Comprehensive Viva Voce", "credits": 1 }
  ]
},

  it: {
  1: [
    { "code": "23-200-0101B", "name": "Calculus", "credits": 4 },
    { "code": "23-200-0102B", "name": "Engineering Physics", "credits": 3 },
    { "code": "23-200-0103B", "name": "Introduction to Electronics devices & Circuits", "credits": 4 },
    { "code": "23-200-0104B", "name": "Introduction to Electrical Engineering", "credits": 3 },
    { "code": "23-200-0105B", "name": "Computer programming", "credits": 3 },
    { "code": "23-200-0106B", "name": "Soft Skills Development", "credits": 2 },
    { "code": "23-200-0107B", "name": "Computer Programming Laboratory", "credits": 1 },
    { "code": "23-200-0108B", "name": "Basic Electrical lab", "credits": 1 },
    { "code": "23-200-0109B", "name": "Language Laboratory", "credits": 1 },
    { "code": "23-200-0110B", "name": "NSS/Nature conservation Activities/Yoga", "credits": 0 }
  ],
  2: [
    { "code": "23-200-0201B", "name": "Linear Algebra & Transform Techniques", "credits": 4 },
    { "code": "23-200-0202B", "name": "Engineering Chemistry", "credits": 3 },
    { "code": "23-200-0203B", "name": "Digital Electronics", "credits": 3 },
    { "code": "23-200-0204B", "name": "Object Oriented Programming in C++", "credits": 4 },
    { "code": "23-200-0205B", "name": "Introduction to Cyber Physical Systems", "credits": 3 },
    { "code": "23-200-0206B", "name": "Environmental and Life Sciences", "credits": 3 },
    { "code": "23-200-0207B", "name": "Digital Electronics Lab", "credits": 1 },
    { "code": "23-200-0208B", "name": "Basic Electronics Lab", "credits": 1 }
  ],
  3: [
    { "code": "23-200-0301B*", "name": "Differential Equations and Complex Variables", "credits": 3 },
    { "code": "23-204-0302", "name": "Internet Programming", "credits": 3 },
    { "code": "23-204-0303**", "name": "Discrete Computational Structures", "credits": 3 },
    { "code": "23-204-0304", "name": "Database Management Systems", "credits": 3 },
    { "code": "23-204-0305", "name": "Data Structures and Algorithms in C++", "credits": 3 },
    { "code": "23-204-0306", "name": "Computer Organization & Architecture", "credits": 3 },
    { "code": "23-204-0307", "name": "Hardware Design & CPS Laboratory", "credits": 1 },
    { "code": "23-204-0308", "name": "Data Structures in C++ Laboratory", "credits": 1 },
    { "code": "23-204-0309", "name": "Internship-I", "credits": 1 }
  ],
  4: [
    { "code": "23-200-0401B*", "name": "Numerical and Statistical Techniques", "credits": 3 },
    { "code": "23-204-0402", "name": "Data Communication", "credits": 3 },
    { "code": "23-204-0403", "name": "Operating Systems", "credits": 3 },
    { "code": "23-204-0404", "name": "Software Engineering", "credits": 3 },
    { "code": "23-204-0405", "name": "Formal Languages and Automata Theory", "credits": 3 },
    { "code": "23-204-0406", "name": "Design and Analysis of Algorithms", "credits": 3 },
    { "code": "23-200-0407**", "name": "Universal Human Values", "credits": 3 },
    { "code": "23-204-0408", "name": "Operating Systems Lab", "credits": 1 },
    { "code": "23-204-0409", "name": "Mini Project-DBMS based", "credits": 1 }
  ],
  5: [
    { "code": "23-204-0501", "name": "Compiler Design", "credits": 3 },
    { "code": "23-204-0502", "name": "Software Design and Architecture", "credits": 3 },
    { "code": "23-204-0503", "name": "Internet of Things", "credits": 3 },
    { "code": "23-204-0504", "name": "Big Data Analytics", "credits": 3 },
    { "code": "23-204-0505", "name": "Internet Architecture & Design", "credits": 3 },
    { "code": "23-204-05**", "name": "Professional Elective - I", "credits": 3 },
    { "code": "23-204-0510", "name": "Networking & Edge Computing Lab", "credits": 1 },
    { "code": "23-204-0511", "name": "Software Engineering Lab", "credits": 1 },
    { "code": "23-204-0512", "name": "Internship-II", "credits": 1 }
  ],
  6: [
    { "code": "23-204-0601", "name": "Agile Project Methodology", "credits": 3 },
    { "code": "23-204-0602", "name": "Data Security and Cryptography", "credits": 3 },
    { "code": "23-204-0603", "name": "Deep Learning", "credits": 3 },
    { "code": "23-204-0604", "name": "Cloud Computing", "credits": 3 },
    { "code": "23-204-0605", "name": "Design and Development Mobile Application", "credits": 3 },
    { "code": "23-204-06**", "name": "Professional Elective - II", "credits": 3 },
    { "code": "23-204-0610", "name": "Cloud and Data Analytics Laboratory", "credits": 1 },
    { "code": "23-204-0611", "name": "Mini Project - Mobile App Development", "credits": 1 }
  ],
  7: [
    { "code": "23-204-0701", "name": "Financial Management & E-banking", "credits": 3 },
    { "code": "23-204-0702", "name": "Design Thinking and Innovations", "credits": 3 },
    { "code": "23-204-0703", "name": "Computer Graphics and Visual Computing", "credits": 3 },
    { "code": "23-204-07**", "name": "Professional Elective - III", "credits": 3 },
    { "code": "23-204-07**", "name": "Open Elective - I", "credits": 3 },
    { "code": "23-204-0712", "name": "Computer Graphics Laboratory", "credits": 1 },
    { "code": "23-204-0713", "name": "Mini Project Multimedia Project", "credits": 1 },
    { "code": "23-204-0714", "name": "Entrepreneurship Development", "credits": 1 },
    { "code": "23-204-0715", "name": "Project Phase I", "credits": 2 },
    { "code": "23-204-0716", "name": "Internship-III", "credits": 1 }
  ],
  8: [
    { "code": "23-204-08**", "name": "Professional Elective IV", "credits": 3 },
    { "code": "23-204-08**", "name": "Professional Elective - V", "credits": 3 },
    { "code": "23-204-08**", "name": "Professional Elective VI", "credits": 3 },
    { "code": "23-204-08**", "name": "Open Elective - II", "credits": 3 },
    { "code": "23-204-0818", "name": "Seminar", "credits": 1 },
    { "code": "23-204-0819", "name": "Project Phase - II", "credits": 6 },
    { "code": "23-204-0820", "name": "Comprehensive Viva Voce", "credits": 1 }
  ]
}

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
      const text = "CUSAT SGPA Calculator"
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
                <p className="text-xl text-gray-600 dark:text-gray-300">Calculate your SGPA </p>
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
                  <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">Choose Your Stream</h2>
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
