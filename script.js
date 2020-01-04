var todoInput = document.querySelector("#todo-text");
var todoForm = document.querySelector("#todo-form");
var todoList = document.querySelector("#todo-list");
var todoCountSpan = document.querySelector("#todo-count");
var gameBody = document.querySelector("#game-body");
var gameHeader = document.querySelector("#game-header");
var result = document.querySelector("#result");
//var countdownTimer = document.querySelector("#countDownTimer");
var timer = 30;
var clockTime;
var score = 0;
var questions = [
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
    title: "The question ____.",
    choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
    answer: "parentheses"
  },
  ///etc.
];
var topScores = [0, 0, 0, 0, 0]

questionNum = 0;

startPage();

/////////////////////////
function startPage() {
  console.log("this is start");
  gameHeader.textContent = "start game";
  gameHeader.setAttribute("class", 'card game-question');
  const button = document.createElement("button");
  button.setAttribute('value', "start");

  button.textContent = "start game";

  gameHeader.appendChild(button);

  document.addEventListener("click", function _listener(event) {
    event.preventDefault();
    //let pressedButton = 
    console.log("event value " + event.toElement.value);
    let press = event.toElement.value;
    if (press.match("start")) {
      console.log("start game");
      document.removeEventListener("click", _listener);
      countdown();
      ask(0);
    } else {
      // console.log("incorrect");
      // //score = 0;
      // timer = timer - 5;
    }

    // ask(questionNum + 1);
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
  //scoreText.value = timer;
  scoreForm.appendChild(scoreText);
  const scoreButton = document.createElement("button");
  //scoreButton.setAttribute('value', timer);
  scoreButton.textContent = "submit";
  scoreForm.appendChild(scoreButton);
  //scoreForm.submit();
  scoreButton.addEventListener('click', function (x) {
    x.preventDefault();
  setScores(x)
  });
  // setScores(timer);
}
////////////////////////////
function setScores(event) {
  var storedScores = JSON.parse(localStorage.getItem("topScores"));
  if (storedScores == null) { // initializes if never played and keeps to 5 scores
    storedScores = [0, 0, 0, 0, 0]
  }
  var userInitials = document.getElementById("newScore").value;
  console.log("score " + timer);
  console.log("event "   + userInitials);
  for (let i = 0; i < 5; i++) {
    // if (i === 4) {
    //   storedScores[i] =score;
    //   console.log("default score");
    // }
    // else 
    if (score > storedScores[i]) {
      storedScores.push(score);
      break;
      //storedScores[i] = score;
    }
    else {
      storedScores.push(score);
      console.log("High Score " + i);
      break;
    }
  }
  let sortScores = storedScores.sort(function (a, b) { return a - b });
  sortScores.shift();
  localStorage.setItem("topScores", JSON.stringify(sortScores));
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
        timer = timer - 10;
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
  //result.textContent = ans;

  setTimeout(function () {
    div.remove();
  }, 1000);


}
///////////////
// function askQ() {
//   var i = 0;
//   // for (let i = 0; i < questions.length; i++) {
//   var timer1 = setInterval(function () {
//     var lisuestions = "this is the question";

//     console.log(i);
//     questionObj = questions[i];
//     console.log(questionObj.title);
//     gameHeader.textContent = questionObj.title;
//     gameHeader.setAttribute("class", 'card game-question');

//     //todos.forEach(function (todo, idx, todos) {
//     //const li = document.createElement("li");
//     for (let i = 0; i < questionObj.choices.length; i++) {
//       const button = document.createElement("button");
//       button.setAttribute('value', questionObj.choices[i]);

//       button.textContent = questionObj.choices[i];

//       gameHeader.appendChild(button);
//       document.addEventListener("click", function (event) {
//         event.preventDefault();
//         //let pressedButton = 
//         console.log(event.toElement.value);
//         let press = event.toElement.value;
//         console.log(questionObj.answer);
//         if (press.match(questionObj.answer)) {
//           console.log("is correct");
//           score = 1;
//         } else {
//           console.log("incorrect");
//           score = 0;
//         }

//       });

//       //li.appendChild(button);

//     }
//     if (timer < 3) {
//       clearInterval(timer1);
//     }
//     console.log("timer" + timer);
//     i++;
//   }, 2000);
// }
//}
//////////////////////////////
// function answerResult() {
//   console.log("here");
// }

///////////////////////////////////////////////////////////////////////////
// function askQuestions(questionObj) {
//   var lisuestions = "this is the question";
//   let score;
//   console.log(questionObj.title);
//   gameHeader.textContent = questionObj.title;
//   gameHeader.setAttribute("class", 'card game-question');

//   //todos.forEach(function (todo, idx, todos) {
//   //const li = document.createElement("li");
//   for (let i = 0; i < questionObj.choices.length; i++) {
//     const button = document.createElement("button");
//     button.setAttribute('value', questionObj.choices[i]);

//     button.textContent = questionObj.choices[i];

//     gameHeader.appendChild(button);
//     document.addEventListener("click", function (event) {
//       event.preventDefault();
//       //let pressedButton = 
//       console.log(event.toElement.value);
//       let press = event.toElement.value;
//       console.log(questionObj.answer);
//       if (press.match(questionObj.answer)) {
//         console.log("is correct");
//         score = 1;
//       } else {
//         console.log("incorrect");
//         score = 0;
//         timer = timer - 10;
//       }

//     });

//     //li.appendChild(button);

//   }
// }
function countdown() {

  clockTime = setInterval(function () {

    // Get today's date and time
    timer--;
    var timeRemaining = timer - 1;



    // Display the result in the element with id="demo"
    document.getElementById("countDownTimer").innerHTML = timer;

    // If the count down is finished, write some text
    if (timer < 1) {
      clearInterval(clockTime);
      document.getElementById("countDownTimer").innerHTML = "EXPIRED";
      endPage();
    }
  }, 1000);
}

// var todos = ["Learn HTML", "Learn CSS", "Learn JavaScript"];


// renderTodos();






// function renderTodos(event) {
//   //todos.push(event.textContent);
//   // Clear todoList element and update todoCountSpan
//   // todoList.innerHTML = "";
//   // todoCountSpan.textContent = todos.length;

//   // Render a new li for each todo
//   // todos.forEach(function (todo, idx, todos) {
//   //   const li = document.createElement("li");
//   //   li.textContent = todo;

//   //   todoList.appendChild(li);
//   //   li.setAttribute("data-index", idx);
//   //   li.setAttribute("date-value", todo);

//   //   const button = document.createElement("button");
//   //   button.textContent = "complete";
//   //   li.appendChild(button);


//   // }
//   // );
//   //localStorage.setItem("store", todos);
// }
// function init() {
//   var storeditems = JSON.parse(localStorage.getItem("todos"));
//   // if(storeditems.length && storedTodos){
//   //   todos = storeditems;
//   // }
// }

// todoForm.addEventListener("submit", function (event) {
//   event.preventDefault();
//   var todo = todoInput.value.trim();
//   console.log(todo);
//   if (todo === "") {
//     return false;
//   }
//   todos.push(todo);
//   localStorage.setItem("todos", JSON.stringify(todos));
//   renderTodos();
// }
// );
// todoList.addEventListener("click", function (event) {
//   var el = event.target;
//   if (el.matches("button")) {
//     var idx = el.parentElement.getAttribute("data-index");
//     todos.splice(idx, 1);
//     localStorage.setItem("todos", JSON.stringify(["todas", "tadas"]));
//     renderTodos();
//   }
// });

// init();