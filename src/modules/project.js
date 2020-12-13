import { Project } from "./factories/projectFactory";
import { events } from "./pubsub";
import { storage } from "./storage";

export const project = (() => {
  const projectList = document.querySelector(".project-list");
  const projectDetails = document.querySelector(".project-details");

  function createProject() {
    storage.projects.push(Project(Date.now().toString(), "(New Project)"));
    events.emit("createdProject", storage.projects);
  }

  function clearList() {
    if (projectList.firstChild)
      while (projectList.firstChild) {
        projectList.removeChild(projectList.firstChild);
      }
  }

  function render() {
    clearList();
    if (storage.projects.length === 0) storage.clear();
    storage.projects.forEach((project) => {
      const div = document.createElement("DIV");
      const li = document.createElement("LI");
      const btn = document.createElement("BUTTON");

      div.classList.add("project-item");
      div.setAttribute("id", project.id);
      li.classList.add("project-name");
      btn.classList.add("project-delete-btn");
      btn.setAttribute("data-job", "delete");

      li.textContent = project.title;
      btn.textContent = "\u2A09";

      div.append(li);
      div.append(btn);

      if (div.id === storage.selectedProjID) {
        div.classList.add("selected");
      }

      projectList.append(div);
    });

    if (!storage.selectedProjID || storage.selectedProjID === "null") {
      projectDetails.classList.add("hide");
    } else {
      projectDetails.classList.remove("hide");
    }
  }

  function setSelectedProject(target) {
    storage.selectedProjID = target.id;
    events.emit("selectedProject", storage.selectedProjID);
  }

  function deleteProject(deletedProjectId) {
    storage.projects = storage.projects.filter(
      (project) => project.id !== deletedProjectId
    );

    if (storage.selectedProjID === deletedProjectId)
      storage.selectedProjID = null;

    events.emit("deletedProject", storage.projects);
  }

  function init() {
    render();
    events.emit("initialize");
  }

  events.on("createdProject", render);
  events.on("selectedProject", render);
  events.on("deletedProject", render);
  events.on("updateProjectTitle", render);

  return {
    createProject,
    setSelectedProject,
    deleteProject,
    init,
  };
})();
