const STORAGE_KEY_LIST = "bucketList";
const STORAGE_KEY_CATEGORIES = "categories";
let bucketList = [];
let categories = ["Resor", "Äventyr", "Lärande", "Hobby"];
let sortCriteria = "description";
let sortOrderAscending = true;

function saveListToLocalStorage(storageKey, list) {
  localStorage.setItem(storageKey, JSON.stringify(list));
}

function loadListFromLocalStorage(storageKey) {
  const data = localStorage.getItem(storageKey);
  return list = data ? JSON.parse(data) : [];
}

function addItem(item) {
  bucketList.push(item);
  saveListToLocalStorage(STORAGE_KEY_LIST, bucketList);
}

function editItem(index) {
  const modal = document.getElementById("editModal");
  const editDescriptionInput = document.getElementById("editDescription");
  const categorySelect = document.getElementById("editCategory");
  generateCategoryOptions("editCategory");

  editDescriptionInput.value = bucketList[index].description;
  categorySelect.value = bucketList[index].category;

  modal.dataset.index = index;

  modal.showModal();
}

function toggleComplete(index) {
  bucketList[index].completed = !bucketList[index].completed;
  saveListToLocalStorage(STORAGE_KEY_LIST, bucketList);
  renderList();
}

function removeItem(index) {
  bucketList.splice(index, 1);
  saveListToLocalStorage(STORAGE_KEY_LIST, bucketList);
  renderList();
}

function renderList() {
  const listContainer = document.getElementById("bucketTableBody");
  const bucketListsSection = document.getElementById('bucket-lists');

  listContainer.innerHTML = "";

  bucketList.forEach((item, index) => {
    const listItem = createListItem(item, index);
    listContainer.appendChild(listItem);
  });

  toggleSectionVisibility(bucketListsSection, bucketList.length > 0);
}

function createListItem(item, index) {
  const listItem = document.createElement("tr");
  listItem.className = "list-item";
  listItem.innerHTML = `
      <td class="description ${item.completed ? "line-through" : "none"}">${item.description}</td>
      <td class="category ${item.completed ? "line-through" : "none"}">${item.category}</td>
      <td>
        <button class="btn-icon toggle-btn" ${item.completed ? "data-state='inactive'" : "data-state='active'"}>
          <i class="fas ${item.completed ? 'fa-undo' : 'fa-check'}"></i>
        </button>
        <button class="btn-icon edit-btn" ${item.completed ? "data-state='inactive'" : "data-state='active'"}>
          <i class="fas fa-edit"></i>
        </button>
        <button class="btn-icon remove-btn" ${item.completed ? "data-state='inactive'" : "data-state='active'"}>
          <i class="fas fa-trash"></i>
        </button>
      </td>
    `;
  const toggleButton = listItem.querySelector(".toggle-btn");
  const editButton = listItem.querySelector(".edit-btn");
  const removeButton = listItem.querySelector(".remove-btn");

  toggleButton.addEventListener("click", () => toggleComplete(index));
  editButton.addEventListener("click", () => editItem(index));
  removeButton.addEventListener("click", () => removeItem(index));
  
  return listItem;
}

function generateCategoryOptions(elementId) {
  const selectElement = document.getElementById(elementId);

  selectElement.innerHTML = "";

  categories.forEach(category => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    selectElement.appendChild(option);
  });
}

function toggleSectionVisibility(section, isVisible) {
  section.style.display = isVisible ? "block" : "none";
}

function handleSort(sortType) {
  const [field, direction] = sortType.split("-");
  const ascending = direction === "asc";
  sortBucketList(field, ascending);
}

function init() {
  bucketList = loadListFromLocalStorage(STORAGE_KEY_LIST);
  if (localStorage.getItem(STORAGE_KEY_CATEGORIES) === null)
    saveListToLocalStorage(STORAGE_KEY_CATEGORIES, categories);
  categories = loadListFromLocalStorage(STORAGE_KEY_CATEGORIES);
  generateCategoryOptions("activityCategory");

  const sortButtons = document.querySelectorAll(".sort");
  
  sortButtons.forEach(button => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      const sortType = button.getAttribute("data-sort");
      handleSort(sortType);
    });
  });
  const closeModalButton = document.getElementById("close-modal");
  closeModalButton.addEventListener("click", () => closeModal());

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

const editForm = document.getElementById('modalForm');
editForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const modal = document.getElementById('editModal');
  const index = modal.dataset.index;

  const description = document.getElementById('editDescription').value;
  const category = document.getElementById('editCategory').value;

  bucketList[index] = { ...bucketList[index], description, category };

  saveListToLocalStorage(STORAGE_KEY_LIST, bucketList);

  modal.close();
  renderList();
});

function closeModal() {
  document.getElementById("editModal").close();
}

function sortBucketList(criteria, ascending) {
  bucketList.sort((a, b) => {
    const aValue = a[criteria].toLowerCase();
    const bValue = b[criteria].toLowerCase();

    if (aValue < bValue) return ascending ? -1 : 1;
    if (aValue > bValue) return ascending ? 1 : -1;
    return 0;
  });

  renderList();
}