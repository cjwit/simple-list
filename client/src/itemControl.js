// delete element when clicked
export function deleteItem(e) {
  console.log("deleting:", e.target.parentNode.id, e.target.parentNode.innerText);

  // get wrapper (parent node of the button that triggered the event)
  var elementWrapper = document.getElementById(e.target.parentNode.id);
  return elementWrapper.parentNode.removeChild(elementWrapper);
}