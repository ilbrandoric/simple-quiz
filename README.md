# simple-quiz-app

A quick exercise to learn how to randomize questions and answers using vanilla JS.

## Demo Features Include:

**DOM Manipulation & Event Handling:**
- `getElementById()` to target specific DOM elements
- `addEventListener()` to handle click events on start, next, and answer buttons
- CSS class manipulation (`classList.add()`, `classList.remove()`) to show/hide elements
- Dynamic button creation and appending to the DOM

**Conditional Logic:**
- Ternary operations to conditionally apply CSS classes (`correct ? "correct" : "incorrect"`)
- Boolean state management to prevent multiple answers per question
- Conditional rendering based on game state (time-out vs. completed questions)

**Array Methods & Shuffling:**
- `map()` to shuffle answers within each question object
- `sort()` and `Math.random()` to randomize question deck order
- Custom `shuffleArray()` function using map/sort pattern for randomization
- `forEach()` to loop through answer options and create buttons

**Timer & Intervals:**
- `setInterval()` to create a countdown timer (60 seconds)
- Time formatting logic using `Math.floor()` and modulo operator (`%`)
- Ternary operation to ensure seconds always display with two digits
- `clearInterval()` to stop the timer when game ends

**State Management & Score Tracking:**
- Global variables to track game state (`score`, `currentQuestionIndex`, `alreadyAnswered`)
- Real-time score updates with template literals
- Game restart functionality with state reset

**Data Attributes:**
- `dataset.correct` to store whether an answer is correct on each button element
 