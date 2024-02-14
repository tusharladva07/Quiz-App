const questions = [
    {
        questions: "what is HTML",
        answers: [
            { text: "hyper", correct: false },
            { text: "text", correct: false },
            { text: "mark", correct: true },
            { text: "language", correct: false }
        ]
    },
    {
        questions: "what is HTML2",
        answers: [
            { text: "hyper", correct: true },
            { text: "text", correct: false },
            { text: "mark", correct: false },
            { text: "language", correct: false }
        ]
    },
    {
        questions: "what is HTML3",
        answers: [
            { text: "hyper", correct: false },
            { text: "text", correct: true },
            { text: "mark", correct: false },
            { text: "language", correct: false }
        ]
    },
    {
        questions: "what is HTML3",
        answers: [
            { text: "hyper", correct: false },
            { text: "text", correct: false },
            { text: "mark", correct: false },
            { text: "language", correct: true }
        ]
    },
]

const questionElement = document.getElementById("question");
const questionBar = document.getElementById("question-bar");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const Count = document.getElementById("CountQuestion");

let currentQuestionIndex = 0;
let score = 0;

function StartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();

}
function showQuestion() {
    resetState();
    Count.innerHTML = "Questions " + questions.length;
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + "." + currentQuestion.questions;
    questionBar.style.display = "flex";
    questionBar.style.alignItems = "center";
    Count.style.marginLeft = "auto";

    currentQuestion.answers.forEach(a => {
        const btn = document.createElement("button");
        btn.innerHTML = a.text;
        btn.classList.add("btn");
        answerButton.appendChild(btn);
        if (a.correct) {
            btn.dataset.correct = a.correct;
        }
        btn.addEventListener("click", myFunction);
    })
}
function resetState() {
    nextButton.style.display = "none";
    while (answerButton.firstChild) {
        answerButton.removeChild(answerButton.firstChild);
    }
}
function selectAnswer(e) {
    const selectBtn = e.target;
    console.log(e);
    const iscorrect = selectBtn.dataset.correct === "true";
    if (iscorrect) {
        selectBtn.classList.add("correct");
        score++;
    } else {
        selectBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = "true";
    });
    nextButton.style.display = "block";
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton()
    }
    else {
        StartQuiz();
    }
})
function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}
function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    }
    else {
        showScore();
    }
}
function myFunction(e) {
    if (confirm("Are You Sure!!") == true) {
        selectAnswer(e);
    }
}
StartQuiz();