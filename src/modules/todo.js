import { Todo } from "./factories/todoFactory";
import { events } from "./pubsub";
import { storage } from "./storage";

export const todo = (() => {
  const projectTitle = document.querySelector(".project-title");
  const todoList = document.querySelector(".todo-list");
  const todoDetails = document.querySelector(".todo-details");
  const todoOverlay = document.querySelector(".todo-overlay");

  //Todo Modal
  const todoPrio = document.querySelector(".priority");
  const todoStatus = document.querySelector(".status");
  const todoTitle = document.querySelector(".todo-modal-title");
  const todoDescription = document.querySelector(".todo-modal-description");
  const todoDueDate = document.querySelector(".todo-modal-due-date");

  let currentProject;
  let selectedTodo;

  function setCurrentProject() {
    currentProject = storage.projects.find(
      (project) => project.id === storage.selectedProjID
    );
    projectTitle.value = currentProject.title;
  }

  function createTodo() {
    currentProject.list.push(
      Todo(
        Date.now().toString(),
        "(New Todo)",
        "",
        "none",
        "none",
        "dd/mm/yyyy"
      )
    );
    events.emit("createdTodo", currentProject);
  }

  function clearTodoList() {
    if (todoList.firstChild)
      while (todoList.firstChild) {
        todoList.removeChild(todoList.firstChild);
      }
  }

  function render() {
    clearTodoList();
    currentProject.list.forEach((todo) => {
      const div = document.createElement("div");
      const li = document.createElement("li");
      const title = document.createElement("p");
      const date = document.createElement("p");
      const btn = document.createElement("button");

      div.classList.add("todo-item");
      div.setAttribute("id", todo.id);
      li.classList.add("todo-info");
      title.classList.add("todo-title");
      date.classList.add("todo-due-date");
      btn.classList.add("todo-delete-btn");

      title.textContent = todo.title;
      date.textContent = todo.date;
      btn.textContent = "\u2A09";
      btn.setAttribute("data-job", "delete");

      li.append(title, date);
      div.append(li, btn);
      todoList.append(div);

      todo.priority === "low" && li.classList.add("low-prio");
      todo.priority === "medium" && li.classList.add("mid-prio");
      todo.priority === "high" && li.classList.add("high-prio");
      todo.status === "completed" && li.classList.add("completed");
    });
  }

  function deleteTodo(deletedTodoId) {
    currentProject.list = currentProject.list.filter(
      (todo) => todo.id !== deletedTodoId
    );

    events.emit("deletedTodo", currentProject.list);
  }

  function displayTodoDetails(selectedTodoID) {
    todoDetails.classList.remove("hide");
    todoOverlay.classList.remove("hide");

    selectedTodo = currentProject.list.find(
      (todo) => todo.id === selectedTodoID
    );
  

    todoPrio.value = selectedTodo.priority;
    todoStatus.value = selectedTodo.status;
    todoTitle.value = selectedTodo.title;
    todoDescription.value = selectedTodo.description;
    todoDueDate.value = selectedTodo.date;
  }

  function updateTodoDetails(event) {
    if (!todoPrio.value || !todoStatus.value || !todoDueDate.value) {
      return;
    }
    event.preventDefault();
    todoDetails.classList.add("hide");
    todoOverlay.classList.add("hide");

    selectedTodo.priority = todoPrio.value;
    selectedTodo.status = todoStatus.value;
    selectedTodo.title = todoTitle.value;
    selectedTodo.description = todoDescription.value;
    selectedTodo.date = todoDueDate.value;

    events.emit("updateTodoDetails", selectedTodo);
  }

  function updateProjectTitle() {
    currentProject.title = projectTitle.value;
    events.emit("updateProjectTitle", currentProject);
  }

  function init() {
    if (storage.selectedProjID !== "null") {
      setCurrentProject();
      render();
    }
  }

  events.on("selectedProject", setCurrentProject);
  events.on("selectedProject", render);
  events.on("createdTodo", render);
  events.on("deletedTodo", render);
  events.on("updateTodoDetails", render);
  events.on("initialize", init);

  return {
    createTodo,
    deleteTodo,
    displayTodoDetails,
    updateTodoDetails,
    updateProjectTitle,
    init,
  };
})();
