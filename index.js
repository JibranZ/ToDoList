document.addEventListener("DOMContentLoaded", () => {
  const inputField = document.querySelector(".textbox");
  const submitButton = document.querySelector(".button");
  const itemlist = document.querySelector(".itemlist");

  // Load items from localStorage on page load
  loadItems();

  // Function to load items from localStorage
  function loadItems() {
    const items = JSON.parse(localStorage.getItem("items")) || [];
    items.forEach((item) => {
      const listItem = createListItem(item.text);
      itemlist.appendChild(listItem);
    });
  }

  // Function to create a list item with checkbox, text, delete, and update buttons
  function createListItem(textValue) {
    const listItem = document.createElement("li");

    // Checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("checkbox");
    listItem.appendChild(checkbox);

    // If a checkbox is checked the list item is deleted
    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        listItem.classList.add("fade-out");
        setTimeout(() => {
          deleteItem(listItem);
        }, 400);
      }
    });

    // Span
    const textSpan = document.createElement("span");
    textSpan.textContent = textValue;
    listItem.appendChild(textSpan);

    // Delete Button
    let deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Delete";
    deleteButton.classList.add("delete-button");
    listItem.appendChild(deleteButton);

    deleteButton.addEventListener("click", () => {
      listItem.classList.add("fade-out");
      setTimeout(() => {
        deleteItem(listItem);
      }, 1000);
    });

    // Update Button
    let updateButton = document.createElement("button");
    updateButton.innerHTML = "Update";
    updateButton.classList.add("update-button");
    listItem.appendChild(updateButton);
    updateButton.addEventListener("click", () => {
      updateItem(textSpan);
    });

    return listItem;
  }

  // Add item to list and save to localStorage
  function addItem() {
    const inputValue = inputField.value.trim();
    if (inputValue) {
      const listItem = createListItem(inputValue);
      itemlist.appendChild(listItem);

      listItem.classList.add("fade-in");

      // Save to localStorage
      saveItems();

      inputField.value = "";
      inputField.focus();
    }
  }

  // Save items to localStorage
  function saveItems() {
    const items = [];
    itemlist.querySelectorAll("li").forEach((item) => {
      items.push({
        text: item.querySelector("span").textContent,
      });
    });
    localStorage.setItem("items", JSON.stringify(items));
  }

  // Delete function
  function deleteItem(listItem) {
    listItem.remove();
    saveItems();
  }

  // Update Function
  function updateItem(textSpan) {
    const newValue = prompt("Enter new value:", textSpan.textContent);
    if (newValue !== null && newValue.trim() !== "") {
      textSpan.textContent = newValue.trim();
      saveItems();
    }
  }

  // Delete All Items Function
  function deleteAllItems() {
    while (itemlist.firstChild) {
      itemlist.removeChild(itemlist.firstChild);
    }
    localStorage.removeItem("items");
  }

  // Event listeners

  submitButton.addEventListener("click", addItem);

  inputField.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      addItem();
    }
  });

  // Delete All button event listener
  const deleteAllButton = document.querySelector(".deleteAllButton");
  deleteAllButton.addEventListener("click", deleteAllItems);
});
