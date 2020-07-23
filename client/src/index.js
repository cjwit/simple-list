import { addItem } from './itemEntry.js';
import './style.scss';

const addItemForm = document.getElementById("itemEntryContainer");
addItemForm.addEventListener("submit", addItem);