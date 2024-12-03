// Your question data
const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

// Initialize the user's answers from session storage
let userAnswers = JSON.parse(sessionStorage.getItem("userAnswers")) || [];

// Function to render questions and choices
function renderQuestions() {
  const questionsElement = document.getElementById("questions");
  questionsElement.innerHTML = ""; // Clear any previous content

  questions.forEach((question, i) => {
    const questionElement = document.createElement("div");
    questionElement.classList.add("question");

    const questionText = document.createTextNode(question.question);
    questionElement.appendChild(questionText);

    question.choices.forEach((choice) => {
      const choiceElement = document.createElement("input");
      choiceElement.setAttribute("type", "radio");
      choiceElement.setAttribute("name", `question-${i}`);
      choiceElement.setAttribute("value", choice);

      // Check if the answer is saved
      if (userAnswers[i] === choice) {
        choiceElement.setAttribute("checked", true);
      }

      const choiceLabel = document.createElement("label");
      choiceLabel.appendChild(choiceElement);
      choiceLabel.appendChild(document.createTextNode(choice));

      questionElement.appendChild(choiceLabel);
    });

    questionsElement.appendChild(questionElement);
  });
}

// Function to save user's progress
function saveProgress() {
  const questionElements = document.querySelectorAll("input[type='radio']:checked");
  userAnswers = [];
  questionElements.forEach((input) => {
    const questionIndex = input.name.split("-")[1];
    userAnswers[questionIndex] = input.value;
  });
  sessionStorage.setItem("userAnswers", JSON.stringify(userAnswers));
}

// Function to calculate the score
function calculateScore() {
  let score = 0;
  questions.forEach((question, i) => {
    if (userAnswers[i] === question.answer) {
      score++;
    }
  });
  return score;
}

// Function to display the score
function displayScore() {
  const score = calculateScore();
  const scoreElement = document.getElementById("score");
  scoreElement.textContent = `Your score is ${score} out of ${questions.length}.`;

  // Save the score in local storage
  localStorage.setItem("score", score);
}

// Event listener for saving progress whenever the user changes an answer
document.getElementById("questions").addEventListener("change", saveProgress);

// Event listener for submitting the quiz
document.getElementById("submit").addEventListener("click", displayScore);

// Render questions on page load
renderQuestions();

// Optionally, show previously saved score on page reload
const savedScore = localStorage.getItem("score");
if (savedScore !== null) {
  document.getElementById("score").textContent = `Your last score was ${savedScore}.`;
}
