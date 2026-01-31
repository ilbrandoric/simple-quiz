// === Constant ===

// Targets the start button & call the startGame function on click

const startButton = document.getElementById("start-button");
startButton.addEventListener("click", startGame);

const nextButton = document.getElementById("next-button");
nextButton.addEventListener("click", () => {
  selectNext();
});

// Targets html

const questionContainerElement = document.getElementById("question-container");
const questionElement = questionContainerElement;

const answerButtonelement = document.getElementById("answer-buttons");
const answerElement = answerButtonelement;

// Suffler array and index

let shuffledQuestions = [];
let currentQuestionIndex = 0;

// ===== Control ====

// Start the game function

function startGame() {
  console.log("Quiz started ...");
  startButton.classList.add("hidden");
  questionContainerElement.classList.remove("hidden");

  answerButtonelement.classList.remove("hidden");

  shuffledQuestions = quizQuestions.sort(() => Math.random() - 0.5);
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct === "true";
  setStatusClass(document.body, correct);
  Array.from(answerButtonelement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct === "true");
  });
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hidden");
  } else {
    startButton.innerText = "Restart";
    startButton.classList.remove("hidden");
    nextButton.classList.add("hidden");
  }
}

function setStatusClass(element, correct) {
  clearStatusclass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("incorrect");
  }
}

function clearStatusclass(element) {
  element.classList.remove("correct");
  element.classList.remove("incorrect");
}

function selectNext() {
  if (currentQuestionIndex + 1 < shuffledQuestions.length) {
    currentQuestionIndex++;
    showQuestion(shuffledQuestions[currentQuestionIndex]);
  }
}

function showQuestion(quizQuestions) {
  resetState();

  questionElement.innerText = quizQuestions.question;

  quizQuestions.options.forEach((option) => {
    const button = document.createElement("button");
    button.innerText = option.text;
    button.classList.add("btn");

    button.dataset.correct = option.correct;

    button.addEventListener("click", selectAnswer);
    answerButtonelement.appendChild(button);
  });
}

function resetState() {
  nextButton.classList.add("hidden");
  while (answerButtonelement.firstChild) {
    answerButtonelement.removeChild(answerButtonelement.firstChild);
  }
}

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
