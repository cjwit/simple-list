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
  newItemButton.innerText = "Delete";
  newItemButton.addEventListener("click", deleteItem);
  return newItemButton;
}

// update item with edited text
function submitEdit(e) {

  // check for event type and return if not submitting
  if (e.keyCode == 13 || e.keyCode == 10 || e.type == "blur") {

    // get new text
    var newText = e.target.value;
    var newSpan = document.createElement("span");
    newSpan.innerText = newText;

    // replace input with new text
    var elementWrapper = e.target.parentNode;
    elementWrapper.removeChild(e.target);
    elementWrapper.prepend(newSpan);
  }
}

// create the editInput input
function editInput(text) {
  var editInput = document.createElement("input");
  editInput.setAttribute("placeholder", text);
  editInput.addEventListener("blur", submitEdit);
  editInput.addEventListener("keyup", submitEdit);
  return editInput;
}

// edit text when clicked (replace span with input field)
function editItem(e) {
  // get wrapper and remove text span
  var elementWrapper = document.getElementById(e.target.parentNode.id);
  var textSpan = elementWrapper.removeChild(elementWrapper.firstChild);
  var currentText = textSpan.innerText;
  elementWrapper.prepend(editInput(currentText));
}

// build delete button
export function editButton() {
  // create and add button
  var newItemButton = document.createElement("button");
  newItemButton.innerText = "Edit";
  newItemButton.addEventListener("click", editItem);
  return newItemButton;
}
