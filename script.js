var todoInput = document.querySelector("#todo-text");
var todoForm = document.querySelector("#todo-form");
var todoList = document.querySelector("#todo-list");
var todoCountSpan = document.querySelector("#todo-count");
var gameBody = document.querySelector("#game-body");
var gameHeader = document.querySelector("#game-header");
//var countdownTimer = document.querySelector("#countDownTimer");
var timer = 30;
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
  ///etc.
];

countdown();
questionNum = 0;

//for (let i = 0; i < questions.length; i++) {
//setInterval(askQuestions(questions[i]),10000);
//askQ(questions[i]);
//}
//askQ()

ask(questionNum);
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
    const button = document.createElement("button");
    button.setAttribute('value', questionObj.choices[i]);

    button.textContent = questionObj.choices[i];

    gameHeader.appendChild(button);
  }
  document.addEventListener("click", function _listener(event) {
    event.preventDefault();
    //let pressedButton = 
    console.log("event value " + event.toElement.value);
    let press = event.toElement.value;
    console.log("answer " + questionObj.answer);

    if (press.match(questionObj.answer)) {
      console.log("is correct");
      score = score + 1 ;
    } else {
      console.log("incorrect");
      //score = 0;
      timer = timer - 5;
    }
    document.removeEventListener("click", _listener);
    ask(questionNum + 1);
  });

} 
else {
  console.log("finished");
  gameHeader.textContent = "finished score " + score;

}
  //li.appendChild(button);



}
///////////////
function askQ() {
  var i = 0;
  // for (let i = 0; i < questions.length; i++) {
  var timer1 = setInterval(function () {
    var lisuestions = "this is the question";

    console.log(i);
    questionObj = questions[i];
    console.log(questionObj.title);
    gameHeader.textContent = questionObj.title;
    gameHeader.setAttribute("class", 'card game-question');

    //todos.forEach(function (todo, idx, todos) {
    //const li = document.createElement("li");
    for (let i = 0; i < questionObj.choices.length; i++) {
      const button = document.createElement("button");
      button.setAttribute('value', questionObj.choices[i]);

      button.textContent = questionObj.choices[i];

      gameHeader.appendChild(button);
      document.addEventListener("click", function (event) {
        event.preventDefault();
        //let pressedButton = 
        console.log(event.toElement.value);
        let press = event.toElement.value;
        console.log(questionObj.answer);
        if (press.match(questionObj.answer)) {
          console.log("is correct");
          score = 1;
        } else {
          console.log("incorrect");
          score = 0;
        }

      });

      //li.appendChild(button);

    }
    if (timer < 3) {
      clearInterval(timer1);
    }
    console.log("timer" + timer);
    i++;
  }, 2000);
}
//}
//////////////////////////////
function answerResult() {
  console.log("here");
}

///////////////////////////////////////////////////////////////////////////
function askQuestions(questionObj) {
  var lisuestions = "this is the question";
  let score;
  console.log(questionObj.title);
  gameHeader.textContent = questionObj.title;
  gameHeader.setAttribute("class", 'card game-question');

  //todos.forEach(function (todo, idx, todos) {
  //const li = document.createElement("li");
  for (let i = 0; i < questionObj.choices.length; i++) {
    const button = document.createElement("button");
    button.setAttribute('value', questionObj.choices[i]);

    button.textContent = questionObj.choices[i];

    gameHeader.appendChild(button);
    document.addEventListener("click", function (event) {
      event.preventDefault();
      //let pressedButton = 
      console.log(event.toElement.value);
      let press = event.toElement.value;
      console.log(questionObj.answer);
      if (press.match(questionObj.answer)) {
        console.log("is correct");
        score = 1;
      } else {
        console.log("incorrect");
        score = 0;
        timer = timer - 10;
      }

    });

    //li.appendChild(button);

  }
}
function countdown() {

  var x = setInterval(function () {

    // Get today's date and time
    timer--;
    var timeRemaining = timer - 1;



    // Display the result in the element with id="demo"
    document.getElementById("countDownTimer").innerHTML = timer + "s ";

    // If the count down is finished, write some text
    if (timer < 1) {
      clearInterval(x);
      document.getElementById("countDownTimer").innerHTML = "EXPIRED";
    }
  }, 1000);
}

var todos = ["Learn HTML", "Learn CSS", "Learn JavaScript"];


renderTodos();






function renderTodos(event) {
  //todos.push(event.textContent);
  // Clear todoList element and update todoCountSpan
  todoList.innerHTML = "";
  todoCountSpan.textContent = todos.length;

  // Render a new li for each todo
  todos.forEach(function (todo, idx, todos) {
    const li = document.createElement("li");
    li.textContent = todo;

    todoList.appendChild(li);
    li.setAttribute("data-index", idx);
    li.setAttribute("date-value", todo);

    const button = document.createElement("button");
    button.textContent = "complete";
    li.appendChild(button);


  }
  );
  //localStorage.setItem("store", todos);
}
function init() {
  var storeditems = JSON.parse(localStorage.getItem("todos"));
  // if(storeditems.length && storedTodos){
  //   todos = storeditems;
  // }
}

todoForm.addEventListener("submit", function (event) {
  event.preventDefault();
  var todo = todoInput.value.trim();
  console.log(todo);
  if (todo === "") {
    return false;
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
  renderTodos();
}
);
todoList.addEventListener("click", function (event) {
  var el = event.target;
  if (el.matches("button")) {
    var idx = el.parentElement.getAttribute("data-index");
    todos.splice(idx, 1);
    localStorage.setItem("todos", JSON.stringify("todos"));
    renderTodos();
  }
});

init();