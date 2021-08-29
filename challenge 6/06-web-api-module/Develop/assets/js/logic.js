// variable to ref dom elements

var questionsEl = document.getElementById("questions");
var timerEl = document.getElementById("time");
var choiceEl = document.getElementById("choice");
var submitBtn = document.getElementById("submit");
var startBtn = document.getElementById("start");
var initialsEl = document.getElementById ("initials");
var feedbackEl = document.getElementById ("feedback");


// var to track
var currentQuestionIndex = 0;
var time = questions.length * 15
var timerId; 

// sound effects

var sfxRight = new Audio("assets/sfx/correct.wav");
var sfxWrong = new Audio("assets/sfx/incorrect.wav");




function startQuiz(){
// hide start screen
var startScreenEl = document.getElementById("start-screen");

startScreenEl.setAttribute("class", "hide");

//un-gide questions section
questionsEl.removeAttribute("hide");

// start timer 
timerId = setInterval(clockTick, 1000);

// show starting time
timerEl.textContent = time;


};

function clockTick() {
// update time
time--; // time = time -1;
timerEl.textContent =time;

// check if user ran out of time
if (time <= 0) {
    quizEnd();
}

};

function getQuestion() {
// get current question object from array
var currentQuestion = questions[currentQuestionIndex];

//update title with current question
var titleEl = document.getElementById("question-title");
titleEl.textContent = currentQuestion.title;

//clear out any old question choices
choiceEL.inner.HTML = ""

// loop over choices
currentQuestion.choices.forEach(function(choice,i) {
//create new button for each choice
var choiceNode = document.createAttribute("button");
choiceNode.setAttribute("class","choice");
choiceNode.setAttribute("value", choice);

choiceNode.textContent = i + 1 + ". " + choice;

//attach click event listener to each choice
choiceNode.onclick = questionClick;

//display on the page
choicesEL.appendChild(choiceNode);




});
}

function questionClick () {
//check if user guessed wrong 
if(this.value !== questions[currentQuestionIndex].answer) {
//penalize time
time -= 15;

if(time <0) {
    time =0;
}

// display new time on page
timerEl.textContent = time;

//play "wrong" sound effect
sfxWrong.play();

feedbackEl.textContent ="Wrong!";
}else {
// play "right" souiund effect
sfxRight.play();

feedbackEl.textContent = "Correct!";
}
// flash right/wrong feedback on page for half a second
feedbackEl.setAttribute("class", "feedback");
setTimeout(function() {
feedbackEl.setAttribute("class", "feedback hide");
}, 1000);

// move to next question 
currentQuestionIndex++;
//check if we've run of questions
if (currentQuestionIndex === questions.length) {
    quizEnd();
}else {
    getQuestion();
}
}

function quizEnd () {
    // stop timer
    clearInterval(timerId);

    // show end screen
    var endScreenEl = document.getElementById("end-screen");
    endScreenEl.removeAttribute("class");

    //show final score
    var finalScoreEl = document.getElementById("final-score");
    finalScoreEl.textContent = time;
    //hide questions section
    questionsEl.setAttribute("class", "hide");
}

function saveHighscore() {
// get value of input box
var initials = initialsEl.value.trim();

// make sure value wasn't empty
if (initials !== "") {
// get saved scores from localstorage, or if not any, set to empty array
var saveHighscore = 
JSON.parse(window.localStorage.getItem("highscores")) || [];

//format new score objec for current user
var newScore = {
score: time,
initials: initials

};

// save to localstorage
saveHighscore.push(newScore);
window.localStorage.setItem("highscores",JSON.stringify(highscore));

// redirect to next page
window.location.href = "highscores.html";
}
}

function checkforEnter(event) {
//"13" represents the enter key
if (event.key === "Enter") {
    saveHighscore();
}
}



//user clicks buttons to submit initials



// user click start button to start quiz
//startBtn.onclick
//startBtn.addEventListener("click", function (){
// hide start screen
//var startScreenEl = document.getElementById("start-screen");
//startScreenEl.setAttribute("class, hide");

//un-gide questions section
//questionsEl.removeAttribute("class");

// start timer 
//timerId = setInterval(clockTick, 1000);

// show starting time
//timerEl.textContent = time;

//getQuestion();
//};



// user clicks button to start quiz
startBtn.onclick = startQuiz();

submitBtn.onclick = saveHighscore;


















