# ⌨️ TypeCat - Modern Typing Speed Test

[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![React Router](https://img.shields.io/badge/React_Router-v7-CA4245?style=flat-square&logo=react-router&logoColor=white)](https://reactrouter.com/)
[![Recharts](https://img.shields.io/badge/Recharts-3.x-22c55e?style=flat-square)](https://recharts.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE)

A modern, distraction-free typing speed test web application built with **React**, **Lucide Icons**, and **Recharts**. Test your speed, improve accuracy, and track your progress over time with a sleek, dark-themed user interface.

---

## ✨ Features

- **⚡ Real-Time Metrics**: Instant calculation of Words Per Minute (WPM), Accuracy percentage, and error tracking as you type.
- **🎯 Live Visual Feedback**: Immediate letter-by-letter highlighting showing correct, erroneous, and active characters.
- **⏱️ Flexible Test Modes**: Quick toggle between different timer durations (15s, 30s, 60s) and varying paragraph lengths.
- **📊 Detailed Results & Analytics**: Post-test performance breakdown with comprehensive statistics and interactive score charts.
- **🏆 Global Leaderboard**: Compete with other typists and check top scores on the community leaderboard.
- **📈 Personal Dashboard**: Visualize your speed improvements and track historical test records.
- **🎨 Sleek Dark Theme**: Designed with an eye-friendly, high-contrast dark aesthetic for maximum focus and minimal eye strain.

---

## 🛠️ Tech Stack

- **Frontend**: [React 19](https://react.dev/)
- **Routing**: [React Router v7](https://reactrouter.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Charts & Visualizations**: [Recharts](https://recharts.org/)
- **Styling**: Modern Vanilla CSS with CSS variables and custom themes

---

## 📁 Project Structure

```text
Typing_Test/
├── public/                # Static assets & HTML template
│   ├── index.html
│   ├── favicon.ico
│   └── manifest.json
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── Footer.js
│   │   ├── Navbar.js
│   │   ├── ResultCard.js
│   │   ├── Timer.js
│   │   └── TypingBox.js
│   ├── data/              # Typing test paragraphs & datasets
│   │   └── paragraphs.js
│   ├── pages/             # Route pages
│   │   ├── Dashboard.js
│   │   ├── Home.js
│   │   ├── Leaderboard.js
│   │   ├── Login.js
│   │   ├── NotFound.js
│   │   ├── Register.js
│   │   └── TypingTest.js
│   ├── App.js             # App routes and layout
│   ├── index.css          # Global styling & CSS variables
│   └── index.js           # React DOM root entrypoint
├── package.json           # Dependencies and scripts
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 16 or newer recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/TanishShetty007/Typing_Test.git
   cd Typing_Test
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to start typing!

### Production Build

To create an optimized production build:
```bash
npm run build
```

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/TanishShetty007/Typing_Test/issues).

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
