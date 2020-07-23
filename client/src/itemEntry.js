import { deleteItem } from './itemControl.js';

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
  var newItemWrapper = document.createElement("li");
  newItemWrapper.appendChild(newItemText);

  // create and add button
  var newItemButton = document.createElement("button");
  newItemButton.innerText = "Delete";
  
  // add unique ID
  var id = text.replace(/[\W]/g, "_") + Date.now();
  newItemWrapper.id = id;
  
  // add event listeners
  newItemButton.addEventListener("click", deleteItem);
  newItemWrapper.appendChild(newItemButton);
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
