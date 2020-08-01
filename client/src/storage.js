import { createListItem } from './addNewItem.js';

// initialize item
function initializeItem(item) { 
  var newItem = createListItem(item.text);
  var itemContainer = document.getElementById("itemContainer");
  itemContainer.appendChild(newItem);
}

export function loadItems() {
  // get data from
  fetch('http://localhost:3000/storage', {
    method: 'get'
  })
  .then(response => response.json())
  .then(jsonData => 
    {
      var itemList = jsonData.items;
      for (var i = 0; i < itemList.length; i++) {
        initializeItem(itemList[i]);
      }    
    })
  .catch(err => {
    console.log("error:", err)
  })
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

  fetch('http://localhost:3000/storage', {
    method: 'post',
    body: JSON.stringify(storage),
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(response => response.json())
  .then(data => {
    console.log('success:', data)
  })
  .catch((err) => {
    console.error('error:', err);
  });

  // localStorage.setItem("itemList", JSON.stringify(storage));
}