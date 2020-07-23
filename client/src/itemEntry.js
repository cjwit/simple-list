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
  var newItem = document.createElement("li");
  newItem.innerText = text

  // add unique ID
  var id = text.replace(/[\W]/g, "_") + Date.now();
  newItem.id = id;

  // add event listeners
  newItem.addEventListener("click", deleteItem);
  return newItem;
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
