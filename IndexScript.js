// script.js
window.addEventListener("DOMContentLoaded", () => {
	
  // Unlock quizzes if marked complete in localStorage
  if (localStorage.getItem("quiz1Complete") === "true") {
    completeQuiz(1);
  }
  if (localStorage.getItem("quiz2Complete") === "true") {
    completeQuiz(2);
  }
   if (localStorage.getItem("quiz3Complete") === "true") {
    completeQuiz(3);
  }
});

function completeQuiz(quizNumber) {
    const quizContainer = document.getElementById(`quiz${quizNumber}`).closest('div');
    const description = quizContainer.querySelector(".quiz-description span");

    if (quizContainer) {
        const quizElement = document.getElementById(`quiz${quizNumber}`);
        if (quizElement) {
            quizElement.classList.add("complete");
        }
        if (description) {
            description.classList.add("complete");
        }
    }

    // Unlock the next quiz if it exists
    const nextQuiz = document.getElementById(`quiz${quizNumber + 1}`);
    if (nextQuiz) {
        nextQuiz.classList.remove("locked");
        nextQuiz.style.pointerEvents = "auto";
        nextQuiz.style.cursor = "pointer";
		
    }
}

// Reset progress
document.getElementById("resetBtn")?.addEventListener("click", function () {
  if (confirm("Are you sure you want to reset your progress?")) {
    localStorage.clear();
    location.reload();
  }
});
