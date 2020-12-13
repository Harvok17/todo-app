import { project } from "./modules/project";
import { todo } from "./modules/todo";

document.addEventListener("DOMContentLoaded", () => {
  project.init();
  todo.init();
});

const addProjectBtn = document.querySelector(".add-project-btn");
const projectList = document.querySelector(".project-list");
const addTodoBtn = document.querySelector(".add-todo-btn");
const todoList = document.querySelector(".todo-list");
const todoSaveBtn = document.querySelector(".todo-modal-save-btn");
const titleInput = document.querySelector(".project-title");

addProjectBtn.addEventListener("click", () => {
  project.createProject();
});

projectList.addEventListener("click", function (e) {
  if (e.target.className === "project-item") {
    project.setSelectedProject(e.target);
  }

  if (e.target.dataset.job === "delete") {
    const deleteId = e.target.closest(".project-item").id;
    project.deleteProject(deleteId);
  }
});

addTodoBtn.addEventListener("click", () => {
  todo.createTodo();
});

todoList.addEventListener("click", (e) => {
  if (e.target.className === "todo-item") {
    const todoId = e.target.closest(".todo-item").id;
    todo.displayTodoDetails(todoId);
  }
  if (e.target.dataset.job === "delete") {
    const todoId = e.target.closest(".todo-item").id;
    todo.deleteTodo(todoId);
  }
});

todoSaveBtn.addEventListener("click", (e) => {
  todo.updateTodoDetails(e);
});

titleInput.addEventListener("keyup", function(e) {
  if (e.keyCode === 13) {
    todo.updateProjectTitle();
    this.blur();
  } 
  
});
