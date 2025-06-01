# Alphabet Typing Speed Game

A fun and interactive typing speed game that challenges users to type the alphabet as quickly as possible.

## 🎮 Game Features

- **Real-time Typing**: Letters change color as you type, providing immediate visual feedback
- **Progress Tracking**: Visual display of typed, current, and pending letters
- **Timer System**: Precise timing to 3 decimal places
- **Best Time Storage**: Saves your best time using localStorage
- **Auto-Start**: Game begins automatically with your first keystroke
- **Case Insensitive**: Accepts both uppercase and lowercase letters
- **Error Prevention**: Only allows correct sequential alphabet input

## 🎯 How It Works

1. **Starting the Game**:
   - Game starts in 'idle' state
   - First keystroke automatically starts the timer
   - Input field auto-focuses when ready to start

2. **During Gameplay**:
   - Letters are color-coded:
     - Typed letters: Completed (success color)
     - Current letter: Highlighted (current color)
     - Pending letters: Dimmed (pending color)
   - Timer updates in real-time (every 10ms)
   - Only correct sequential inputs are accepted

3. **Finishing**:
   - Game completes when entire alphabet is correctly typed
   - Final time is displayed and compared with best time
   - Option to try again appears
   - New records are automatically saved

## 🎨 Game Color Palette

### Game States
```css
/* Letter States */
.typed {
  color: #4ade80;    /* Success Green */
}

.current {
  color: #60a5fa;    /* Highlight Blue */
}

.pending {
  color: #6b7280;    /* Dim Gray */
}

/* Background Elements */
.game-wrapper {
  background: rgba(17, 24, 39, 0.8);    /* Dark Background */
}

/* Interactive Elements */
.play-again-btn {
  background: #3b82f6;    /* Action Blue */
  hover: #2563eb;         /* Darker Blue on Hover */
}

/* Text Colors */
.time-label {
  color: #9ca3af;    /* Muted Gray */
}

.time-value {
  color: #f3f4f6;    /* Light Gray */
}

.new-record {
  color: #fbbf24;    /* Achievement Gold */
}
```

## 🔧 Game States

The game operates in three states:
1. `idle`: Waiting for first keystroke
2. `playing`: Active gameplay with running timer
3. `finished`: Displaying results and option to restart

## 🏆 Scoring System

- Time is measured in seconds with millisecond precision
- Best times are stored locally in the browser
- New records are celebrated with a trophy animation
- Times are displayed in the format: X.XXXs

---

# 🎨 Website Color Palette

The website features a modern, dark theme with carefully chosen colors for different UI elements and interactions.

## Base Colors
```css
/* Background */
body {
  background: #000000;    /* Pure Black */
  color: #ffffff;         /* Pure White */
}

/* Primary Colors */
--primary-color: #3b82f6;    /* Primary Blue */
```

## Gradient Schemes
```css
/* Text Gradients */
.gradient-text {
  background: linear-gradient(to right, #60a5fa, #8b5cf6, #06b6d4);    /* Blue to Purple to Cyan */
}

/* Section Headers */
.section-heading {
  background: linear-gradient(135deg, #60a5fa, #a78bfa, #06b6d4);    /* Blue to Purple to Cyan */
}

/* Hero Background */
.hero-section {
  background: linear-gradient(135deg, rgba(10, 10, 20, 0.3), rgba(17, 24, 39, 0.4));    /* Dark Blue Overlay */
}
```

## Glass Morphism
```css
/* Base Glass Effect */
.glass {
  background: rgba(255, 255, 255, 0.1);    /* Translucent White */
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

/* Card Glass Effect */
.glass-card {
  background: rgba(255, 255, 255, 0.09);
  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
}

/* Hover States */
.glass-card-hover:hover {
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(255, 255, 255, 0.25);
}
```

## Project Card Colors
```css
/* Project Icons */
.healthcare {
  color: #f87171;    /* Red */
}
.education {
  color: #60a5fa;    /* Blue */
}
.retail {
  color: #4ade80;    /* Green */
}
.automation {
  color: #a78bfa;    /* Purple */
}
.media {
  color: #f472b6;    /* Pink */
}
.security {
  color: #fb923c;    /* Orange */
}
.iot {
  color: #818cf8;    /* Indigo */
}
```

## Text Colors
```css
/* Text Hierarchy */
.heading {
  color: #ffffff;    /* Pure White */
}
.body-text {
  color: #d1d5db;    /* Light Gray */
}
.muted-text {
  color: #9ca3af;    /* Muted Gray */
}
.accent-text {
  color: #60a5fa;    /* Accent Blue */
}
```

## Interactive Elements
```css
/* Buttons and Links */
.button {
  background: linear-gradient(45deg, #4f46e5, #7c3aed);    /* Indigo to Purple */
  box-shadow: 0 4px 15px rgba(79, 70, 229, 0.3);
}

.button:hover {
  box-shadow: 0 6px 20px rgba(79, 70, 229, 0.4);
}

/* Links */
.link {
  color: #60a5fa;    /* Blue */
}
.link:hover {
  color: #93c5fd;    /* Lighter Blue */
}
``` 