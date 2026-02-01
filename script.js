// Targeting DOM elements

const startButton = document.getElementById("start-button");
const nextButton = document.getElementById("next-button");

const questionContainer = document.getElementById("question-container");
const answerButtons = document.getElementById("answer-buttons");

const scoreBoard = document.getElementById("scoreboard-container");

// STATE (what situation is the program currently in?)

let shuffledQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let alreadyAnswered = false;

// Start / Restart buttons

startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", showNextQuestion);

// Game flow

function startGame() {
  // Hides start button once game starts
  startButton.classList.add("hidden");

  // Unhides scoreboard, question & answer buttons
  questionContainer.classList.remove("hidden");
  answerButtons.classList.remove("hidden");
  scoreBoard.classList.remove('hidden');

  // Resets the value so if game is a restart it start 'clean' with no bugs
  currentQuestionIndex = 0;
  alreadyAnswered = false;
  score = 0;

  // Creates a new array of objects 'shuffledQuestions' does NOT mutate quizQuestions original
  // You shuffle the answer options 'inside' and then the entire question deck is itself shuffled

  shuffledQuestions = quizQuestions
    .map((question) => {
      return {
        ...question,
        options: shuffleArray(question.options), // Shuffle answers happens here
      };
    })
    .sort(() => Math.random() - 0.5);

  showQuestion();

  // Displays score
  totalScore();
}

// Question logic

function showQuestion() {
  resetState();
  alreadyAnswered = false;

  const currentQuestion = shuffledQuestions[currentQuestionIndex];
  questionContainer.innerText = currentQuestion.question;

  shuffledAnswers = currentQuestion;

  // Loops inside each questions answer options and displays it
  currentQuestion.options.forEach((option) => {
    const button = document.createElement("button");
    button.innerText = option.text;
    button.classList.add("btn");

    // You’re attaching custom data directly to the button (correct = true)
    // The browser stores data-correct="true"

    button.dataset.correct = option.correct;

    button.addEventListener("click", selectAnswer);
    // Adds an answer option as a button under id="answer-buttons" or
    // insert this button as a child of the answerButtons container.
    answerButtons.appendChild(button);
  });
}

function showNextQuestion() {
  currentQuestionIndex++;
  showQuestion();
}

// Answer logic

// Only first click on answer is correct and score increases
// This is the answer the user chose 'e.target' or the button the user clicked

function selectAnswer(e) {
  //If already answered STOP. Do nothing else
  if (alreadyAnswered === true) {
    return;
  }
  // Mark question as answered so it cant be used again
  alreadyAnswered = true;

  const selectedButton = e.target;
  const isCorrect = selectedButton.dataset.correct === "true";

  if (isCorrect === true) {
    score++;
  }

  // Color right answer green — even if you clicked wrong answer.
  Array.from(answerButtons.children).forEach((button) => {
    setStatus(button, button.dataset.correct === "true");
  });

  // Are there more questions left in the deck? Yes > Show next.
  if (currentQuestionIndex < shuffledQuestions.length - 1) {
    nextButton.classList.remove("hidden");
  } else {
    startButton.innerText = "Restart";
    startButton.classList.remove("hidden");
  }

  totalScore()
}

// Update score on dashboard

function totalScore() {
  scoreBoard.textContent = `${score} / ${shuffledQuestions.length} `;
}

// Clean UI

function setStatus(element, correct) {
  clearStatus(element);
  // If answer is correct change CSS to correct (color green) else incorrect (color red)
  element.classList.add(correct ? "correct" : "incorrect");
}

// Clears any CSS (color) from answer
function clearStatus(element) {
  element.classList.remove("correct");
  element.classList.remove("incorrect");
}

// Clears questions and answers from being displayed
function resetState() {
  // Hides next Button
  nextButton.classList.add("hidden");

  // Translation: while a first button exist or is TRUE then remove
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

// Answer shuffler function

function shuffleArray(array) {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

// Questions

const quizQuestions = [
  {
    question: "What is 1 + 1 = ?",
    options: [
      { text: "1", correct: false },
      { text: "2", correct: true },
      { text: "3", correct: false },
      { text: "4", correct: false },
    ],
  },

  {
    question: "What is 7 + 1 = ?",
    options: [
      { text: "1", correct: false },
      { text: "8", correct: true },
      { text: "7", correct: false },
      { text: "4", correct: false },
    ],
  },

  {
    question: "What is 2 + 2 = ?",
    options: [
      { text: "1", correct: false },
      { text: "2", correct: false },
      { text: "3", correct: false },
      { text: "4", correct: true },
    ],
  },

  {
    question: "What is 3 + 3 = ?",
    options: [
      { text: "1", correct: false },
      { text: "6", correct: true },
      { text: "3", correct: false },
      { text: "4", correct: false },
    ],
  },

  {
    question: "What is 6 + 3 = ?",
    options: [
      { text: "1", correct: false },
      { text: "9", correct: true },
      { text: "3", correct: false },
      { text: "4", correct: false },
    ],
  },

  {
    question: "What is 3 + 4 = ?",
    options: [
      { text: "1", correct: false },
      { text: "7", correct: true },
      { text: "3", correct: false },
      { text: "4", correct: false },
    ],
  },

  {
    question: "What is 8 + 3 = ?",
    options: [
      { text: "1", correct: false },
      { text: "11", correct: true },
      { text: "3", correct: false },
      { text: "4", correct: false },
    ],
  },

  {
    question: "What is 8 + 1 = ?",
    options: [
      { text: "1", correct: false },
      { text: "9", correct: true },
      { text: "3", correct: false },
      { text: "4", correct: false },
    ],
  },

  {
    question: "What is 4 + 8 = ?",
    options: [
      { text: "1", correct: false },
      { text: "12", correct: true },
      { text: "3", correct: false },
      { text: "4", correct: false },
    ],
  },

  {
    question: "What is 9 + 9 = ?",
    options: [
      { text: "1", correct: false },
      { text: "18", correct: true },
      { text: "3", correct: false },
      { text: "4", correct: false },
    ],
  },
];
