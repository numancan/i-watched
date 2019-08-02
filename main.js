const searchBtn = document.querySelector(".search-btn");
const resultList = document.querySelector(".result-list");
const watchedList = document.querySelector(".watched-list");
const watchedCount = document.querySelector(".watched-count");
const searchInput = document.querySelector(".search-input");

const response = [
  {
    name: "Star Wars",
    year: "2004",
    imdb: "8.5",
    category: "Horror / Sci-fi"
  },
  {
    name: "Breaking Bad",
    year: "2009",
    imdb: "9.9",
    category: "Torbacilik / Kimya"
  }
];

searchBtn.addEventListener("click", () => {
  // TODO: API
  addToResultList();

  function addToResultList() {
    response.forEach(movieInfo => {
      let element = document.createElement("li");
      element.classList.add("result");
      element.addEventListener("click", () => addToWatchedList(movieInfo));

      element.innerHTML += `<img  alt="" />
                            <h3>${movieInfo.name} (${movieInfo.year})</h3>
                            <div class="imdb">IMDb ${movieInfo.imdb}</div>
                            <div class="category">${movieInfo.category}</div>`;

      resultList.appendChild(element);
    });
  }
});

const addToWatchedList = movieInfo => {
  let element = document.createElement("li");
  element.classList.add("watched");

  element.innerHTML += `<img/>
                        <h3>${movieInfo.name}</h3>`;

  watchedList.appendChild(element);

  // Clear result list
  resultList.innerHTML = "";

  // Clear input value
  searchInput.value = "";

  // Update watched count
  watchedCount.innerHTML = watchedList.childElementCount;
};

// const taskInput = document.querySelector(".add-task-area input");
// const taskList = document.querySelector(".task-list");
// const projectContainer = document.querySelector(".project-list");
// const burgerBtn = document.querySelector(".burger");
// const sideBar = document.querySelector(".side-bar");

// let projectList = [];
// let activeProject, lastActiveProject;

// class Project {
//   constructor(name, taskArr) {
//     this.name = name.toLowerCase();
//     this.taskArr = taskArr;
//     this._saveToLocalStorge();
//   }

//   addTask(task = taskInput.value) {
//     this._createTaskItem({ task: task }, length);

//     // Clear input's value
//     taskInput.value = "";
//     this.taskArr.push({ task: task, checked: false });
//     this._saveToLocalStorge();
//   }

//   removeTask(taskIndex) {
//     taskList.removeChild(taskList.children[taskIndex]);
//     this.taskArr.splice(taskIndex, 1);
//     this._saveToLocalStorge();
//   }

//   removeAllTask() {
//     this.taskArr = [];
//     this._saveToLocalStorge();
//     taskList.innerHTML = "";
//   }

//   changeCheckboxValue(taskIndex) {
//     this.taskArr[taskIndex].checked = !this.taskArr[taskIndex].checked;
//     this._saveToLocalStorge();
//   }

//   drawTaskItem() {
//     taskList.innerHTML = "";

//     this.taskArr.forEach((object, index) => {
//       this._createTaskItem(object, index);
//     });
//   }

//   /* ---PRIVATE FUNCTIONS--- */

//   _createTaskItem(object, taskIndex) {
//     let element = document.createElement("li");
//     element.classList.add("task");
//     element.innerHTML = `<input type="checkbox">
//                          <label>${object.task}</label>
//                          <button class="btn-del-task"><i class="fas fa-plus-circle"></i></button>`;

//     let checkbox = element.children[0];
//     checkbox.checked = object.checked;
//     checkbox.addEventListener("click", () => {
//       this.changeCheckboxValue(taskIndex);
//     });

//     element.children[2].addEventListener("click", () => {
//       this.removeTask(taskIndex);
//     });

//     taskList.appendChild(element);
//   }

//   _saveToLocalStorge() {
//     localStorage.setItem(`todo-app-${this.name}`, JSON.stringify(this.taskArr));
//   }
// }

// const getProjectsFromStorge = () => {
//   for (let i = 0; i < localStorage.length; i++) {
//     let key = localStorage.key(i);
//     if (key.includes("todo-app")) {
//       let value = JSON.parse(localStorage.getItem(key));
//       let project = new Project(key.split("todo-app-")[1], value);
//       appendProjectToSidebar(project);
//     }
//   }
//   if (!projectList.length) createNewProject();
//   else changeActiveProject();
// };

// const appendProjectToSidebar = project => {
//   const item = document.createElement("li");
//   item.addEventListener("click", () => {
//     changeActiveProject(project);
//   });
//   item.addEventListener("click", () => {
//     sideBar.classList.toggle("open");
//   });
//   projectList.push(project)
//   item.innerHTML += project.name;
//   projectContainer.appendChild(item);
// };

// const createNewProject = () => {
//   let projectName = prompt("Please write your project name.")
//   if (projectName) {
//     let project = new Project(projectName, [])
//     appendProjectToSidebar(project)
//     changeActiveProject(project)
//   }
// };

// const changeActiveProject = (project = projectList[0]) => {
//   let elementIndex = projectList.indexOf(activeProject);
//   if (activeProject != undefined && elementIndex != -1)
//     projectContainer.children[elementIndex].classList.remove("active");

//   elementIndex = projectList.indexOf(project);
//   projectContainer.children[elementIndex].classList.add("active");

//   activeProject = project;
//   document.querySelector(".project-title").innerHTML = activeProject.name;
//   activeProject.drawTaskItem();
// };

// const removeProject = () => {
//   let elementIndex = projectList.indexOf(activeProject);
//   // Remove from storge
//   localStorage.removeItem(`todo-app-${activeProject.name}`);
//   // Delete element
//   projectContainer.removeChild(projectContainer.children[elementIndex]);
//   // Remove from projectList
//   projectList.splice(elementIndex, 1);
//   // ChangeActiveProject
//   changeActiveProject();
// };

// burgerBtn.addEventListener("click", () => {
//   sideBar.classList.toggle("open");
// });

// getProjectsFromStorge();

// // const arr = [{'name':'work','tasks':[{'task':"havuza gir.",'checked':true},{'task':'Come to party.','checked':false}]},
// //               {'name':'study','tasks':[{'task':"İşine bak.",'checked':false},{'task':"Uyuma kalk.",'checked':false},{'task':'Get out here..','checked':true}]}];

// // localStorage.setItem('todo-app', JSON.stringify(arr));
