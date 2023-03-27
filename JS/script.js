var timerEl = document.querySelector("#time");
var choicesEl = document.querySelector("#choices");
var startBtn = document.querySelector("#start");
var submitBtn = document.querySelector("#submit");
var initalsEl = document.querySelector("#initials");
var feedbackEl = document.querySelector("#feedback");
var questionEl = document.querySelector('#questions')
var currentQuestionIndex = 0;
var timerId;

const questions = [
    {
        title: "Commonly used data types DO NOT include:",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts"
    },

    {
        title: "The condition in an if / else statement is enclosed within ____.",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "parentheses"
    },

    {
        title: "Arrays in JavaScript can be used to store ____.",
        choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        answer: "all of the above"
    },

    {
        title: "String values must be enclosed within ____ when being assigned to variables.",
        choices: ["commas", "curly brackets", "quotes", "parentheses"],
        answer: "quotes"
    },

    {
        title: "A very useful tool used during development and debugging for printing content to the debugger is:",
        choices: ["JavaScript", "terminal / bash", "for loops", "console.log"],
        answer: "console.log"
    },
];

var time = questions.length * 10;

function startQuiz() {
    var startScreenEl = document.getElementById("start-screen");
    startScreenEl.setAttribute("class", "hide");

    questionEl.removeAttribute("class");

    timerId = setInterval(clockTick, 1000);

    timerEl.textContent = time;

    getQuestions();
};

function getQuestions(){
    var currentQuestion = questions[currentQuestionIndex];

    var titleEl = document.getElementById("question-title");
    titleEl.textContent = currentQuestion.title;

    choicesEl.innerHTML= "";

    currentQuestion.choices.forEach(function(choice, i) {
        var choiceNode = document.createElement("button");
        choiceNode.setAttribute("class", "choice");
        choiceNode.setAttribute("value", choice);

        choiceNode.textContent = i + 1 + ". " + choice;

        choiceNode.onclick = questionClick;

        choicesEl.appendChild(choiceNode);
    });
};

function questionClick() {
    console.log('check answer.');
    if (this.value !== questions[currentQuestionIndex].answer) {
        time -= 15;

        if (time < 0){
            time = 0;
        }
        timerEl.textContent = time;
        feedbackEl.textContent = 'Wrong';
    } else {
        feedbackEl.textContent = 'Correct';
    };

    feedbackEl.setAttribute('class', 'feedback');
    setTimeout(function() {
        feedbackEl.setAttribute('class', 'feedback hide');
    }, 1000);

    currentQuestionIndex++;

    setTimeout(function() {    if (currentQuestionIndex === questions.length) {
        quizEnd();
    } else {
        getQuestions();
    };}, 1500)

}

function quizEnd() {
    clearInterval(timerId);

    let endScreenEL = document.getElementById('end-screen');
    endScreenEL.removeAttribute('class')

    let finalScoreEL = document.getElementById('final-score');
    finalScoreEL.textContent = time;

    questionsEl.setAttribute('class', 'hide');
};

function clockTick(){
    time--;
    timerEl.textContent = time;

    if(time <= 0){
        quizEnd();
    };
}

startBtn.addEventListener('click', startQuiz);


