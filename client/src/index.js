import { addItem } from './addNewItem.js';
import { loadItems, updateStorage } from './storage.js';
import './style.scss';
import Sortable from 'sortablejs';

const newItemEntry = document.getElementById("newItemEntry");
newItemEntry.addEventListener("keyup", addItem);

var items = document.getElementById("itemContainer");
var sortable = Sortable.create(items, {
  onSort: updateStorage
});

loadItems();