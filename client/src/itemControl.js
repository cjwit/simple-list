// delete element when clicked
function deleteItem(e) {
  // get wrapper (parent node of the button that triggered the event)
  var elementWrapper = document.getElementById(e.target.parentNode.id);
  return elementWrapper.parentNode.removeChild(elementWrapper);
}

// build delete button
export function deleteButton() {
  // create and add button
  var newItemButton = document.createElement("button");
  newItemButton.classList.add("delete");
  newItemButton.innerText = "Delete";
  newItemButton.addEventListener("click", deleteItem);
  return newItemButton;
}

// update item with edited text
export function submitEdit(e) {

  // check for event type and return if not submitting
  if (e.keyCode == 13 || e.keyCode == 10 || e.type == "blur") {

    // get new text
    var newText = e.target.value;

    // replace input with new text
    var elementWrapper = e.target.parentNode;
    var childNodes = elementWrapper.childNodes;

    var textSpan = childNodes[0];
    textSpan.innerText = newText;
    textSpan.style.display = "inline";

    var input = childNodes[1];
    input.style.display = "none";
  }
}

// edit text when clicked (replace span with input field)
function editItem(e) {
  
  // hide text span and show edit form
  var elementWrapper = document.getElementById(e.target.parentNode.id);
  var childNodes = elementWrapper.childNodes;
  
  var textSpan = childNodes[0];
  textSpan.style.display = "none";

  var input = childNodes[1];
  input.setAttribute("placeholder", textSpan.innerText);
  input.style.display = "inline";
}

// build delete button
export function editButton() {
  // create and add button
  var newItemButton = document.createElement("button");
  newItemButton.classList.add("edit");
  newItemButton.innerText = "Edit";
  newItemButton.addEventListener("click", editItem);
  return newItemButton;
}
