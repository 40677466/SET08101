// Function to go to the home page without clearing progress
function goHome() {
    window.location.href = "index.html"; // Redirect to the home page
}

// Function to restart the quiz
function restartQuiz() {
    localStorage.clear(); // Clears all stored quiz data
    window.location.href = "q1.html"; // Redirect to the first question
}

// Store correct answers for each question
const correctAnswers = {
    1: 'C', // Paris
    2: 'C', // Pacific Ocean
    3: 'A', // William Shakespeare
    4: 'A', // Oxygen
    5: 'C', // 8
    6: 'C', // Tokyo
    7: 'A', // Neil Armstrong
    8: 'B'  // Mars
};

// Function to handle answer selection
function selectAnswer(questionNumber, selectedOption) {
    let score = localStorage.getItem("quizScore") ? parseInt(localStorage.getItem("quizScore")) : 0;
    let userAnswers = JSON.parse(localStorage.getItem("userAnswers")) || {};

    // Store the selected answer for this question
    userAnswers[questionNumber] = selectedOption;
    localStorage.setItem("userAnswers", JSON.stringify(userAnswers));

    // Check if the answer is correct and update score
    if (selectedOption === correctAnswers[questionNumber]) {
        if (!localStorage.getItem(`scored_${questionNumber}`)) {
            score++;
            localStorage.setItem("quizScore", score);
            localStorage.setItem(`scored_${questionNumber}`, "true"); // Mark as scored to prevent duplicate scoring
        }
    }

    // Redirect to the next question
    let nextQuestion = questionNumber + 1;
    if (nextQuestion <= Object.keys(correctAnswers).length) {
        window.location.href = `q${nextQuestion}.html`;
    } else {
        window.location.href = "Quiz1results.html"; // Redirect to updated results page
    }
}

// Function to display quiz results
function displayResults() {
    let score = localStorage.getItem("quizScore") ? parseInt(localStorage.getItem("quizScore")) : 0;
    console.log('Score:', score);  // Check the score value
    let totalQuestions = Object.keys(correctAnswers).length;
    let userAnswers = JSON.parse(localStorage.getItem("userAnswers")) || {};
    console.log('User Answers:', userAnswers);  // Check user answers

    // Display the score
    document.getElementById("score").innerText = `Your Score: ${score} / ${totalQuestions}`;

    // Display correct answers and user-selected answers
    let answersList = document.getElementById("answers-list");
    answersList.innerHTML = ""; 

    for (let question in correctAnswers) {
        let listItem = document.createElement("li");
        let userAnswer = userAnswers[question] || "Not answered";
        let isCorrect = userAnswer === correctAnswers[question] ? "correct" : "incorrect";

        listItem.innerText = `Question ${question}: Correct Answer: ${correctAnswers[question]} | Your Answer: ${userAnswer} ${isCorrect}`;
        answersList.appendChild(listItem);
    }
}

// Call displayResults when on results page
if (window.location.pathname.includes("Quiz1results.html")) {
    displayResults();
}

