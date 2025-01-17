const STORAGE_KEY = "bucketList";
let list = [];

function saveListToLocalStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

function loadListFromLocalStorage() {
  const data = localStorage.getItem(STORAGE_KEY);
  list = data ? JSON.parse(data) : [];
}

function addItem(item) {
  list.push(item);
  saveListToLocalStorage();
}

function toggleComplete(index) {
  list[index].completed = !list[index].completed;
  saveListToLocalStorage();
  renderList();
}

function removeItem(index) {
  list.splice(index, 1);
  saveListToLocalStorage();
  renderList();
}

function renderList() {
  const listContainer = document.getElementById("bucketTableBody");
  const bucketListsSection = document.getElementById('bucket-lists');

  listContainer.innerHTML = "";

  list.forEach((item, index) => {
    const listItem = document.createElement("tr");
    listItem.className = "list-item";
    listItem.style.textDecoration = item.completed ? "line-through" : "none";
    listItem.style.opacity = item.completed ? "0.4" : "1";
    listItem.innerHTML = `
      <td class="description">${item.description}</td>
      <td class="category">${item.category}</td>
      <td>
      <button class="btn-icon" onclick="toggleComplete(${index})"><i class="fas ${item.completed ? 'fa-undo' : 'fa-check'}"></i></button>
      <button class="btn-icon" onclick="editItem(${index})"><i class="fas fa-edit"></i></button>
      <button class="btn-icon" onclick="removeItem(${index})"><i class="fas fa-trash"></i></button>
      </td>
    `;
    listContainer.appendChild(listItem);
  });
  if (list.length > 0) {
    bucketListsSection.style.display = 'block';
  } else {
    bucketListsSection.style.display = 'none';
  }
}

function init() {
  loadListFromLocalStorage();
  renderList();
}

document.addEventListener("DOMContentLoaded", init);

const form = document.getElementById("bucketForm");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const description = document.getElementById("activityName").value;
  const category = document.getElementById("activityCategory").value;
  const complete = false;

  if (description) {
    addItem({ description, category, complete });
    renderList();
    form.reset();
  }
});