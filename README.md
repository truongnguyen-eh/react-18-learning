# React 18 Learning Repository

A comprehensive learning resource for React 18 features and best practices.

## 🚀 Getting Started

1. Clone this repository
2. Install dependencies:
```bash
npm install
```

## 📚 Topics Covered

This repository contains practical examples organized by topic:

- `fundamentals/` - Core React concepts and patterns
  - `conditional-rendering/` - Different approaches to conditional rendering
  - `event-handling/` - Event handling patterns and lifecycle
  - `rendering-list/` - List rendering best practices
- `hooks/` - React Hooks deep dive
  - useState, useReducer examples
  - Hook rules and best practices
  - Common mistakes and caveats
- `concurrency/` - React 18's concurrent features (in development)
  - Transitions and Suspense concepts

## 🛠 Usage

### Running Examples

To run a specific example, use the INPUT environment variable:

```bash
INPUT=path/to/example.tsx npm start
```

### Examples:

```bash
# Run event handling demo
INPUT=fundamentals/event-handling/demo.tsx npm start

# Run useState examples
INPUT=hooks/4-useState_demo.tsx npm start

# Run conditional rendering examples
INPUT=fundamentals/conditional-rendering/ternary-operator.tsx npm start
```

The development server will automatically open with the specified example loaded.

## 📁 Project Structure

```
react-18-learning/
├── fundamentals/           # Core React concepts
│   ├── conditional-rendering/
│   ├── event-handling/
│   └── rendering-list/
├── hooks/                  # React Hooks examples
├── concurrency/           # React 18 concurrent features
├── entry-loader.ts        # Dynamic example loader
├── vite.config.ts         # Vite configuration
├── package.json
└── README.md
```

## 🔧 Development Features

- **Multiple React Versions**: The project includes React 16, 17, and 18 for comparison
- **Dynamic Loading**: Examples are loaded dynamically based on the INPUT parameter
- **Vite Dev Server**: Fast development with hot reload
- **TypeScript Support**: All examples use TypeScript for better development experience

## 📝 Notes

- Examples use React 18 by default but can be configured for different versions
- Each example is self-contained with detailed comments
- The entry-loader.ts handles dynamic importing of examples
- Development server opens automatically with the specified example
