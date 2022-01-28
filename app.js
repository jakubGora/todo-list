const todoInputNum = document.querySelector(".todo-number");

const todoInputTitle = document.querySelector(".todo-input-title");
const todoInputDesc = document.querySelector(".todo-input-desc");
const todoInputAdd = document.querySelector(".todo-button");

const todoList = document.querySelector(".todo-container");
const filterTodo = document.querySelector(".filter-todo");

var localTodosTitles = new Array();
var localTodosDescriptions = new Array();
var localTodosIsCompleted = new Array();

const kolory = [
  "#a157ea",
  "#ef5980",
  "#a6f35a",
  "#5ccdf7",
  "#cb7c91",
  "#fb5e28",
  "#c60275",
  "#deda3e",
];

todoInputAdd.addEventListener("click", function (event) {
  event.preventDefault();
  addTodo(todoInputTitle, todoInputDesc);
});

todoList.addEventListener("click", deleteCheck);

filterTodo.addEventListener("click", filterFun);

function addTodo(_title, _desc) {
  localTodosTitles.push(_title.value);
  localTodosDescriptions.push(_desc.value);
  localTodosIsCompleted.push(false);

  localStorage.setItem("titles", JSON.stringify(localTodosTitles));
  localStorage.setItem("descriptions", JSON.stringify(localTodosDescriptions));
  localStorage.setItem("isCompleteds", JSON.stringify(localTodosIsCompleted));

  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  todoList.appendChild(todoDiv);

  const kolor = kolory[getRandomInt(0, kolory.length)];

  todoDiv.style.backgroundColor = kolor;
  todoDiv.style.transform = "rotate(" + getRandomInt(-10, 10) + "deg)";

  const newTitle = document.createElement("h2");
  newTitle.classList.add("todo-title");
  todoDiv.appendChild(newTitle);

  newTitle.innerText = localTodosTitles.length + ". " + _title.value;

  const newDesc = document.createElement("p");
  newDesc.classList.add("todo-description");
  newDesc.innerText = _desc.value;
  todoDiv.appendChild(newDesc);

  const newbtnAdd = document.createElement("button");
  const newbtnRmv = document.createElement("button");

  newbtnAdd.classList.add("accept");
  newbtnRmv.classList.add("rmv");

  const mag = document.createElement("div");
  mag.classList.add("circle");
  mag.style.backgroundColor = kolory[getRandomInt(0, kolory.length)];

  todoDiv.appendChild(mag);

  const newbtnAddImg = document.createElement("img");
  const newbtnRmvImg = document.createElement("img");

  newbtnAddImg.src = "/img/done_outline_white_24dp.svg";
  newbtnAdd.appendChild(newbtnAddImg);
  newbtnRmvImg.src = "/img/remove_white_24dp.svg";
  newbtnRmv.appendChild(newbtnRmvImg);

  todoDiv.appendChild(newbtnAdd);
  todoDiv.appendChild(newbtnRmv);

  todoInputTitle.value = "";
  todoInputDesc.value = "";
  filterFun();
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function deleteCheck(e) {
  const item = e.target;

  if (item.classList[0] === "accept") {
    item.parentElement.classList.add("completed");
    const childs = item.parentElement.childNodes;

    for (let child of childs) {
      if (child.tagName == "H2") {
        console.log(parseInt(child.innerText) - 1);
        localTodosIsCompleted[parseInt(child.innerText) - 1] = true;
      }
      if (child.tagName == "BUTTON") {
        child.remove();
      }
    }
  } else if (item.parentElement.classList[0] === "accept") {
    item.parentElement.parentElement.classList.add("completed");
    const childs = item.parentElement.parentElement.childNodes;
    for (let child of childs) {
      if (child.tagName == "H2") {
        console.log(parseInt(child.innerText) - 1);
        localTodosIsCompleted[parseInt(child.innerText) - 1] = true;
      }
      if (child.tagName == "BUTTON") {
        child.remove();
      }
    }
  } else if (item.classList[0] === "rmv") {
    item.parentElement.remove();
    const childs = item.parentElement.childNodes;
    for (let child of childs) {
      if (child.tagName == "H2") {
        localTodosTitles.splice(parseInt(child.innerText) - 1, 1);
        localTodosDescriptions.splice(parseInt(child.innerText) - 1, 1);
        localTodosIsCompleted.splice(parseInt(child.innerText) - 1, 1);
      }
    }
  } else if (item.parentElement.classList[0] === "rmv") {
    item.parentElement.parentElement.remove();
    const childs = item.parentElement.parentElement.childNodes;
    for (let child of childs) {
      if (child.tagName == "H2") {
        localTodosTitles.splice(parseInt(child.innerText) - 1, 1);
        localTodosDescriptions.splice(parseInt(child.innerText) - 1, 1);
        localTodosIsCompleted.splice(parseInt(child.innerText) - 1, 1);
      }
    }
  }
  localStorage.setItem("titles", JSON.stringify(localTodosTitles));
  localStorage.setItem("descriptions", JSON.stringify(localTodosDescriptions));
  localStorage.setItem("isCompleteds", JSON.stringify(localTodosIsCompleted));
}

function filterFun() {
  const todos = todoList.childNodes;
  switch (filterTodo.value) {
    case "all":
      for (let todo of todos) {
        todo.style.display = "flex";
      }
      break;

    case "completed":
      for (let todo of todos) {
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else if (!todo.classList.contains("completed")) {
          todo.style.display = "none";
        }
      }
      break;

    case "uncompleted":
      for (let todo of todos) {
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else if (todo.classList.contains("completed")) {
          todo.style.display = "none";
        }
      }
      break;
  }
}

function getTodos() {
  if (localStorage.getItem("titles") !== null) {
    localTodosTitles = JSON.parse(localStorage.getItem("titles"));
    localTodosDescriptions = JSON.parse(localStorage.getItem("descriptions"));
    localTodosIsCompleted = JSON.parse(localStorage.getItem("isCompleteds"));

    for (let a = 0; a <= localTodosTitles.length - 1; a++) {
      const todoDiv = document.createElement("div");
      todoDiv.classList.add("todo");
      todoList.appendChild(todoDiv);

      const kolor = kolory[getRandomInt(0, kolory.length)];

      todoDiv.style.backgroundColor = kolor;
      todoDiv.style.transform = "rotate(" + getRandomInt(-10, 10) + "deg)";

      const newTitle = document.createElement("h2");
      newTitle.classList.add("todo-title");
      todoDiv.appendChild(newTitle);

      newTitle.innerText = a + 1 + ". " + localTodosTitles[a];

      const newDesc = document.createElement("p");
      newDesc.classList.add("todo-description");
      newDesc.innerText = localTodosDescriptions[a];
      todoDiv.appendChild(newDesc);

      const newbtnAdd = document.createElement("button");
      const newbtnRmv = document.createElement("button");

      newbtnAdd.classList.add("accept");
      newbtnRmv.classList.add("rmv");

      const mag = document.createElement("div");
      mag.classList.add("circle");
      mag.style.backgroundColor = kolory[getRandomInt(0, kolory.length)];

      todoDiv.appendChild(mag);

      const newbtnAddImg = document.createElement("img");
      const newbtnRmvImg = document.createElement("img");

      newbtnAddImg.src = "/img/done_outline_white_24dp.svg";
      newbtnAdd.appendChild(newbtnAddImg);
      newbtnRmvImg.src = "/img/remove_white_24dp.svg";
      newbtnRmv.appendChild(newbtnRmvImg);

      todoDiv.appendChild(newbtnAdd);
      todoDiv.appendChild(newbtnRmv);

      if (localTodosIsCompleted[a]) {
        todoDiv.classList.add("completed");
        const childs = todoDiv.childNodes;
        for (let child of childs) {
          if (child.tagName == "BUTTON") {
            child.remove();
          }
        }
      }
    }
  }
}
