import { deleteButton, editButton, submitEdit } from './itemControl.js';

// get item text from entry form and clear the form
function getNewItemText() {
  var itemEntryTextForm = document.getElementById("itemEntryText");
  var text = itemEntryTextForm.value;
  itemEntryTextForm.value = "";
  return text;
}

// create new list item
function createListItem(text) {
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
  
  // add unique ID
  var id = "item-" + Date.now();
  newItemWrapper.id = id;
  newItemWrapper.classList.add("item");
  
  return newItemWrapper;
}

// add item to the list
export function addItem(e) {
  e.preventDefault();

  // create and append new item with itemText
  var itemText = getNewItemText();
  if (itemText.length == 0) {
    return;
  }
  var newItem = createListItem(itemText);
  
  var itemContainer = document.getElementById("itemContainer");
  itemContainer.appendChild(newItem);
}
