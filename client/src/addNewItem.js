import { deleteButton, editButton, submitEdit } from './itemControl.js';
import { updateStorage } from './storage.js';

// create new list item
export function createListItem(text, id = null) {
  var newItemText = document.createElement("span");
  newItemText.innerText = text

  // create edit input
  var editInput = document.createElement("input");
  editInput.setAttribute("placeholder", text);
  editInput.setAttribute("type", "text");
  editInput.style.display = "none";
  editInput.addEventListener("blur", submitEdit);
  editInput.addEventListener("keyup", submitEdit);

  /// create wrapper element and add buttons
  var newItemWrapper = document.createElement("li");
  newItemWrapper.appendChild(newItemText);
  newItemWrapper.appendChild(editInput);
  newItemWrapper.appendChild(editButton());
  newItemWrapper.appendChild(deleteButton());
  newItemWrapper.classList.add("item");

  // add unique ID
  id == null ? 
  newItemWrapper.id = "item-" + Date.now()
  : 
  newItemWrapper.id = id

  return newItemWrapper;
}

// add item to the list
export function addItem(e) {
  if (e.keyCode == 13 || e.keyCode == 10) {

    // create and append new item with itemText
    var itemText = e.target.value;
    e.target.value = "";
    if (itemText.length == 0) {
      return;
    }

    var newItem = createListItem(itemText);

    var itemContainer = document.getElementById("itemContainer");
    itemContainer.appendChild(newItem);

    updateStorage();
  }
}
