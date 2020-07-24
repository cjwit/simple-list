import { createListItem } from './addNewItem.js';

// initialize item
function initializeItem(item) { 
  var newItem = createListItem(item.text);
  var itemContainer = document.getElementById("itemContainer");
  itemContainer.appendChild(newItem);
}

export function loadItems() {
  var itemList = JSON.parse(localStorage.getItem('itemList'));
  for (var i = 0; i < itemList.length; i++) {
    initializeItem(itemList[i]);
  }
}

export function updateStorage() {
  var storage = [];
  var itemList = document.getElementById("itemContainer").childNodes;
  for (var i = 1; i < itemList.length; i++) {
    let item = {
      id: itemList[i].id,
      text: itemList[i].childNodes[0].innerText,
      created: Date.now()
    }
    storage.push(item);
  }
  localStorage.setItem("itemList", JSON.stringify(storage));
}