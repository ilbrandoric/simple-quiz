// Targeting DOM elements

const startButton = document.getElementById("start-button");
const nextButton = document.getElementById("next-button");

const questionContainer = document.getElementById("question-container");
const answerButtons = document.getElementById("answer-buttons");

const scoreBoard = document.getElementById("scoreboard-container");

const timerElement = document.getElementById("timer-container");

// STATE (what situation is the program currently in?)

let shuffledQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let alreadyAnswered = false;
let timeRemaining = 0;
let timerId = null;

// Start / Restart buttons

questionContainer.innerHTML = `
  <strong>Quizzy</strong><br><br>
  You have <em>60 seconds</em> to answer 10 random questions. 
  Please press Start to begin
`;

startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", showNextQuestion);

// Game flow

function startGame() {
  // Hides start button once game starts
  startButton.classList.add("hidden");

  // Unhides scoreboard, timer, question & answer buttons
  answerButtons.classList.remove("hidden");
  document.querySelector(".hud").classList.remove("hidden");

  timeRemaining = 60;
  timerElement.classList.remove("hidden");
  timerElement.innerHTML = "1:00";
  timerId = setInterval(function () {
    timeRemaining--;
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    timerElement.innerHTML = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`; //ensures the seconds always display with two digits.
    if (timeRemaining <= 0) {
      clearInterval(timerId);
      endGame("time-out");
    }
  }, 1000);

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

  // Are there more questions left in the deck? Yes > Show next else end game
  if (currentQuestionIndex < shuffledQuestions.length - 1) {
    nextButton.classList.remove("hidden");
  } else {
    endGame();
  }

  totalScore();
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

function endGame(reason) {
  resetState();

  if (timerId !== null) {
    clearInterval(timerId);
    timerId = null;
  }

  if (reason === "time-out") {
    questionContainer.innerHTML = `
      <strong>Your time is up!</strong><br>
      Please restart to try again.
    `;
  } else {
    questionContainer.innerHTML = `
      <strong>Question deck complete!</strong><br>
      Please restart to play again.
    `;
  }

  startButton.innerText = "Restart";
  startButton.classList.remove("hidden");
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
