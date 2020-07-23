import { addItem } from './itemEntry.js';

const addItemForm = document.getElementById("itemEntryContainer");
addItemForm.addEventListener("submit", addItem);