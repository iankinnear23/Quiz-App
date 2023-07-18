// THIS IS AN ARRAY WITH OBJECTS INSIDE THE ARRAY
// INSIDE EACH OBJECT THERE 2 PROPERTIES - QUESTIONS: AND ANSWERS:
// INSIDE THE SECOND PROPERTY THERE IS ANOTHER ARRAY
//INSIDE THE NEW ARRAY IS 4 OBJECTS
//INSIDE THE 4 OBJECTS ARE 2 PROPERIES
// THE TEXT: PROPERTY HOLDS THE TEST OF THE ANSWER
// THE CORRECT: PROPERTY IS A BOOLEAN INDICATING WEATHER THE ANSWER IS TRUE OR FALSE

//STEPS TAKEN
//1 - CREATE VARIABLE
//2 SET VARIABEL = ARRAY
//3 INSERT {} OBJECT
//4 INSERT 2 PROPERTIES - QUESTIONS: + ANSWERS:
//5 GIVE THE PROPERTIES THERE VALUES
//6 GIVE THE SECOND PROPERTY AN ARRAY OF ANSWERS
//6 THE ANSWERS ARE OBJECTS WHITIN THE ARRAY
//7 THE OBJECTS WILL NOW HAVE 2 MORE NEW PROPERTIES
//8 GIVE THE PROPERTIES THERE VALUES
const questions = [
  {
    question: "Which is the largest animal in the world",
    answers: [
      { text: "Shark", correct: false },
      { text: "Blue whale", correct: true },
      { text: "Elephant", correct: false },
      { text: "Giraffe", correct: false },
    ],
  },
  {
    question: "Which is the largest continent in the world",
    answers: [
      { text: "Kalahari", correct: false },
      { text: "Gobi", correct: false },
      { text: "Sahara", correct: false },
      { text: "Antarctica", correct: true },
    ],
  },
  {
    question: "Which is the smallest continent in the world",
    answers: [
      { text: "Asia", correct: false },
      { text: "Australia", correct: true },
      { text: "Arctic", correct: false },
      { text: "Africa", correct: false },
    ],
  },
  {
    question: "Which is the smallest country in the world",
    answers: [
      { text: "Vatican City", correct: true },
      { text: "Bhutan", correct: false },
      { text: "Nepal", correct: false },
      { text: "Shiri Lanka", correct: false },
    ],
  },
];

// THE VARIABLES BELOW ARE = THE ELEMENTS WITHIN THE HTML PAGE
// THE DOCUMENT.GETELEMENTBYID ("QUESTION") WILL SEARCH THE HTML PAGE FOR ANY IDS THAT ARE CALLED QUESTION
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerHTML = `You Scored  ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Play Again";
  next.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
