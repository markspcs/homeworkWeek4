var todoInput = document.querySelector("#todo-text");
var todoForm = document.querySelector("#todo-form");
var todoList = document.querySelector("#todo-list");
var todoCountSpan = document.querySelector("#todo-count");
var gameBody = document.querySelector("#game-body");
var gameHeader = document.querySelector("#game-header");
var result = document.querySelector("#result");
var highScoreSpan = document.querySelector("#highScore");
var timer = Object.keys(questions).length * 15;
var clockTime;
var score = 0;

startPage();

/////////////////////////
function startPage() {
  console.log("this is start");
  gameHeader.textContent = "start game ";
  gameHeader.setAttribute("class", 'card game-question');
  const highScoreButton = document.createElement("button");
  highScoreButton.className = "highScore";
  highScoreButton.textContent = "Highscores";
  highScoreSpan.appendChild(highScoreButton);

  const button = document.createElement("button");
  
  button.setAttribute('value', "start");

  button.textContent = "start game";

  gameHeader.appendChild(button);

  document.addEventListener("click", function _listener(event) {
    event.preventDefault();
    console.log("event value " + event.toElement.value);
    let press = event.toElement.value;
    if (press.match("start")) {
      console.log("start game");
      document.removeEventListener("click", _listener);
      highScoreButton.remove();
      countdown();
      ask(0);
    } else {
    }

  });
}
//////////////////////////////
function endPage() {
  console.log("this is the end");
  clearInterval(clockTime);
  document.getElementById("countDownTimer").innerHTML = timer;
  gameHeader.innerHTML = '<h2>All done!</h2> Your final score is ' + timer;

  const scoreForm = document.createElement("FORM");
  gameHeader.appendChild(scoreForm);
  const nameLabel = document.createElement('label');
  nameLabel.innerHTML = "Enter Initials : ";
  scoreForm.appendChild(nameLabel);
  const scoreText = document.createElement('input');
  scoreText.type = 'text';
  scoreText.id = 'newScore';
  scoreForm.appendChild(scoreText);
  const scoreButton = document.createElement("button");
  scoreButton.textContent = "submit";
  scoreForm.appendChild(scoreButton);
  scoreButton.addEventListener('click', function (x) {
    x.preventDefault();
    setScores(x)
  });
  
}
////////////////////////////
function setScores(event) {
  var topScores = JSON.parse(localStorage.getItem("topScores"));

  if (topScores == null) { // initializes if never played and keeps to 5 scores
    topScores = {};
  }
  var userInitials = document.getElementById("newScore").value;
  console.log("score " + timer);
  console.log("event " + userInitials);
  topScores[userInitials] = timer;

  console.log(topScores);
  localStorage.setItem("topScores", JSON.stringify(topScores));
  highScores();
}
///////////////////////////////
function highScores() {
  console.log("this is the highScores");
  gameHeader.innerHTML = '<h2>Highscores</h2>';
  let topScores = JSON.parse(localStorage.getItem("topScores"));
  console.log(topScores);
  Object.keys(topScores).forEach(function (y) {
    console.log(y + " " + topScores[y]);
    let scoreDiv = document.createElement("div");
    scoreDiv.className = 'highScore';
    scoreDiv.textContent = y + " - " + topScores[y];
    gameHeader.appendChild(scoreDiv);
    // console.log(topScores.y);
  });
  const goBack = document.createElement("button");
  const clearScoreButton = document.createElement("button");

  goBack.textContent = "go back";
  clearScoreButton.textContent = "clear Highscores";
  gameHeader.appendChild(goBack);
  gameHeader.appendChild (document.createTextNode ("      "));
  gameHeader.appendChild(clearScoreButton);
  clearScoreButton.addEventListener('click', function (x) {
    x.preventDefault();
    emptyScores = {};
    localStorage.setItem("topScores", JSON.stringify(emptyScores));
    highScores()
  });
}
//////////////////////////////
function ask(questionNum) {
  if (questionNum < questions.length) {
    console.log("this is the question " + questionNum + " " + questions.length);
    questionObj = questions[questionNum];
    console.log(questionObj.title);
    gameHeader.textContent = questionObj.title;
    gameHeader.setAttribute("class", 'card game-question');

    //Loops through the choices
    for (let i = 0; i < questionObj.choices.length; i++) {
      const li = document.createElement("li");
      gameHeader.appendChild(li);
      const button = document.createElement("button");
      button.setAttribute('value', questionObj.choices[i]);
      button.textContent = questionObj.choices[i];
      li.appendChild(button);
    }
    document.addEventListener("click", function _listener(event) {
      event.preventDefault();
      //let pressedButton = 
      console.log("event value " + event.toElement.value);
      let press = event.toElement.value;
      console.log("answer " + questionObj.answer);

      if (press.match(questionObj.answer)) {
        console.log("is correct");
        rightWrong("correct");
        score = score + 1;
      } else {
        timer = timer - 15;
        console.log("incorrect " + timer);
        rightWrong("wrong");

      }
      document.removeEventListener("click", _listener);
      ask(questionNum + 1);
    });

  }
  else {
    console.log("finished");
    timer = ((timer < 1) ? 0 : timer);
    gameHeader.textContent = "finished score " + timer;
    endPage();

  }
}
/////////////////////////
function rightWrong(ans) {
  var removeResult = document.getElementById('answer');
  if (removeResult) {
    removeResult.remove();
  }
  var div;
  div = document.createElement("div")
  result.appendChild(div);
  div.innerHTML = '<hr> <p id="answer" >' + ans + '</p>';

  setTimeout(function () {
    div.remove();
  }, 1000);


}

function countdown() {
  clockTime = setInterval(function () {
    // Get today's date and time
    timer--;
    var timeRemaining = timer - 1;
    // Display the result in the element with id="demo"
    document.getElementById("countDownTimer").innerHTML = "Timer " + timer;
    // If the count down is finished, write some text
    if (timer < 1) {
      clearInterval(clockTime);
      document.getElementById("countDownTimer").innerHTML = "EXPIRED";
      endPage();
    }
  }, 1000);
}
