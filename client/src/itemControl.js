export function deleteItem(e) {
  console.log("deleting:", e.target.id, e.target.innerText);
  var element = document.getElementById(e.target.id);
  return element.parentNode.removeChild(element);
}