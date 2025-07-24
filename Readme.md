# 🎓 CUSAT CGPA Calculator

A modern, interactive CGPA calculator specifically designed for students of Cochin University of Science and Technology (CUSAT). This web application helps students calculate their Cumulative Grade Point Average with an intuitive and user-friendly interface.

## ✨ Features

- **Multi-Department Support**: Covers major engineering departments including:
  - Computer Science & Engineering (CSE)
  - Electronics & Communication (ECE)
  - Mechanical Engineering (ME)
  - Civil Engineering (CE)
  - Electrical Engineering (EE)
  - Safety & Fire Engineering (SFE)
  - Information Technology (IT)

- **Semester-wise Calculation**: Calculate GPA for individual semesters and cumulative CGPA
- **Interactive UI**: Modern, responsive design with smooth animations
- **Real-time Updates**: Instant CGPA calculation as you input grades
- **Subject Management**: Pre-loaded with department-specific subjects and credit hours
- **Grade Validation**: Ensures accurate grade entry with proper validation
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed on your system:
- **Node.js** (v18 or higher)
- **pnpm** (recommended) or npm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ronymundackan/CUSAT-CGPA-Calculator.git
   cd CUSAT-CGPA-Calculator
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```
   Or using npm:
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   pnpm dev
   ```
   Or using npm:
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to view the application.

## 🛠️ Built With

- **[Next.js 14](https://nextjs.org/)** - React framework for production
- **[React 18](https://reactjs.org/)** - JavaScript library for building user interfaces
- **[TypeScript](https://www.typescriptlang.org/)** - Typed superset of JavaScript
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Framer Motion](https://www.framer.com/motion/)** - Animation library for React
- **[Radix UI](https://www.radix-ui.com/)** - Low-level UI primitives
- **[Lucide React](https://lucide.dev/)** - Beautiful & consistent icons

## 📱 Usage

1. **Select Your Department**: Choose your engineering department from the available options
2. **Choose Semester**: Select the semester you want to calculate GPA for
3. **Enter Grades**: Input your grades for each subject (A+, A, B+, B, C+, C, D, F)
4. **View Results**: Your GPA and CGPA will be calculated automatically
5. **Calculate Multiple Semesters**: Add more semesters to get your cumulative CGPA

## 🎯 CGPA Calculation

The application uses the standard CUSAT grading system:
- **A+**: 10 points
- **A**: 9 points  
- **B+**: 8 points
- **B**: 7 points
- **C+**: 6 points
- **C**: 5 points
- **D**: 4 points
- **F**: 0 points

**Formula**: CGPA = Σ(Grade Points × Credits) / Σ(Credits)




⭐ **Star this repository if you found it helpful!**