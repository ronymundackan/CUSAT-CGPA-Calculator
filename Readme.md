# 🎓 SOE CUSAT SGPA Calculator

A simple CGPA calculator specifically designed for students of School of Engineering, Cochin University of Science and Technology (CUSAT).  This webapp is hosted on https://soe-cusat-sgpa-calculator.vercel.app

If you wish to host this on your system, follow the steps below

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed on your system:
- **Node.js** (v18 or higher)
- **pnpm** (recommended) or npm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ronymundackan/CUSAT-SGPA-Calculator.git
   cd CUSAT-SGPA-Calculator
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
3. **Enter Grades**: Input your grades for each subject (S, A, B, C, D, F)
4. **View Results**: Your GPA and CGPA will be calculated automatically
5. **Calculate Multiple Semesters**: Add more semesters to get your cumulative CGPA

## 🎯 CGPA Calculation

The application uses the standard CUSAT grading system:
- **S**: 10 points
- **A**: 9 points  
- **B**: 8 points
- **C**: 7 points
- **D**: 6 points
- **F**: 0 points

**Formula**: CGPA = Σ(Grade Points × Credits) / Σ(Credits)




⭐ **Star this repository if you found it helpful!**
