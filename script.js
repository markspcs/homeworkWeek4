var todoInput = document.querySelector("#todo-text");
var todoForm = document.querySelector("#todo-form");
var todoList = document.querySelector("#todo-list");
var todoCountSpan = document.querySelector("#todo-count");
var gameBody = document.querySelector("#game-body");
var gameHeader = document.querySelector("#game-header");


questions();

function questions(){
  var listOfQuestions = "this is the question";
  gameHeader.textContent = listOfQuestions;
  gameHeader.setAttribute("class", 'card game-question');

}

var todos = ["Learn HTML", "Learn CSS", "Learn JavaScript"];


renderTodos();



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


function renderTodos(event) {
  //todos.push(event.textContent);
  // Clear todoList element and update todoCountSpan
  todoList.innerHTML = "";
  todoCountSpan.textContent = todos.length;

  // Render a new li for each todo
  todos.forEach(function(todo, idx, todos){
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
  if(storeditems.length && storedTodos){
    todos = storeditems;
  }
}

todoForm.addEventListener("submit", function(event) {
  event.preventDefault();
  var todo = todoInput.value.trim();
  console.log(todo);
  if(todo === ""){
    return false;
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
  renderTodos();
}
);
todoList.addEventListener("click", function(event){
  var el = event.target;
  if(el.matches("button")) {
    var idx = el.parentElement.getAttribute("data-index");
    todos.splice(idx, 1);
    localStorage.setItem("todos", JSON.stringify("todos"));
    renderTodos();
  }
});

init();