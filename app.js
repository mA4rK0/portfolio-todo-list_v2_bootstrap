document.addEventListener("DOMContentLoaded", () => {
  const input = document.querySelector("input");
  const addBtn = document.getElementById("add-btn");
  const countDis = document.querySelector(".count-value");
  const errMsg = document.querySelector("#error");
  const tasks = document.querySelector(".tasks");

  // Inisialisasi count dengan nilai dari local storage
  let count = getCountStg();

  // Add button
  addBtn.addEventListener("click", makeTask);

  // Load all the tasks and counts after reload the page
  loadTask();
  loadNumber();

  // Delete button
  tasks.addEventListener("click", (e) => {
    if (e.target.classList.contains("deleteBton")) {
      let parentElm = e.target.parentElement;
      parentElm.remove();
      removeTask(parentElm.firstChild.textContent.trim());
      decrCount();
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

    const section = document.createElement("section");
    section.classList.add("position-relative", "mt-4", "ms-4");
    section.innerHTML = `${acc} <button class="deleteBton position-absolute btn btn-danger me-3">X</button> <hr/>`;
    tasks.append(section);

    count += 1;
    countDis.textContent = count;
    saveCount(count);

    saveTask(acc);
    input.value = "";
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
      let section = document.createElement("section");
      section.classList.add("position-relative", "mt-4", "ms-4");
      section.innerHTML = `${todo} <button class="deleteBton position-absolute btn btn-danger me-3">X</button> <hr/>`;
      tasks.append(section);
    });
  }

  // Load the count
  function loadNumber() {
    countDis.textContent = count;
  }
});
