
// add item to the list
var addItem = function(e) {
  e.preventDefault();

  // get item text from entry form
  var itemEntryTextForm = document.getElementById("itemEntryText");
  var itemText = itemEntryTextForm.value;
  console.log(itemText);

  // create and append new item with itemText
  var itemContainer = document.getElementById("itemContainer");
  var newItem = document.createElement("li");
  newItem.innerText = itemText;
  itemContainer.appendChild(newItem);

  // clear item from entry form
  itemEntryTextForm.value = "";
}

const addItemForm = document.getElementById("itemEntryContainer");
addItemForm.addEventListener("submit", addItem);
