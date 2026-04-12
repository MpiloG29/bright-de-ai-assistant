# Data Engineering AI Assistant

A comprehensive, interactive learning platform for data engineering concepts — with AI assistance, gamified progress tracking, scenario simulations, career mapping, and a built-in community hub.

<img width="1600" height="772" alt="App Screenshot" src="https://github.com/user-attachments/assets/620ad669-dbca-4fb3-a5bb-f4739a3c41cb" />

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Pages & Routes](#pages--routes)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Deployment](#deployment)

---

## Overview

The **Data Engineering AI Assistant** is a fully client-side React application designed to help learners at all levels master data engineering. It covers everything from foundational terms and courses to real-world case studies, interactive labs, and a career tracker — all wrapped in an orange & purple theme with gamified XP, ranks, and badges to keep you motivated.

---

## Features

### 🎓 Learning
- **50+ Data Engineering Terms** — searchable library with definitions, usage examples, and difficulty levels
- **8 Structured Courses** — beginner to advanced, with enrollment and progress tracking
- **100+ Video Tutorials** — curated from YouTube, organized by category, with watch-tracking
- **AI Assistant** — ask any data engineering question and get instant explanations
- **Voice Search** — speak your question using the Web Speech API

### 🧪 Interactive Labs
- **Scenario Simulations** — multi-step, story-driven scenarios (ETL pipeline, star schema design, debugging)
- **Drag-and-Drop Exercises** — visually build pipelines and arrange architectural layers in the correct order
- **Code Playground** — write and simulate SQL, Python (pandas/PySpark), and Spark SQL with live output

### 📊 Progress & Gamification
- **XP System** — earn points for mastering terms, completing quizzes, watching videos, and maintaining streaks
- **7 DE Ranks** — progress from *Data Intern* all the way to *Data Legend*
- **14 Unlockable Badges** — Bookworm, Quiz Master, Week Warrior, and more
- **Daily Streak Tracker** — stay consistent with a fire-streak counter
- **Quiz History** — review all past results with scores and XP earned

### 🗺️ Discovery & Navigation
- **Concept Map** — interactive SVG diagram showing how data engineering concepts connect (click any node to explore)
- **AI-Powered Glossary** — search any term for instant definitions, related concepts, and usage context
- **Daily Data Digest** — a new tip, trivia, concept, or challenge every day
- **Storytelling Mode** — toggle to learn concepts through real-world narratives instead of dry definitions
- **Personalized Recommendations** — suggested next steps based on your progress

### 📋 Real-World Practice
- **Case Studies Hub** — 5 detailed industry cases (Finance, Healthcare, E-Commerce, Logistics, Media) showing how DE patterns are applied in production
- **Tool Demos** — hands-on code samples for Snowflake, Databricks, and AWS Glue
- **Adaptive Learning** — quiz difficulty and content suggestions adapt to your knowledge gaps

### 🚀 Career Tools
- **Career Tracker** — 6 data engineering roles mapped with required skills, salaries, and responsibilities
- **Skill Checklist** — check off skills you've learned; see your readiness percentage per role
- **Personalized Roadmap** — set a career goal and get a tailored plan showing skills to learn, certs to earn, and courses to take

### 🤝 Community
- **Weekly Peer Challenges** — submit architectural solutions and see the top community answer
- **Q&A Discussion Boards** — ask questions, post answers, and upvote the best responses
- **Mentorship Mode** — browse experienced data engineers available for guided sessions

---

## Pages & Routes

| Route | Page | Description |
|---|---|---|
| `/` | Dashboard | Daily digest, term of the day, recommendations, streak |
| `/terms` | Terms Library | 50+ DE terms with search, filter, and bookmark |
| `/courses` | Courses | 8 courses with enrollment and progress |
| `/videos` | Video Tutorials | 100+ videos organized by category |
| `/progress` | Progress & Ranks | XP, badges, ranks, quiz history |
| `/scenarios` | Interactive Labs | Scenario simulations + drag-and-drop exercises |
| `/concept-map` | Concept Map | Visual SVG map of interconnected DE concepts |
| `/case-studies` | Case Studies | Industry cases + tool demos (Snowflake, Databricks, Glue) |
| `/playground` | Code Playground | SQL, Python, and Spark code editor with simulated output |
| `/career` | Career Tracker | Role overview, skill checklist, and personalized roadmap |
| `/community` | Community Hub | Weekly challenges, Q&A forum, mentorship |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 |
| Routing | React Router v6 |
| State | React Hooks (useState, useEffect) |
| Storage | Browser localStorage |
| Voice Input | Web Speech API (native browser) |
| Visualizations | SVG (Concept Map), HTML5 Drag & Drop |
| Styling | Plain CSS with CSS custom properties |
| Build | Create React App (react-scripts 5) |
| Deployment | GitHub Pages |

> **No backend required.** All data and progress is stored in the browser via localStorage.

---

## Getting Started

### Prerequisites

- Node.js 16+ and npm

### Installation

```bash
# Clone the repository
git clone https://github.com/MpiloG29/bright-de-ai-assistant.git

# Navigate into the project
cd bright-de-ai-assistant

# Install dependencies
npm install
```

### Run Locally

```bash
npm start
```

Opens at [http://localhost:3000](http://localhost:3000)

### Production Build

```bash
npm run build
```

---

## Project Structure

```
src/
├── components/
│   ├── Header.js          # Top navigation bar with stats
│   ├── Sidebar.js         # Main nav, AI chat, voice search, quick actions
│   ├── TermCard.js        # Reusable term display card
│   ├── CourseCard.js      # Course card with progress
│   ├── VideoPlayer.js     # Video tutorial card
│   ├── ProgressTracker.js # Dashboard progress summary
│   └── SearchBar.js       # Search input component
│
├── pages/
│   ├── Dashboard.js       # Home: digest, recommendations, term of the day
│   ├── TermsLibrary.js    # Searchable DE terms glossary
│   ├── Courses.js         # Course catalog and enrollment
│   ├── Videos.js          # Video tutorial listing
│   ├── Progress.js        # XP, ranks, badges, quiz history
│   ├── Scenarios.js       # Interactive labs and drag-drop exercises
│   ├── ConceptMap.js      # SVG concept relationship map
│   ├── CaseStudies.js     # Industry case studies and tool demos
│   ├── CodePlayground.js  # SQL/Python/Spark code editor
│   ├── CareerTracker.js   # Career roles and skill roadmap
│   └── Community.js       # Challenges, Q&A forum, mentorship
│
├── data/
│   ├── termsData.js        # 50+ DE terms
│   ├── coursesData.js      # 8 course definitions
│   ├── videosData.js       # Video catalog
│   ├── caseStudiesData.js  # 5 case studies + 3 tool demos
│   └── scenariosData.js    # 3 scenarios + 2 drag-drop exercises
│
├── services/
│   ├── aiService.js        # AI question answering and quiz generation
│   └── storageService.js   # localStorage read/write layer
│
└── styles/
    ├── App.css             # Layout and page-level styles
    ├── colors.css          # CSS custom properties (orange & purple theme)
    ├── components.css      # Component-level styles
    └── features.css        # Styles for all new feature pages
```

---

## Deployment

The app is deployed to GitHub Pages:

**Live:** [https://MpiloG29.github.io/bright-de-ai-assistant](https://MpiloG29.github.io/bright-de-ai-assistant)

To deploy your own version:

```bash
npm run deploy
```

This runs `react-scripts build` and pushes the `build/` folder to the `gh-pages` branch automatically.

---

## Color Theme

The app uses an **orange & purple** design system defined via CSS custom properties:

| Token | Value | Usage |
|---|---|---|
| `--primary-orange` | `#f97316` | Buttons, active states, accents |
| `--secondary-purple` | `#7c3aed` | Gradients, highlights, badges |
| `--light-bg` | `#fff7f0` | Page backgrounds |
| `--accent-green` | `#10b981` | Success states, achievements |

---

## License

MIT — free to use, modify, and distribute.
