"use strict";

const todoList = document.querySelector(".todo-list");
const trashList = document.querySelector("#trash-list");
const btnAdd = document.querySelector(".add-btn");
const inputField = document.querySelector(".input-field");

//ADD NEW TASK

btnAdd.addEventListener("click", function () {
  const inputValue = inputField.value;

  if (inputValue === "") {
    alert("You must write something!");
  } else {
    const listEl = document.createElement("li");
    const task = document.createElement("span");
    task.textContent = inputValue;
    listEl.appendChild(task);

    listEl.classList.add("task");
    task.classList.add("task-text");

    const btnX = document.createElement("button");
    btnX.classList.add("remove-button");
    btnX.classList.add("small-btn");
    listEl.prepend(btnX);

    todoList.appendChild(listEl);
    inputField.value = "";

    // REMOVE THE TASK

    $(".remove-button")
      .off()
      .click(function () {
        const listItem = $(this).parent();

        //MODAL WINDOW APPEARS

        $("#modal-window").removeClass("hidden");
        $("#overlay").removeClass("hidden");

        // REMOVE THE TASK? YES

        $("#yes-btn")
          .off()
          .click(function () {
            $("#modal-window").addClass("hidden");
            $("#overlay").addClass("hidden");

            // MOVE TO TRASH

            btnX.classList.add("return-button");
            btnX.classList.remove("remove-button");
            $("#trash-list").append(listItem[0].cloneNode(true));
            listItem.remove();

            $(".return-button").click(function () {
              btnX.classList.remove("return-button");
              btnX.classList.add("remove-button");
              todoList.appendChild(listItem[0].cloneNode(true));
              trashList.remove(listItem[0]);
            });

            // BRING BACK TO THE TODO LIST
          });

        //REMOVE THE TASK? NO

        $("#no-btn").click(function () {
          $("#modal-window").addClass("hidden");
          $("#overlay").addClass("hidden");
        });
      });
  }
});

//MARK TASK AS COMPLETED

todoList.addEventListener("click", function (event) {
  //get current date
  const clickedTask = event.target;

  const currentDate = new Date();

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[currentDate.getMonth()];

  const dateOfTask =
    +currentDate.getDate() +
    " " +
    month +
    " " +
    currentDate.getFullYear() +
    ", " +
    currentDate.getHours() +
    ":" +
    currentDate.getMinutes();

  //if task isn't completed - mark as completed
  if (clickedTask.classList.contains("task")) {
    if (!clickedTask.classList.contains("task--done")) {
      clickedTask.classList.add("task--done");

      clickedTask.querySelector(".task-text").classList.add("task-text--done");

      const dateEl = document.createElement("span");
      dateEl.classList.add("date");
      dateEl.textContent = dateOfTask;

      clickedTask.appendChild(dateEl);
    } else {
      clickedTask.classList.remove("task--done");
      clickedTask
        .querySelector(".task-text")
        .classList.remove("task-text--done");

      clickedTask.removeChild(clickedTask.querySelector(".date"));
    }
  }
});
