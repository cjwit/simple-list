import { deleteButton, editButton } from './itemControl.js';

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

  /// create wrapper element and add buttons
  var newItemWrapper = document.createElement("li");
  newItemWrapper.appendChild(newItemText);
  newItemWrapper.appendChild(editButton());
  newItemWrapper.appendChild(deleteButton());
  
  // add unique ID
  var id = "item-" + Date.now();
  newItemWrapper.id = id;
  
  return newItemWrapper;
}

// add item to the list
export function addItem(e) {
  e.preventDefault();

  // create and append new item with itemText
  var itemText = getNewItemText();
  var newItem = createListItem(itemText);
  
  var itemContainer = document.getElementById("itemContainer");
  itemContainer.appendChild(newItem);
}
