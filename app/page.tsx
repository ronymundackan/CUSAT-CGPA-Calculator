"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GraduationCap, Calculator, BookOpen, Trophy, Sparkles, ArrowLeft, RotateCcw, AlertCircle } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"

// Enhanced mock data with more departments
const departments = [
  {
    id: "cse",
    name: "Computer Science & Engineering",
    icon: "💻",
    color: "from-blue-500 to-purple-600",
  },
  {
    id: "ece",
    name: "Electronics & Communication",
    icon: "📡",
    color: "from-yellow-500 to-orange-600",
  },
  {
    id: "me",
    name: "Mechanical Engineering",
    icon: "⚙️",
    color: "from-gray-500 to-slate-600",
  },
  {
    id: "ce",
    name: "Civil Engineering",
    icon: "🧱",
    color: "from-green-500 to-emerald-600",
  },
  {
    id: "ee",
    name: "Electrical Engineering",
    icon: "⚡️",
    color: "from-red-500 to-pink-600",
  },
  {
    id: "sf",
    name: "Safety And Fire Engineering",
    icon: "🔥",
    color: "from-indigo-500 to-blue-600",
  },
  {
    id: "it",
    name: "Information Technology",
    icon: "🖥️",
    color: "from-cyan-500 to-teal-600",
  },
]

const subjectData = {
  cse: {
  "1": [
    { "code": "23-200-0101B", "name": "Calculus", "credits": 4 },
    { "code": "23-200-0102B", "name": "Engineering Physics", "credits": 3 },
    { "code": "23-200-0103B", "name": "Introduction to Electronics Devices & Circuits", "credits": 4 },
    { "code": "23-200-0104B", "name": "Introduction to Electrical Engineering", "credits": 3 },
    { "code": "23-200-0105B", "name": "Computer Programming", "credits": 3 },
    { "code": "23-200-0106B", "name": "Soft Skills Development", "credits": 2 },
    { "code": "23-200-0107B", "name": "Computer Programming Laboratory", "credits": 1 },
    { "code": "23-200-0108B", "name": "Basic Electrical Lab", "credits": 1 },
    { "code": "23-200-0109B", "name": "Language Laboratory", "credits": 1 },
    { "code": "23-200-0110B", "name": "NSS/Nature Conservation Activities/Yoga", "credits": 0 }
  ],
  "2": [
    { "code": "23-200-0201B", "name": "Linear Algebra & Transform Techniques", "credits": 4 },
    { "code": "23-200-0202B", "name": "Engineering Chemistry", "credits": 3 },
    { "code": "23-200-0203B", "name": "Digital Electronics", "credits": 3 },
    { "code": "23-200-0204B", "name": "Object Oriented Programming in C++", "credits": 4 },
    { "code": "23-200-0205B", "name": "Introduction to Cyber Physical Systems", "credits": 3 },
    { "code": "23-200-0206B", "name": "Environmental and Life Sciences", "credits": 3 },
    { "code": "23-200-0207B", "name": "Digital Electronics Lab", "credits": 1 },
    { "code": "23-200-0208B", "name": "Basic Electronics Lab", "credits": 1 }
  ],
  "3": [
    { "code": "23-200-0301B*", "name": "Differential Equation and Complex Variables", "credits": 3 },
    { "code": "23-202-0302", "name": "Computer Architecture and Organization", "credits": 3 },
    { "code": "23-202-0303**", "name": "Discrete Computational Structures", "credits": 3 },
    { "code": "23-202-0304", "name": "Data Structures and Algorithms", "credits": 3 },
    { "code": "23-202-0305", "name": "Principles of Programming Languages", "credits": 3 },
    { "code": "23-202-0306", "name": "Automata Languages and Computations", "credits": 3 },
    { "code": "23-202-0307", "name": "Data Structures Laboratory", "credits": 1 },
    { "code": "23-202-0308", "name": "Object Oriented Programming Laboratory", "credits": 1 },
    { "code": "23-202-0309", "name": "Internship-1", "credits": 1 }
  ],
  "4": [
    { "code": "23-200-0401B*", "name": "Numerical and Statistical Techniques", "credits": 3 },
    { "code": "23-202-0402", "name": "Operating Systems", "credits": 3 },
    { "code": "23-202-0403", "name": "Database Management Systems", "credits": 3 },
    { "code": "23-202-0404", "name": "Data and Computer Communication", "credits": 3 },
    { "code": "23-202-0405", "name": "Object Oriented Software Engineering", "credits": 3 },
    { "code": "23-202-0406", "name": "Microprocessors", "credits": 3 },
    { "code": "23-200-0407**", "name": "Universal Human Values", "credits": 3 },
    { "code": "23-202-0408", "name": "Database Management Systems Laboratory", "credits": 1 },
    { "code": "23-202-0409", "name": "Operating System Laboratory", "credits": 1 }
  ],
  "5": [
    { "code": "23-202-0501", "name": "Mathematical Foundations for Machine Learning", "credits": 3 },
    { "code": "23-202-0502", "name": "System Programming", "credits": 3 },
    { "code": "23-202-0503", "name": "Data Mining", "credits": 3 },
    { "code": "23-202-0504", "name": "Computer Graphics", "credits": 3 },
    { "code": "23-202-0505", "name": "Advanced Microprocessors and Embedded Systems", "credits": 3 },
    { "code": "23-202-05**", "name": "Professional Elective- I(MOOC)", "credits": 3 },
    { "code": "23-202-0510", "name": "Computer Graphics Laboratory", "credits": 1 },
    { "code": "23-202-0511", "name": "IoT and Embedded Systems Laboratory", "credits": 1 },
    { "code": "23-202-0512", "name": "Internship-II", "credits": 1 }
  ],
  "6": [
    { "code": "23-202-0601", "name": "Computer Networks", "credits": 3 },
    { "code": "23-202-0602", "name": "Compiler Construction", "credits": 3 },
    { "code": "23-202-0603", "name": "Analysis and Design of Algorithms", "credits": 3 },
    { "code": "23-202-0604", "name": "Artificial Intelligence", "credits": 3 },
    { "code": "23-202-0605", "name": "Cryptography and Network Security", "credits": 3 },
    { "code": "23-202-06**", "name": "Professional Elective - II", "credits": 3 },
    { "code": "23-202-0610", "name": "Networks Laboratory", "credits": 1 },
    { "code": "23-202-0611", "name": "Mini Project", "credits": 1 }
  ],
  "7": [
    { "code": "23-200-0701*", "name": "Principles of Management", "credits": 3 },
    { "code": "23-202-0702", "name": "Advanced Architecture and Parallel Processing", "credits": 3 },
    { "code": "23-202-0703", "name": "Big Data Analytics", "credits": 3 },
    { "code": "23-202-07**", "name": "Professional Elective - III", "credits": 3 },
    { "code": "23-202-07**", "name": "Open Elective- I", "credits": 3 },
    { "code": "23-202-0712", "name": "Language Processors Laboratory", "credits": 1 },
    { "code": "23-202-0713", "name": "Data Analytics Lab", "credits": 1 },
    { "code": "23-202-0714", "name": "Entrepreneurship Development", "credits": 1 },
    { "code": "23-202-0715", "name": "Project Phase-I", "credits": 2 },
    { "code": "23-202-0716", "name": "Internship-III", "credits": 1 }
  ],
  "8": [
    { "code": "23-202-08**", "name": "Professional Elective- IV", "credits": 3 },
    { "code": "23-202-08**", "name": "Professional Elective- V", "credits": 3 },
    { "code": "23-202-08**", "name": "Professional Elective- VI", "credits": 3 },
    { "code": "23-202-08**", "name": "Open Elective- II", "credits": 3 },
    { "code": "23-202-0818", "name": "Seminar", "credits": 1 },
    { "code": "23-202-0819", "name": "Project Phase- II", "credits": 6 },
    { "code": "23-202-0820", "name": "Comprehensive Viva Voce", "credits": 1 }
  ]
  },
  ece: {
    1: [
      { code: "23-200-0101B", name: "Calculus", credits: 4 },
      { code: "23-200-0102B", name: "Engineering Physics", credits: 3 },
      { code: "23-200-0103B", name: "Introduction to Electronics devices & Circuits", credits: 4 },
      { code: "23-200-0104B", name: "Introduction to Electrical Engineering", credits: 3 },
      { code: "23-200-0105B", name: "Computer programming", credits: 3 },
      { code: "23-200-0106B", name: "Soft Skills Development", credits: 2 },
      { code: "23-200-0107B", name: "Computer Programming Laboratory", credits: 1 },
      { code: "23-200-0108B", name: "Basic Electrical lab", credits: 1 },
      { code: "23-200-0109B", name: "Language Laboratory", credits: 1 },
      { code: "23-200-0110B", name: "NSS/Nature conservation Activities/Yoga", credits: 0 },
    ],
    2: [
      { code: "23-200-0201B", name: "Linear Algebra & Transform Techniques", credits: 4 },
      { code: "23-200-0202B", name: "Engineering Chemistry", credits: 3 },
      { code: "23-200-0203B", name: "Digital Electronics", credits: 3 },
      { code: "23-200-0204B", name: "Object Oriented Programming in C++", credits: 4 },
      { code: "23-200-0205B", name: "Introduction to Cyber Physical Systems", credits: 3 },
      { code: "23-200-0206B", name: "Environmental and Life Sciences", credits: 3 },
      { code: "23-200-0207B", name: "Digital Electronics Lab", credits: 1 },
      { code: "23-200-0208B", name: "Basic Electronics Lab", credits: 1 },
    ],
    3: [
      { code: "23-200-0301B*", name: "Differential Equations and Complex Variables", credits: 3 },
      { code: "23-203-0302", name: "Network Theory", credits: 3 },
      { code: "23-203-0303", name: "Electronic Circuits", credits: 3 },
      { code: "23-203-0304", name: "Digital System Design", credits: 3 },
      { code: "23-203-0305", name: "Microprocessors and Microcontrollers", credits: 3 },
      { code: "23-203-0306", name: "Solid State Devices", credits: 3 },
      { code: "23-203-0307", name: "Electronic Circuits Laboratory", credits: 1 },
      { code: "23-203-0308", name: "Digital Systems & Programming Laboratory", credits: 1 },
      { code: "23-203-0309", name: "Internship-1", credits: 1 },
    ],
    4: [
      { code: "23-200-0401B*", name: "Numerical and Statistical Techniques", credits: 3 },
      { code: "23-203-0402", name: "Analog integrated Circuits", credits: 3 },
      { code: "23-203-0403", name: "Signals & Systems", credits: 3 },
      { code: "23-203-0404", name: "Electromagnetic Theory", credits: 3 },
      { code: "23-203-0405", name: "Introduction to Communication Engineering", credits: 3 },
      { code: "23-203-0406", name: "Python for Machine Learning Applications", credits: 2 },
      { code: "23-200-0407**", name: "Universal Human Values", credits: 3 },
      { code: "23-203-0408", name: "Mini Project", credits: 2 },
      { code: "23-203-0409", name: "Analog Integrated Circuit Laboratory", credits: 1 },
    ],
    5: [
      { code: "23-203-0501", name: "Embedded Systems", credits: 3 },
      { code: "23-203-0502", name: "Microwave Engineering", credits: 3 },
      { code: "23-203-0503", name: "Digital Communication Engineering", credits: 3 },
      { code: "23-203-0504", name: "VLSI design", credits: 3 },
      { code: "23-203-0505", name: "Digital Signal Processing", credits: 3 },
      { code: "23-203-05**", name: "Professional Elective I (MOOC)", credits: 3 },
      { code: "23-203-0510", name: "Digital Signal Processing Laboratory", credits: 1 },
      { code: "23-203-0511", name: "Communication Laboratory", credits: 1 },
      { code: "23-203-0512", name: "Internship-II", credits: 1 },
    ],
    6: [
      { code: "23-203-0601", name: "Information theory and Coding", credits: 3 },
      { code: "23-203-0602", name: "Digital Image Processing", credits: 3 },
      { code: "23-203-0603", name: "Control System", credits: 3 },
      { code: "23-203-0604", name: "Antenna Theory", credits: 3 },
      { code: "23-203-06**", name: "Professional Elective - II", credits: 4 },
      { code: "23-203-06**", name: "Professional Elective - III", credits: 3 },
      { code: "23-203-0613", name: "Minor Project based on embedded systems", credits: 2 },
      { code: "23-203-0614", name: "Microwave Engineering Laboratory", credits: 1 },
    ],
    7: [
      { code: "23-200-0701*", name: "Principles of Management", credits: 3 },
      { code: "23-203-0702", name: "Wireless Communication", credits: 4 },
      { code: "23-203-07**", name: "Professional Elective - IV", credits: 4 },
      { code: "23-203-07**", name: "Professional Elective - V", credits: 3 },
      { code: "23-203-07**", name: "Open Elective I", credits: 3 },
      { code: "23-203-0714", name: "Entrepreneurship Development", credits: 1 },
      { code: "23-203-0715", name: "Seminar", credits: 1 },
      { code: "23-203-0716", name: "Project phase I", credits: 2 },
      { code: "23-203-0717", name: "Internship-III", credits: 1 },
    ],
    8: [
      { code: "23-203-08**", name: "Professional Elective VI", credits: 4 },
      { code: "23-203-08**", name: "Professional Elective VII", credits: 3 },
      { code: "23-20*-08**", name: "Open Elective II", credits: 3 },
      { code: "23-203-0813", name: "Project phase II", credits: 6 },
      { code: "23-203-0814", name: "Comprehensive Viva Voce", credits: 1 },
    ],
  },
  me: {
    1: [
      { code: "23-200-0101A", name: "Calculus", credits: 3 },
      { code: "23-200-0102A", name: "Engineering Chemistry", credits: 3 },
      { code: "23-200-0103A", name: "Engineering Graphics", credits: 3 },
      { code: "23-200-0104A", name: "Basic Civil Engineering", credits: 4 },
      { code: "23-200-0105A", name: "Basic Mechanical Engineering", credits: 4 },
      { code: "23-200-0106A", name: "Environmental and Life Sciences", credits: 3 },
      { code: "23-200-0107A", name: "Civil Engineering Workshop", credits: 1 },
      { code: "23-200-0108A", name: "Mechanical Engineering Workshop", credits: 1 },
    ],
    2: [
      { code: "23-200-0201A", name: "Computer Programming & Problem Solving", credits: 4 },
      { code: "23-200-0202A", name: "Engineering Physics", credits: 3 },
      { code: "23-200-0203A", name: "Engineering Mechanics", credits: 4 },
      { code: "23-200-0204A", name: "Basic Electrical Engineering", credits: 3 },
      { code: "23-200-0205A", name: "Basic Electronics Engineering", credits: 3 },
      { code: "23-200-0206A", name: "Soft Skills Development", credits: 2 },
      { code: "23-200-0207A", name: "Programming Lab", credits: 1 },
      { code: "23-200-0208A", name: "Electrical & Electronics Lab", credits: 1 },
      { code: "23-200-0209A", name: "Language Lab", credits: 1 },
      { code: "23-200-0210A", name: "NSS/Nature/Yoga", credits: 0 },
    ],
    3: [
      { code: "23-200-0301A", name: "Linear Algebra & Transform Techniques", credits: 3 },
      { code: "23-205-0302", name: "Electrical Technology", credits: 3 },
      { code: "23-205-0303", name: "Mechanics of Solids", credits: 3 },
      { code: "23-205-0304", name: "Fluid Mechanics & Hydraulic Machinery", credits: 3 },
      { code: "23-205-0305", name: "Metallurgy & Materials Science", credits: 3 },
      { code: "23-205-0306", name: "Machine Drawing", credits: 3 },
      { code: "23-205-0307", name: "Strength of Materials Lab", credits: 1 },
      { code: "23-205-0308", name: "Fluid Mechanics Lab", credits: 1 },
      { code: "23-205-0309", name: "Internship I", credits: 1 },
    ],
    4: [
      { code: "23-200-0401A", name: "Complex Variables & PDE", credits: 3 },
      { code: "23-205-0402", name: "Metrology & Instrumentation", credits: 3 },
      { code: "23-205-0403", name: "Mechatronics", credits: 3 },
      { code: "23-205-0404", name: "Applied Thermodynamics", credits: 3 },
      { code: "23-205-0405", name: "Mgmt. & Industrial Engineering", credits: 3 },
      { code: "23-205-0406", name: "Manufacturing Processes", credits: 3 },
      { code: "23-200-0407", name: "Universal Human Values", credits: 3 },
      { code: "23-205-0408", name: "Metrology Lab", credits: 1 },
      { code: "23-205-0409", name: "Hydraulic Machinery Lab", credits: 1 },
    ],
    5: [
      { code: "23-200-0501A", name: "Numerical & Statistical Methods", credits: 3 },
      { code: "23-205-0502", name: "Mechanics of Machinery", credits: 3 },
      { code: "23-205-0503", name: "Machine Tools", credits: 3 },
      { code: "23-205-0504", name: "Thermal Engineering", credits: 3 },
      { code: "23-205-0505", name: "Advanced Manufacturing Tech.", credits: 3 },
      { code: "23-205-05**", name: "Professional Elective I (MOOC)", credits: 3 },
      { code: "23-205-0510", name: "Computational Methods Lab", credits: 1 },
      { code: "23-205-0511", name: "Machine Shop I", credits: 1 },
      { code: "23-205-0512", name: "Internship II", credits: 1 },
    ],
    6: [
      { code: "23-205-0601", name: "Dynamics of Machinery", credits: 3 },
      { code: "23-205-0602", name: "Design of Machine Elements I", credits: 3 },
      { code: "23-205-0603", name: "Compressible Fluid Flow", credits: 3 },
      { code: "23-205-0604", name: "Heat & Mass Transfer", credits: 3 },
      { code: "23-205-0605", name: "CAD & Analysis", credits: 3 },
      { code: "23-205-06**", name: "Professional Elective II", credits: 3 },
      { code: "23-205-0610", name: "Machine Shop II", credits: 1 },
      { code: "23-205-0611", name: "Thermal Engineering Lab", credits: 1 },
    ],
    7: [
      { code: "23-205-0701", name: "Refrigeration & AC", credits: 3 },
      { code: "23-205-0702", name: "Vibration & Noise Control", credits: 3 },
      { code: "23-205-0703", name: "Design of Machine Elements II", credits: 3 },
      { code: "23-205-07**", name: "Prof. Elective III", credits: 3 },
      { code: "23-205-07**", name: "Open Elective I", credits: 3 },
      { code: "23-205-0712", name: "Heat & Mass Transfer Lab", credits: 1 },
      { code: "23-205-0713", name: "CAD & Analysis Lab", credits: 1 },
      { code: "23-205-0714", name: "Entrepreneurship", credits: 1 },
      { code: "23-205-0715", name: "Project Phase I", credits: 2 },
      { code: "23-205-0716", name: "Internship III", credits: 1 },
    ],
    8: [
      { code: "23-205-08**", name: "Prof. Elective IV", credits: 3 },
      { code: "23-205-08**", name: "Prof. Elective V", credits: 3 },
      { code: "23-205-08**", name: "Prof. Elective VI", credits: 3 },
      { code: "23-205-08**", name: "Open Elective II", credits: 3 },
      { code: "23-205-0818", name: "Seminar", credits: 1 },
      { code: "23-205-0819", name: "Project Phase II", credits: 6 },
      { code: "23-205-0820", name: "Comprehensive Viva", credits: 1 },
    ],
  },
  ce: {
    1: [
      { code: "23-200-0101A", name: "Calculus", credits: 3 },
      { code: "23-200-0102A", name: "Engineering Chemistry", credits: 3 },
      { code: "23-200-0103A", name: "Engineering Graphics", credits: 3 },
      { code: "23-200-0104A", name: "Basic Civil Engineering", credits: 4 },
      { code: "23-200-0105A", name: "Basic Mechanical Engineering", credits: 4 },
      { code: "23-200-0106A", name: "Environmental and Life Sciences", credits: 3 },
      { code: "23-200-0107A", name: "Civil Engineering Workshop", credits: 1 },
      { code: "23-200-0108A", name: "Mechanical Engineering Workshop", credits: 1 },
    ],
    2: [
      { code: "23-200-0201A", name: "Computer Programming and Problem Solving", credits: 4 },
      { code: "23-200-0202A", name: "Engineering Physics", credits: 3 },
      { code: "23-200-0203A", name: "Engineering Mechanics", credits: 4 },
      { code: "23-200-0204A", name: "Basic Electrical Engineering", credits: 3 },
      { code: "23-200-0205A", name: "Basic Electronics Engineering", credits: 3 },
      { code: "23-200-0206A", name: "Soft Skills Development", credits: 2 },
      { code: "23-200-0207A", name: "Computer Programming Laboratory", credits: 1 },
      { code: "23-200-0208A", name: "Basic Electrical and Electronics Engineering Laboratory", credits: 1 },
      { code: "23-200-0209A", name: "Language Laboratory", credits: 1 },
      { code: "23-200-0210A", name: "NSS/Nature conservation Activities/Yoga", credits: 0 },
    ],
    3: [
      { code: "23-200-0301A*", name: "Linear Algebra and Transform Techniques", credits: 3 },
      { code: "23-201-0302", name: "Surveying -I", credits: 3 },
      { code: "23-201-0303", name: "Strength of Materials", credits: 3 },
      { code: "23-201-0304", name: "Concrete Technology", credits: 3 },
      { code: "23-201-0305", name: "Fluid Mechanics -I", credits: 3 },
      { code: "23-201-0306", name: "Building Technology and Functional Planning", credits: 3 },
      { code: "23-201-0307", name: "Strength of Materials Testing Laboratory", credits: 1 },
      { code: "23-201-0308", name: "Concrete Testing Laboratory", credits: 1 },
      { code: "23-201-0309", name: "Internship-1", credits: 1 },
    ],
    4: [
      { code: "23-200-0401A*", name: "Complex Variables and Partial Differential Equations", credits: 3 },
      { code: "23-201-0402", name: "Surveying -II", credits: 3 },
      { code: "23-201-0403", name: "Analysis of Structures -I", credits: 3 },
      { code: "23-201-0404", name: "Transportation Engineering -I", credits: 3 },
      { code: "23-201-0405", name: "Fluid Mechanics II", credits: 3 },
      { code: "23-201-0406", name: "Geotechnical Engineering -I", credits: 3 },
      { code: "23-201-0407**", name: "Universal Human Values", credits: 3 },
      { code: "23-201-0408", name: "Survey Practices Laboratory", credits: 1 },
      { code: "23-201-0409", name: "Fluid Mechanics Laboratory", credits: 1 },
    ],
    5: [
      { code: "23-200-0501A*", name: "Numerical and Statistical Methods", credits: 3 },
      { code: "23-201-0502", name: "Design of Concrete Structures-I", credits: 3 },
      { code: "23-201-0503", name: "Analysis of Structures -II", credits: 3 },
      { code: "23-201-0504", name: "Transportation Engineering -II", credits: 3 },
      { code: "23-201-0505", name: "Geotechnical Engineering -II", credits: 3 },
      { code: "23-201-05**", name: "Professional Elective -I (MOOC)", credits: 3 },
      { code: "23-201-0510", name: "Geotechnical Engineering Laboratory", credits: 1 },
      { code: "23-201-0511", name: "Transportation Engineering Laboratory", credits: 1 },
      { code: "23-201-0512", name: "Internship-II", credits: 1 },
    ],
    6: [
      { code: "23-201-0601", name: "Environmental Engineering -I", credits: 3 },
      { code: "23-201-0602", name: "Design of Steel Structures", credits: 3 },
      { code: "23-201-0603", name: "Advanced Methods of Structural Analysis", credits: 3 },
      { code: "23-201-0604", name: "Water Resources and Irrigation Engineering", credits: 3 },
      { code: "23-201-0605", name: "Construction Management", credits: 3 },
      { code: "23-201-06**", name: "Professional Elective - II", credits: 3 },
      { code: "23-201-0610", name: "Environmental Engineering Laboratory", credits: 1 },
      { code: "23-201-0611", name: "Mini Project-Architecture Design Studio", credits: 1 },
    ],
    7: [
      { code: "23-201-0701", name: "Environmental Engineering - II", credits: 3 },
      { code: "23-201-0702", name: "Quantity Surveying and Valuation", credits: 3 },
      { code: "23-201-0703", name: "Design of Concrete Structures -II", credits: 3 },
      { code: "23-201-07**", name: "Professional Elective - III", credits: 3 },
      { code: "23-201-07**", name: "Open Elective-I", credits: 3 },
      { code: "23-201-0712", name: "Structural Design Studio", credits: 1 },
      { code: "23-201-0713", name: "Structural Engineering and Building Technology Laboratory", credits: 1 },
      { code: "23-201-0714", name: "Entrepreneurship Development", credits: 1 },
      { code: "23-201-0715", name: "Project-Phase I", credits: 2 },
      { code: "23-201-0716", name: "Internship-III", credits: 1 },
    ],
    8: [
      { code: "23-201-08**", name: "Professional Elective IV", credits: 3 },
      { code: "23-201-08**", name: "Professional Elective V", credits: 3 },
      { code: "23-201-08**", name: "Professional Elective VI", credits: 3 },
      { code: "23-201-08**", name: "Open Elective II", credits: 3 },
      { code: "23-201-0818", name: "Seminar", credits: 1 },
      { code: "23-201-0819", name: "Project Phase II", credits: 6 },
      { code: "23-201-0820", name: "Comprehensive Viva Voce", credits: 1 },
    ],
  },
  ee: {
    1: [
      { code: "23-200-0101B", name: "Calculus", credits: 4 },
      { code: "23-200-0102B", name: "Engineering Physics", credits: 3 },
      { code: "23-200-0103B", name: "Introduction to Electronic devices and Circuits", credits: 4 },
      { code: "23-200-0104B", name: "Introduction to Electrical Engineering", credits: 3 },
      { code: "23-200-0105B", name: "Computer programming", credits: 3 },
      { code: "23-200-0106B", name: "Soft Skills Development", credits: 2 },
      { code: "23-200-0107B", name: "Computer Programming Laboratory", credits: 1 },
      { code: "23-200-0108B", name: "Basic Electrical Engineering Laboratory", credits: 1 },
      { code: "23-200-0109B", name: "Language Laboratory", credits: 1 },
      { code: "23-200-0110B", name: "NSS/Nature conservation Activities/Yoga", credits: 0 },
    ],
    2: [
      { code: "23-200-0201B", name: "Linear Algebra and Transform Techniques", credits: 4 },
      { code: "23-200-0202B", name: "Engineering Chemistry", credits: 3 },
      { code: "23-200-0203B", name: "Digital Electronics", credits: 3 },
      { code: "23-200-0204B", name: "Object Oriented Programming in C++", credits: 4 },
      { code: "23-200-0205B", name: "Introduction to Cyber Physical Systems", credits: 3 },
      { code: "23-200-0206B", name: "Environmental and Life Sciences", credits: 3 },
      { code: "23-200-0207B", name: "Digital electronics Laboratory", credits: 1 },
      { code: "23-200-0208B", name: "Basic Electronics Laboratory", credits: 1 },
    ],
    3: [
      { code: "23-200-0301B*", name: "Differential Equations and Complex Variables", credits: 3 },
      { code: "23-209-0302", name: "Electrical Machines-I", credits: 3 },
      { code: "23-209-0303", name: "Circuits and Networks", credits: 3 },
      { code: "23-209-0304", name: "Measurements and Instrumentation", credits: 3 },
      { code: "23-209-0305", name: "Analog Integrated Circuits I", credits: 3 },
      { code: "23-209-0306", name: "Microprocessor and Microcontroller Based systems", credits: 3 },
      { code: "23-209-0307", name: "Measurements and Instrumentation Laboratory", credits: 1 },
      { code: "23-209-0308", name: "Cyber Physical Systems Laboratory", credits: 1 },
      { code: "23-209-0309", name: "Internship-1", credits: 1 },
    ],
    4: [
      { code: "23-200-0401B*", name: "Statistical Numerical and Techniques", credits: 3 },
      { code: "23-209-0402", name: "Signals and Systems", credits: 3 },
      { code: "23-209-0403", name: "Electrical Machines-II", credits: 3 },
      { code: "23-209-0404", name: "Power Electronics", credits: 3 },
      { code: "23-209-0405", name: "Electro Magnetic Theory", credits: 3 },
      { code: "23-209-0406", name: "Analog Integrated Circuits II", credits: 3 },
      { code: "23-200-0407**", name: "Universal Human Values", credits: 3 },
      { code: "23-209-0408", name: "Electrical Machines Laboratory -I", credits: 1 },
      { code: "23-209-0409", name: "Analog Integrated Circuits Laboratory", credits: 1 },
    ],
    5: [
      { code: "23-209-0501", name: "Power Semiconductor Drives", credits: 3 },
      { code: "23-209-0502", name: "Control Systems I", credits: 3 },
      { code: "23-209-0503", name: "Renewable Energy Sources", credits: 3 },
      { code: "23-209-0504", name: "Digital Signal Processing", credits: 3 },
      { code: "23-209-0505", name: "Power Systems-I", credits: 3 },
      { code: "23-209-05**", name: "Professional Elective I", credits: 3 },
      { code: "23-209-0510", name: "Power Electronics Laboratory", credits: 1 },
      { code: "23-209-0511", name: "Electrical Machines Laboratory -II", credits: 1 },
    ],
    6: [
      { code: "23-209-0601", name: "Power Systems-II", credits: 3 },
      { code: "23-209-0602", name: "Control Systems-II", credits: 3 },
      { code: "23-209-0603", name: "Electric Vehicles", credits: 3 },
      { code: "23-209-0604", name: "Machine Learning", credits: 3 },
      { code: "23-209-0605", name: "VLSI design", credits: 3 },
      { code: "23-209-06**", name: "Professional Elective -II", credits: 3 },
      { code: "23-209-0610", name: "Mini Project", credits: 1 },
      { code: "23-209-0611", name: "Power Systems Laboratory", credits: 1 },
    ],
    7: [
      { code: "23-200-0701*", name: "Principles of Management", credits: 3 },
      { code: "23-209-0702", name: "Electrical System Design", credits: 3 },
      { code: "23-209-0703", name: "Communication Engineering", credits: 3 },
      { code: "23-209-07**", name: "Professional Elective-III", credits: 3 },
      { code: "23-209-07**", name: "Open Elective-I", credits: 3 },
      { code: "23-209-0712", name: "Computer Aided Design Laboratory", credits: 1 },
      { code: "23-209-0713", name: "Control Systems Laboratory", credits: 1 },
      { code: "23-209-0714", name: "Entrepreneurship Development", credits: 1 },
      { code: "23-209-0715", name: "Project Phase I", credits: 2 },
      { code: "23-209-0716", name: "Internship-III", credits: 1 },
    ],
    8: [
      { code: "23-209-08**", name: "Professional Elective IV", credits: 3 },
      { code: "23-209-08**", name: "Professional Elective V", credits: 3 },
      { code: "23-209-08**", name: "Professional Elective VI", credits: 3 },
      { code: "23-209-08**", name: "Open Elective II", credits: 3 },
      { code: "23-209-0818", name: "Seminar", credits: 1 },
      { code: "23-209-0819", name: "Project Phase II", credits: 6 },
      { code: "23-209-0820", name: "Comprehensive Viva Voce", credits: 1 },
    ],
  },

  sf: {
    1: [
      { code: "23-200-0101A", name: "Calculus", credits: 3 },
      { code: "23-200-0102A", name: "Engineering Chemistry", credits: 3 },
      { code: "23-200-0103A", name: "Engineering Graphics", credits: 3 },
      { code: "23-200-0104A", name: "Basic Civil Engineering", credits: 4 },
      { code: "23-200-0105A", name: "Basic Mechanical Engineering", credits: 4 },
      { code: "23-200-0106A", name: "Environmental and Life Sciences", credits: 3 },
      { code: "23-200-0107A", name: "Civil Engineering Workshop", credits: 1 },
      { code: "23-200-0108A", name: "Mechanical Engineering Workshop", credits: 1 },
    ],
    2: [
      { code: "23-200-0201A", name: "Computer Programming and Problem Solving", credits: 4 },
      { code: "23-200-0202A", name: "Engineering Physics", credits: 3 },
      { code: "23-200-0203A", name: "Engineering Mechanics", credits: 4 },
      { code: "23-200-0204A", name: "Basic Electrical Engineering", credits: 3 },
      { code: "23-200-0205A", name: "Basic Electronics Engineering", credits: 3 },
      { code: "23-200-0206A", name: "Soft Skills Development", credits: 2 },
      { code: "23-200-0207A", name: "Computer Programming Laboratory", credits: 1 },
      { code: "23-200-0208A", name: "Basic Electrical and Electronics Engineering Laboratory", credits: 1 },
      { code: "23-200-0209A", name: "Language Laboratory", credits: 1 },
      { code: "23-200-0210A", name: "NSS/Nature Conservation Activities/Yoga", credits: 0 },
    ],
    3: [
      { code: "23-200-0301A*", name: "Linear Algebra & Transform Techniques", credits: 3 },
      { code: "23-206-0302", name: "Chemical Process Principles", credits: 3 },
      { code: "23-206-0303", name: "Engineering Fluid Mechanics and Introduction to CFD", credits: 3 },
      { code: "23-206-0304", name: "Fire Engineering Fundamentals", credits: 3 },
      { code: "23-206-0305", name: "Occupational Safety and Industrial Hygiene", credits: 3 },
      { code: "23-206-0306", name: "Principles of Safety Management", credits: 3 },
      { code: "23-206-0307", name: "Fluid Mechanics and Machinery Laboratory", credits: 1 },
      { code: "23-206-0308", name: "Industrial Hygiene Laboratory", credits: 1 },
      { code: "23-206-0309", name: "Internship-1", credits: 1 },
    ],
    4: [
      { code: "23-200-0401A*", name: "Complex Variables and Partial Differential Equations", credits: 3 },
      { code: "23-206-0402", name: "Heat Transfer Operations", credits: 3 },
      { code: "23-206-0403", name: "Strength of Materials", credits: 3 },
      { code: "23-206-0404", name: "Planning and Design of Fire Protection Systems", credits: 3 },
      { code: "23-206-0405", name: "Electrical Technology and Safety", credits: 3 },
      { code: "23-206-0406", name: "Manufacturing Processes", credits: 3 },
      { code: "23-200-0407**", name: "Universal Human Values", credits: 3 },
      { code: "23-206-0408", name: "Strength of Materials Laboratory", credits: 1 },
      { code: "23-206-0409", name: "Electrical Technology Laboratory", credits: 1 },
    ],
    5: [
      { code: "23-200-0501A*", name: "Numerical and Statistical Methods", credits: 3 },
      { code: "23-206-0502", name: "Mass Transfer Operations", credits: 3 },
      { code: "23-206-0503", name: "Principles of Engineering Design", credits: 3 },
      { code: "23-206-0504", name: "Structural Fire Safety", credits: 3 },
      { code: "23-206-0505", name: "Chemical Technology and Reaction Engineering", credits: 3 },
      { code: "23-206-05**", name: "Professional Elective I (MOOC)", credits: 3 },
      { code: "23-206-0510", name: "Computer Applications in Safety and Fire Engineering Laboratory I", credits: 1 },
      { code: "23-206-0511", name: "Fire Safety Training", credits: 1 },
      { code: "23-206-0512", name: "Internship-II", credits: 1 },
    ],
    6: [
      { code: "23-206-0601", name: "Legal Aspects of HSE", credits: 3 },
      { code: "23-206-0602", name: "IOT based Process Instrumentation and Control", credits: 3 },
      { code: "23-206-0603", name: "Chemical Process Safety", credits: 3 },
      { code: "23-206-0604", name: "Life Safety in Building Fire", credits: 3 },
      { code: "23-206-0605", name: "Environmental Engineering and Management", credits: 3 },
      { code: "23-206-06**", name: "Professional Elective - II", credits: 3 },
      { code: "23-206-0610", name: "Computer Applications in Safety and Fire Engineering Laboratory II", credits: 1 },
      { code: "23-206-0611", name: "Machine Shop", credits: 1 },
    ],
    7: [
      { code: "23-206-0701", name: "Hazard Identification and Risk Assessment", credits: 3 },
      { code: "23-206-0702", name: "Disaster Management", credits: 3 },
      { code: "23-206-0703", name: "Safety in Construction", credits: 3 },
      { code: "23-206-07**", name: "Professional Elective III", credits: 3 },
      { code: "23-206-07**", name: "Open Elective -I", credits: 3 },
      { code: "23-206-0712", name: "Chemical and Environmental Engineering Laboratory", credits: 1 },
      { code: "23-206-0713", name: "Fire Engineering Laboratory", credits: 1 },
      { code: "23-206-0714", name: "Entrepreneurship Development", credits: 1 },
      { code: "23-206-0715", name: "Project Phase I", credits: 2 },
      { code: "23-206-0716", name: "Internship-III", credits: 1 },
    ],
    8: [
      { code: "23-206-08**", name: "Professional Elective IV", credits: 3 },
      { code: "23-206-08**", name: "Professional Elective V", credits: 3 },
      { code: "23-206-08**", name: "Professional Elective VI", credits: 3 },
      { code: "23-206-08**", name: "Open Elective II", credits: 3 },
      { code: "23-206-0818", name: "Seminar", credits: 1 },
      { code: "23-206-0819", name: "Project Phase II", credits: 6 },
      { code: "23-206-0820", name: "Comprehensive Viva Voce", credits: 1 },
    ],
  },

  it: {
    1: [
      { code: "23-200-0101B", name: "Calculus", credits: 4 },
      { code: "23-200-0102B", name: "Engineering Physics", credits: 3 },
      { code: "23-200-0103B", name: "Introduction to Electronics devices & Circuits", credits: 4 },
      { code: "23-200-0104B", name: "Introduction to Electrical Engineering", credits: 3 },
      { code: "23-200-0105B", name: "Computer programming", credits: 3 },
      { code: "23-200-0106B", name: "Soft Skills Development", credits: 2 },
      { code: "23-200-0107B", name: "Computer Programming Laboratory", credits: 1 },
      { code: "23-200-0108B", name: "Basic Electrical lab", credits: 1 },
      { code: "23-200-0109B", name: "Language Laboratory", credits: 1 },
      { code: "23-200-0110B", name: "NSS/Nature conservation Activities/Yoga", credits: 0 },
    ],
    2: [
      { code: "23-200-0201B", name: "Linear Algebra & Transform Techniques", credits: 4 },
      { code: "23-200-0202B", name: "Engineering Chemistry", credits: 3 },
      { code: "23-200-0203B", name: "Digital Electronics", credits: 3 },
      { code: "23-200-0204B", name: "Object Oriented Programming in C++", credits: 4 },
      { code: "23-200-0205B", name: "Introduction to Cyber Physical Systems", credits: 3 },
      { code: "23-200-0206B", name: "Environmental and Life Sciences", credits: 3 },
      { code: "23-200-0207B", name: "Digital Electronics Lab", credits: 1 },
      { code: "23-200-0208B", name: "Basic Electronics Lab", credits: 1 },
    ],
    3: [
      { code: "23-200-0301B*", name: "Differential Equations and Complex Variables", credits: 3 },
      { code: "23-204-0302", name: "Internet Programming", credits: 3 },
      { code: "23-204-0303**", name: "Discrete Computational Structures", credits: 3 },
      { code: "23-204-0304", name: "Database Management Systems", credits: 3 },
      { code: "23-204-0305", name: "Data Structures and Algorithms in C++", credits: 3 },
      { code: "23-204-0306", name: "Computer Organization & Architecture", credits: 3 },
      { code: "23-204-0307", name: "Hardware Design & CPS Laboratory", credits: 1 },
      { code: "23-204-0308", name: "Data Structures in C++ Laboratory", credits: 1 },
      { code: "23-204-0309", name: "Internship-I", credits: 1 },
    ],
    4: [
      { code: "23-200-0401B*", name: "Numerical and Statistical Techniques", credits: 3 },
      { code: "23-204-0402", name: "Data Communication", credits: 3 },
      { code: "23-204-0403", name: "Operating Systems", credits: 3 },
      { code: "23-204-0404", name: "Software Engineering", credits: 3 },
      { code: "23-204-0405", name: "Formal Languages and Automata Theory", credits: 3 },
      { code: "23-204-0406", name: "Design and Analysis of Algorithms", credits: 3 },
      { code: "23-200-0407**", name: "Universal Human Values", credits: 3 },
      { code: "23-204-0408", name: "Operating Systems Lab", credits: 1 },
      { code: "23-204-0409", name: "Mini Project-DBMS based", credits: 1 },
    ],
    5: [
      { code: "23-204-0501", name: "Compiler Design", credits: 3 },
      { code: "23-204-0502", name: "Software Design and Architecture", credits: 3 },
      { code: "23-204-0503", name: "Internet of Things", credits: 3 },
      { code: "23-204-0504", name: "Big Data Analytics", credits: 3 },
      { code: "23-204-0505", name: "Internet Architecture & Design", credits: 3 },
      { code: "23-204-05**", name: "Professional Elective - I", credits: 3 },
      { code: "23-204-0510", name: "Networking & Edge Computing Lab", credits: 1 },
      { code: "23-204-0511", name: "Software Engineering Lab", credits: 1 },
      { code: "23-204-0512", name: "Internship-II", credits: 1 },
    ],
    6: [
      { code: "23-204-0601", name: "Agile Project Methodology", credits: 3 },
      { code: "23-204-0602", name: "Data Security and Cryptography", credits: 3 },
      { code: "23-204-0603", name: "Deep Learning", credits: 3 },
      { code: "23-204-0604", name: "Cloud Computing", credits: 3 },
      { code: "23-204-0605", name: "Design and Development Mobile Application", credits: 3 },
      { code: "23-204-06**", name: "Professional Elective - II", credits: 3 },
      { code: "23-204-0610", name: "Cloud and Data Analytics Laboratory", credits: 1 },
      { code: "23-204-0611", name: "Mini Project - Mobile App Development", credits: 1 },
    ],
    7: [
      { code: "23-204-0701", name: "Financial Management & E-banking", credits: 3 },
      { code: "23-204-0702", name: "Design Thinking and Innovations", credits: 3 },
      { code: "23-204-0703", name: "Computer Graphics and Visual Computing", credits: 3 },
      { code: "23-204-07**", name: "Professional Elective - III", credits: 3 },
      { code: "23-204-07**", name: "Open Elective - I", credits: 3 },
      { code: "23-204-0712", name: "Computer Graphics Laboratory", credits: 1 },
      { code: "23-204-0713", name: "Mini Project Multimedia Project", credits: 1 },
      { code: "23-204-0714", name: "Entrepreneurship Development", credits: 1 },
      { code: "23-204-0715", name: "Project Phase I", credits: 2 },
      { code: "23-204-0716", name: "Internship-III", credits: 1 },
    ],
    8: [
      { code: "23-204-08**", name: "Professional Elective IV", credits: 3 },
      { code: "23-204-08**", name: "Professional Elective - V", credits: 3 },
      { code: "23-204-08**", name: "Professional Elective VI", credits: 3 },
      { code: "23-204-08**", name: "Open Elective - II", credits: 3 },
      { code: "23-204-0818", name: "Seminar", credits: 1 },
      { code: "23-204-0819", name: "Project Phase - II", credits: 6 },
      { code: "23-204-0820", name: "Comprehensive Viva Voce", credits: 1 },
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
  const [step, setStep] = useState(0)
  const [department, setDepartment] = useState("")
  const [semester, setSemester] = useState(1)
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [result, setResult] = useState<CGPAResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [titleText, setTitleText] = useState("")
  const [showCelebration, setShowCelebration] = useState(false)
  const [mounted, setMounted] = useState(false)

  const isMobile = useIsMobile()

  const semesterSectionRef = useRef<HTMLDivElement>(null)

  // Ensure component is mounted before rendering
  useEffect(() => {
    setMounted(true)
  }, [])

  // Typing animation for title
  useEffect(() => {
    if (step === 0 && mounted) {
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
  }, [step, mounted])

  const handleDepartmentSelect = (deptId: string) => {
    setDepartment(deptId)
    setError("")

    setTimeout(() => {
      semesterSectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      })
    }, 300)
  }

  const handleSemesterSelect = (sem: number) => {
    setSemester(sem)
    setError("")
  }

  const handleContinue = async () => {
    setLoading(true)
    setError("")

    try {
      await new Promise((resolve) => setTimeout(resolve, 800))

      const deptSubjects = subjectData[department as keyof typeof subjectData]?.[semester]

      if (!deptSubjects || deptSubjects.length === 0) {
        setError(
          `No subjects found for ${departments.find((d) => d.id === department)?.name} - Semester ${semester}. Please try a different semester.`,
        )
        setLoading(false)
        return
      }

      setSubjects(deptSubjects.map((subject) => ({ ...subject, grade: "" })))
      setStep(2)
      window.scrollTo({ top: 0, behavior: "smooth" })
    } catch (err) {
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleGradeChange = (subjectIndex: number, grade: string) => {
    const updatedSubjects = [...subjects]
    updatedSubjects[subjectIndex].grade = grade
    setSubjects(updatedSubjects)
  }

  const calculateCGPA = async () => {
    setLoading(true)
    setError("")

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      let totalGradePoints = 0
      let totalCredits = 0

      const subjectsWithGradePoints = subjects.map((subject) => {
        const gradeOption = gradeOptions.find((g) => g.value === subject.grade)
        const gradePoints = (gradeOption?.points || 0) * subject.credits
        totalCredits += subject.credits
        if (subject.grade !== "F") {
          totalGradePoints += gradePoints
          
        }

        return {
          ...subject,
          gradePoints,
        }
      })

      const sgpa = totalCredits > 0 ? totalGradePoints / totalCredits : 0

      setResult({
        cgpa: Math.round(sgpa * 100) / 100,
        totalCredits,
        totalGradePoints,
        subjects: subjectsWithGradePoints,
      })

      setStep(3)

      // Enhanced mobile scrolling mechanism
      if (isMobile) {
        // Multiple scroll attempts for mobile devices
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: "smooth" })
        }, 100)

        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: "auto" })
        }, 300)

        setTimeout(() => {
          document.documentElement.scrollTop = 0
          document.body.scrollTop = 0
        }, 500)
      } else {
        // Standard scrolling for desktop
        window.scrollTo({ top: 0, behavior: "smooth" })
      }

      if (sgpa >= 8.5) {
        setShowCelebration(true)
        setTimeout(() => setShowCelebration(false), 3000)
      }
    } catch (err) {
      setError("Failed to calculate SGPA. Please try again.")
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
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const canContinue = department && semester && !loading
  const canCalculate = subjects.length > 0 && subjects.every((subject) => subject.grade) && !loading

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-8xl mb-4">🎓</div>
          <div className="text-2xl font-semibold text-gray-600">Loading...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent z-50">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-500"
          style={{ width: `${(step / 3) * 100}%` }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        {/* Welcome Screen */}
        {step === 0 && (
          <div className="text-center max-w-2xl animate-fade-in">
            <div className="text-8xl mb-4">🎓</div>
            <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              {titleText}
              <span className="animate-pulse text-purple-500">|</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">Calculate your SGPA </p>
            <Button
              onClick={() => setStep(1)}
              className="px-12 py-6 text-xl font-semibold bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-2xl hover:shadow-purple-500/25 transition-all duration-300"
            >
              <span className="flex items-center gap-3">
                Get Started <Sparkles className="w-6 h-6" />
              </span>
            </Button>
          </div>
        )}

        {/* Selection Screen */}
        {step === 1 && (
          <div className="w-full max-w-4xl animate-slide-in">
            <Card className="bg-white/80 backdrop-blur-md border border-white/20 shadow-2xl rounded-3xl p-8">
              <div className="text-center mb-8">
                <h2 className="text-4xl font-bold text-gray-800 mb-2">Choose Your Stream</h2>
                <p className="text-gray-600">Select your department and semester to begin</p>
              </div>

              {error && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                  <p className="text-red-700">{error}</p>
                </div>
              )}

              {/* Department Selection */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">Department</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {departments.map((dept) => (
                    <div
                      key={dept.id}
                      onClick={() => handleDepartmentSelect(dept.id)}
                      className={`cursor-pointer p-6 rounded-2xl bg-gradient-to-br ${dept.color} text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 ${
                        department === dept.id ? "ring-4 ring-white/50 shadow-2xl scale-105" : ""
                      }`}
                    >
                      <div className="text-4xl mb-3">{dept.icon}</div>
                      <h4 className="font-semibold text-lg leading-tight">{dept.name}</h4>
                    </div>
                  ))}
                </div>
              </div>

              {/* Semester Selection */}
              <div
                ref={semesterSectionRef}
                className={`mb-8 transition-opacity duration-300 ${department ? "opacity-100" : "opacity-50"}`}
              >
                <h3 className="text-xl font-semibold text-gray-700 mb-4">Semester: {semester}</h3>
                <div className="flex flex-wrap gap-2">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                    <button
                      key={sem}
                      onClick={() => handleSemesterSelect(sem)}
                      disabled={!department}
                      className={`w-12 h-12 rounded-full font-semibold transition-all duration-300 hover:scale-110 ${
                        semester === sem
                          ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                          : "bg-white/20 text-gray-600 hover:bg-white/30"
                      } ${!department ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                      {sem}
                    </button>
                  ))}
                </div>
              </div>

              {/* Continue Button */}
              <div className="text-center">
                <Button
                  onClick={handleContinue}
                  disabled={!canContinue}
                  className={`px-8 py-4 text-lg font-semibold bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 ${
                    loading ? "animate-pulse" : ""
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    {loading ? "Processing..." : "Continue"}
                  </span>
                </Button>
              </div>
            </Card>
          </div>
        )}

        {/* Subject Selection Screen */}
        {step === 2 && (
          <div className="w-full max-w-5xl animate-slide-in">
            <Card className="bg-white/80 backdrop-blur-md border border-white/20 shadow-2xl rounded-3xl p-8">
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
                  <h2 className="text-3xl font-bold text-gray-800">Enter Your Grades</h2>
                  <p className="text-gray-600">
                    {departments.find((d) => d.id === department)?.name} - Semester {semester}
                  </p>
                </div>
              </div>

              {error && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                  <p className="text-red-700">{error}</p>
                </div>
              )}

              <div className="space-y-4 mb-8">
                {subjects.map((subject, index) => (
                  <div
                    key={subject.code}
                    className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/70 transition-all duration-300"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Badge variant="outline" className="bg-white/20 text-gray-700">
                            {subject.code}
                          </Badge>
                          <Badge variant="secondary" className="bg-blue-500/20 text-blue-700">
                            {subject.credits} credits
                          </Badge>
                        </div>
                        <h3 className="font-semibold text-lg text-gray-800">{subject.name}</h3>
                      </div>

                      <div className="flex gap-2 flex-wrap">
                        {gradeOptions.map((grade) => (
                          <button
                            key={grade.value}
                            onClick={() => handleGradeChange(index, grade.value)}
                            className={`w-12 h-12 rounded-full font-semibold text-white shadow-lg transition-all duration-300 hover:scale-110 ${
                              subject.grade === grade.value
                                ? `bg-gradient-to-r ${grade.color} ring-4 ring-white/50 shadow-xl scale-110`
                                : `bg-gradient-to-r ${grade.color} opacity-60 hover:opacity-100`
                            }`}
                          >
                            {grade.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center">
                <Button
                  onClick={calculateCGPA}
                  disabled={!canCalculate}
                  className={`px-12 py-6 text-xl font-semibold bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full shadow-2xl hover:shadow-green-500/25 transition-all duration-300 disabled:opacity-50 ${
                    loading ? "animate-pulse" : ""
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <Calculator className="w-6 h-6" />
                    {loading ? "Calculating..." : "Calculate SGPA"}
                  </span>
                </Button>
              </div>
            </Card>
          </div>
        )}

        {/* Results Screen */}
        {step === 3 && result && (
          <div className="w-full max-w-4xl animate-fade-in">
            <Card className="bg-white/80 backdrop-blur-md border border-white/20 shadow-2xl rounded-3xl p-8 text-center">
              <div className="mb-8">
                <div className="text-6xl mb-4">
                  {result.cgpa >= 9 ? "🏆" : result.cgpa >= 8 ? "🎉" : result.cgpa >= 7 ? "👏" : "📚"}
                </div>
                <h2 className="text-4xl font-bold text-gray-800 mb-4">Your SGPA Result</h2>

                <div className="relative inline-block">
                  <div className="text-8xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                    {result.cgpa.toFixed(2)}
                  </div>
                  {showCelebration && <div className="absolute -top-4 -right-4 text-4xl animate-bounce">✨</div>}
                </div>

                <p className="text-xl text-gray-600 mt-4">Based on {result.totalCredits} total credits</p>
              </div>

              {/* Grade Breakdown */}
              <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 mb-8">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Grade Breakdown</h3>
                <div className="grid gap-3">
                  {result.subjects.map((subject) => (
                    <div key={subject.code} className="flex justify-between items-center p-3 bg-white/50 rounded-lg">
                      <div className="text-left">
                        <span className="font-medium text-gray-800">{subject.code}</span>
                        <span className="text-gray-600 ml-2">- {subject.name}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge
                          className={`bg-gradient-to-r ${
                            gradeOptions.find((g) => g.value === subject.grade)?.color || "from-gray-400 to-gray-500"
                          } text-white`}
                        >
                          {subject.grade}
                        </Badge>
                        <span className="text-gray-600 min-w-[60px] text-right">{subject.gradePoints} pts</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => setStep(2)}
                  variant="outline"
                  className="px-6 py-3 bg-white/10 border-white/20 text-gray-700 hover:bg-white/20"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Recalculate
                </Button>
                <Button
                  onClick={startOver}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg"
                >
                  <GraduationCap className="w-4 h-4 mr-2" />
                  Start Over
                </Button>
              </div>

              {/* Achievement Badge */}
              {result.cgpa >= 8.5 && (
                <div className="mt-6">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full font-semibold animate-bounce">
                    <Trophy className="w-5 h-5" />
                    Excellence Achievement Unlocked!
                  </div>
                </div>
              )}
            </Card>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-in {
          from { opacity: 0; transform: translateX(100px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        
        .animate-slide-in {
          animation: slide-in 0.6s ease-out;
        }
      `}</style>
    </div>
  )
}
