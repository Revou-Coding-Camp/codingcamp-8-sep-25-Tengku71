const form = document.querySelector("form");
const inputTodo = document.querySelector(".input-todo");
const inputDate = document.querySelector(".input-date");
const todoTableBody = document.querySelector(".todo-table tbody");
const btnDeleteAll = document.querySelector(".btn-delete-all");

const editModal = document.getElementById("editModal");
const closeModal = document.querySelector(".close");
const editForm = document.getElementById("editForm");
const editTaskInput = document.getElementById("editTask");
const editDateInput = document.getElementById("editDate");

let rowBeingEdited = null;

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const task = inputTodo.value.trim();
  const date = inputDate.value;

  if (task === "" || date === "") {
    alert("Please enter a task and a date!");
    return;
  }

  const newRow = document.createElement("tr");

  const taskCell = document.createElement("td");
  taskCell.textContent = task;
  newRow.appendChild(taskCell);

  const dateCell = document.createElement("td");
  dateCell.textContent = date;
  newRow.appendChild(dateCell);

  const statusCell = document.createElement("td");
  const statusSelect = document.createElement("select");
  statusSelect.innerHTML = `
    <option value="Pending">Pending</option>
    <option value="Completed">Completed</option>
  `;
  statusCell.appendChild(statusSelect);
  newRow.appendChild(statusCell);

  const actionCell = document.createElement("td");

  const btnEdit = document.createElement("button");
  btnEdit.textContent = "Edit";
  btnEdit.classList.add("btn-edit");
  btnEdit.addEventListener("click", function () {
    editTaskInput.value = taskCell.textContent;
    editDateInput.value = dateCell.textContent;
    rowBeingEdited = newRow;
    editModal.style.display = "block";
  });

  const btnDelete = document.createElement("button");
  btnDelete.textContent = "Delete";
  btnDelete.classList.add("btn-delete");
  btnDelete.addEventListener("click", function () {
    newRow.remove();
  });

  actionCell.appendChild(btnEdit);
  actionCell.appendChild(btnDelete);
  newRow.appendChild(actionCell);

  todoTableBody.appendChild(newRow);

  inputTodo.value = "";
  inputDate.value = "";
});

btnDeleteAll.addEventListener("click", function () {
  todoTableBody.innerHTML = "";
});

closeModal.addEventListener("click", function () {
  editModal.style.display = "none";
});

editForm.addEventListener("submit", function (e) {
  e.preventDefault();

  if (rowBeingEdited) {
    rowBeingEdited.cells[0].textContent = editTaskInput.value;
    rowBeingEdited.cells[1].textContent = editDateInput.value;
  }

  editModal.style.display = "none";
  rowBeingEdited = null;
});

window.addEventListener("click", function (e) {
  if (e.target === editModal) {
    editModal.style.display = "none";
  }
});
