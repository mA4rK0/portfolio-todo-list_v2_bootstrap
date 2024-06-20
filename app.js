document.addEventListener("DOMContentLoaded", () => {
  const input = document.querySelector("input");
  const addBtn = document.getElementById("add-btn");
  const countDis = document.querySelector(".count-value");
  const errMsg = document.querySelector("#error");
  const tasks = document.querySelector(".todos");

  // Inisialisasi count dengan nilai dari local storage
  let count = getCountStg();

  // Add button
  addBtn.addEventListener("click", makeTask);

  // Load all the tasks and counts after reload the page
  loadTask();
  loadNumber();

  // Delete and edit button
  tasks.addEventListener("click", (e) => {
    if (e.target.closest(".deleteBton")) {
      const parentElm = e.target.closest("section");
      parentElm.remove();
      removeTask(parentElm.firstChild.textContent.trim());
      decrCount();
    } else if (e.target.closest(".editBton")) {
      const parentElm = e.target.closest("section");
      editTask(parentElm);
    }
  });

  // Remove a task from the local storage
  function removeTask(aTask) {
    let tasks = getLocalArray();
    tasks = tasks.filter((task) => task !== aTask);
    localStorage.setItem("todos", JSON.stringify(tasks));
  }

  // Decreasing the count
  function decrCount() {
    count -= 1;
    countDis.textContent = count;
    saveCount(count);
  }

  // Add a task
  function makeTask() {
    const acc = input.value.trim();
    if (acc === "") {
      errMsg.classList.remove("d-none");
      return;
    } else {
      errMsg.classList.add("d-none");
    }

    const section = createTaskElement(acc);
    tasks.append(section);

    count += 1;
    countDis.textContent = count;
    saveCount(count);

    saveTask(acc);
    input.value = "";
  }

  // create task element
  function createTaskElement(taskText) {
    const section = document.createElement("section");
    section.classList.add("position-relative", "pt-3", "ps-4");
    section.innerHTML = `${taskText} 
    <button class="editBton position-absolute btn btn-warning"><i class="bi bi-pencil-square"></i></button>
    <button class="deleteBton position-absolute btn btn-danger me-3"><i class="bi bi-trash3-fill"></i></button> <hr/>`;
    return section;
  }

  // Save the task to the local storage
  function saveTask(task) {
    let localStg = getLocalArray();
    localStg.push(task);
    localStorage.setItem("todos", JSON.stringify(localStg));
  }

  // Save the count to the local storage
  function saveCount(counting) {
    localStorage.setItem("counts", counting.toString());
  }

  // Get the count from the local storage
  function getCountStg() {
    const count = localStorage.getItem("counts");
    return count ? parseInt(count) : 0;
  }

  // Get the local storage
  function getLocalArray() {
    let todos = localStorage.getItem("todos");
    return todos ? JSON.parse(todos) : [];
  }

  // Load the task
  function loadTask() {
    const todos = getLocalArray();
    todos.forEach((todo) => {
      let section = createTaskElement(todo);
      tasks.append(section);
    });
  }

  // Load the count
  function loadNumber() {
    countDis.textContent = count;
  }

  // edit a task
  function editTask(section) {
    const taskText = section.firstChild.textContent.trim();
    const newTask = prompt("Edit your task:", taskText);

    if (newTask !== null && newTask.trim() !== "") {
      section.firstChild.textContent = newTask.trim() + " ";
      updateLocalStr(taskText, newTask.trim());
    }
  }

  // update the task in local storage
  function updateLocalStr(oldTask, newTaskText) {
    let tasks = getLocalArray();

    const taskIndex = tasks.indexOf(oldTask);
    if (taskIndex !== -1) {
      tasks[taskIndex] = newTaskText;
      localStorage.setItem("todos", JSON.stringify(tasks));
    }
  }
});
