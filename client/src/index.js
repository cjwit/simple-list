import { addItem } from './addNewItem.js';
import { loadItems, updateStorage } from './storage.js';
import './style.scss';
import { Sortable, MultiDrag } from 'sortablejs';

const newItemEntry = document.getElementById("newItemEntry");
newItemEntry.addEventListener("keyup", addItem);

var items = document.getElementById("itemContainer");
Sortable.mount(new MultiDrag());
Sortable.create(items, {
  multiDrag: true,
  selectedClass: "selected",
  onEnd: function(e) {
    for (let i in e.items) {
      Sortable.utils.deselect(e.items[i]);
    }
  },
  fallbackTolerance: 3,
  onSort: updateStorage
});

loadItems();