import { events } from "./pubsub";

export const storage = {
  projects: JSON.parse(localStorage.getItem("PROJECT_LIST")) ||  [
    {
      id: "1607733948510",
      title: "Home",
      list: [
        {
          id: "1607733980333",
          title: "Wash the dishes",
          description: "- Make sure to clean the sink as well.",
          priority: "medium",
          status: "not completed",
          date: "2020-12-13",
        },
        {
          id: "1607734124419",
          title: "Cook Dinner",
          description: "- Cook some spaghetti and have ice cream for dessert.",
          priority: "high",
          status: "not completed",
          date: "2020-12-18",
        },
        {
          id: "1607734270787",
          title: "Clean Bedroom",
          description: "- Make sure wife won't see the bedroom dirty",
          priority: "low",
          status: "not completed",
          date: "2020-12-14",
        },
        {
          id: "1607734306649",
          title: "Watch Netflix",
          description: "- Watch favorite show",
          priority: "low",
          status: "completed",
          date: "2020-12-18",
        },
      ],
    },
    {
      id: "1607733958046",
      title: "Work",
      list: [
        {
          id: "1607734350200",
          title: "Attend meeting",
          description: "Meeting starts at 9:00 AM",
          priority: "high",
          status: "not completed",
          date: "2020-12-21",
        },
        {
          id: "1607734398949",
          title: "Project",
          description: "Work on company project",
          priority: "high",
          status: "not completed",
          date: "2020-12-16",
        },
        {
          id: "1607734464136",
          title: "Other task",
          description: "Finish remaining tasks",
          priority: "medium",
          status: "not completed",
          date: "2020-12-16",
        },
      ],
    },
    {
      id: "1607733964510",
      title: "Play",
      list: [
        {
          id: "1607734495269",
          title: "Play Chess",
          description: "- Keep practicing!",
          priority: "low",
          status: "not completed",
          date: "2020-12-25",
        },
        {
          id: "1607734517748",
          title: "Play CSGO",
          description: "- Grind to level up",
          priority: "low",
          status: "not completed",
          date: "2020-12-25",
        },
        {
          id: "1607734554297",
          title: "Buy Cyberpunk",
          description: "",
          priority: "low",
          status: "completed",
          date: "2020-12-25",
        },
      ],
    }

  ],

  selectedProjID: localStorage.getItem("SELECTED_PROJ_ID") || 'null',

  save() {
    localStorage.setItem("PROJECT_LIST", JSON.stringify(this.projects));
    localStorage.setItem("SELECTED_PROJ_ID", this.selectedProjID);
  },
  clear() {
    localStorage.clear();
  }
};

events.on("createdProject", storage.save.bind(storage));
events.on("selectedProject", storage.save.bind(storage));
events.on("deletedProject", storage.save.bind(storage));
events.on("createdTodo", storage.save.bind(storage));
events.on("deletedTodo", storage.save.bind(storage));
events.on("updateTodoDetails", storage.save.bind(storage));
events.on("updateProjectTitle", storage.save.bind(storage))
events.on('initialize',storage.save.bind(storage))

