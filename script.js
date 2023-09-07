const box = document.querySelector('.to-do-box');
const submit = document.getElementById('submit');


document.addEventListener('DOMContentLoaded', function () {
  const storedItems = JSON.parse(localStorage.getItem('todoItems')) || [];
  for (const item of storedItems) {
    addItem(item);
  }
});

submit.addEventListener('click', function (event) {
  event.preventDefault();

  const item = document.getElementById('Item');
  if (item.value.length)
    addItem(item.value);
  else
    alert("enter something ..!!!!!!!!!!!!!!!");
  item.value = '';


  saveToLocalStorage();
});

const addItem = (item) => {
  const listItem = document.createElement('li');
  listItem.innerHTML = `
    ${item}
    <i class="fa-solid fa-pen-to-square"></i>
    <i class="fas fa fa-remove"></i>
  `;

  listItem.addEventListener('click', function () {
    this.classList.toggle('done');
    saveToLocalStorage();
  });

  listItem.querySelector('.fa-remove').addEventListener('click', function () {
    listItem.remove();
    saveToLocalStorage();
  });

  listItem.querySelector('.fa-pen-to-square').addEventListener('click', function () {
    const clickedListItem = this.parentElement;
    const clickedText = clickedListItem.textContent.trim();
    const itemInput = document.getElementById('Item');
    itemInput.value = clickedText;
    alert("Warning original content will be Removed..!! Write and submit again .");
    listItem.remove();
    saveToLocalStorage();

    });
    box.appendChild(listItem);


    saveToLocalStorage();
  };


  const saveToLocalStorage = () => {
    const items = Array.from(box.querySelectorAll('li')).map((li) => li.textContent);
    localStorage.setItem('todoItems', JSON.stringify(items));
  };
  function fetchFromLocalStorage() {
    const storedItemsJSON = localStorage.getItem('todoItems');


    if (storedItemsJSON) {
      try {

        const storedItems = JSON.parse(storedItemsJSON);


        if (Array.isArray(storedItems)) {
          return storedItems;
        } else {

          console.error('Data in local storage is not an array.');
          return [];
        }
      } catch (error) {

        console.error('Error parsing data from local storage:', error);
        return [];
      }
    } else {

      return [];
    }
  }
