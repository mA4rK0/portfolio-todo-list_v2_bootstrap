document.addEventListener("DOMContentLoaded", () => {
  const input = document.querySelector("input");
  const addBtn = document.getElementById("add-btn");
  const countDis = document.querySelector(".count-value");
  const errMsg = document.querySelector("#error");
  const tasks = document.querySelector(".tasks");

  //   add button
  addBtn.addEventListener("click", makeTask);

  //   load all the tasks and counts after reload the page
  loadTask();
  loadNumber();

  //   count the task
  let count = 0;

  //   add a task
  function makeTask() {
    const acc = input.value.trim();
    if (acc === "") {
      errMsg.classList.remove("d-none");
      return;
    } else {
      errMsg.classList.add("d-none");
    }

    const section = document.createElement("section");
    section.classList.add("mt-4", "ms-4");
    section.innerHTML = `${acc} <hr/>`;
    tasks.append(section);

    count += 1;
    countDis.textContent = count;
    saveCount(count);

    saveTask(acc);
    input.value = "";
  }

  //   save the task to the local storage
  function saveTask(task) {
    //* get the JSON Array from the local storage.
    let localStg = getLocalArray();

    //* push the localStg into the local array
    localStg.push(task);
    localStorage.setItem("todos", JSON.stringify(localStg));
  }

  //   save the count to the local storage
  function saveCount(counting) {
    //* get the Count from the local storage.
    let countStorage = getCountStg();

    //* change the last count to the current count
    countStorage = "";
    localStorage.setItem("counts", countStorage);
    let number = counting;
    localStorage.setItem("counts", number.toString());
  }

  //   get the count array from the local storage
  function getCountStg() {
    let count = localStorage.getItem("counts");
    if (count) {
      return parseInt(count);
    }
  }

  //   get the local storage
  function getLocalArray() {
    let todos = localStorage.getItem("todos");
    return todos ? JSON.parse(todos) : [];
  }

  //   load the task
  function loadTask() {
    const todos = getLocalArray();
    todos.forEach((todo) => {
      let section = document.createElement("section");
      section.classList.add("mt-4", "ms-4");
      section.innerHTML = `${todo} <hr/>`;
      tasks.append(section);
    });
  }

  //   load the count
  function loadNumber() {
    const number = getCountStg();
    countDis.textContent = number;
  }
});
