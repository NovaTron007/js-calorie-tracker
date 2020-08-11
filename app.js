/*
 * Storage controller
 */
const StorageCtrl = (function () {})();

/*
 * Item controller
 */
const ItemCtrl = (function () {
  // 1. Constructor to create new item
  const Item = function (id, name, calories) {
    this.id = id;
    this.name = name;
    this.calories = calories;
  };

  // 2. Add new object to data, data object to store  various vars
  const data = {
    // array of objects
    items: [
      // { id: 0, name: "Burger", calories: 1000 },
      // { id: 1, name: "Chips", calories: 400 },
      // { id: 2, name: "Coke", calories: 200 }
    ],
    currentItem: null,
    totalCalories: 0
  };

  // Public methods, return makes it public
  return {
    // Begin add item process
    addItem: function (name, calories) {
      // create an id
      let id;
      if (data.items.length > 0) {
        id = data.items[data.items.length - 1].id + 1; // get last index, add one
      } else {
        id = 0;
      }
      // parse calories input
      calories = parseInt(calories);

      // 1. create new object using Item constructor
      newItem = new Item(id, name, calories);
      // 2. add new item object to data object/array
      data.items.push(newItem);

      // logData to console
      console.log(ItemCtrl.logData());

      return newItem;
    },

    getItems: function () {
      // data object
      return data.items;
    },

    getTotalCalories: function () {
      let total = 0;
      // loop data object->items array->objects to get at calories
      data.items.forEach(item => {
        total = total + item.calories;
      });
      // set the totalCalories in  data object
      data.totalCalories = total;

      return data.totalCalories;
    },

    //log function
    logData: function () {
      return data;
    }
  };
})();

/*
 * UI controller
 */
const UICtrl = (function () {
  // Object for DOM elements
  const UISelectors = {
    itemList: "#item-list",
    addBtn: ".add-btn",
    itemNameInput: "#item-name",
    itemCaloriesInput: "#item-calories",
    totalCalories: ".total-calories"
  };

  // Public method
  return {
    // 1. Render data items
    populateItemList: function (items) {
      let html = "";
      items.forEach(item => {
        html += `<li class="collection-item" id="${item.id}">
        <strong>${item.name} </strong> <em>${item.calories} Calories</em>
        <a href="#" class="secondary-content">
          <i class="edit-item fa fa-pencil"></i>
        </a>
      </li>`;
      });
      // insert to DOM
      document.querySelector(UISelectors.itemList).innerHTML = html;
    },

    // make UISelectors public for other controllers
    getSelectors: function () {
      return UISelectors;
    },

    // Assign UI input
    getItemInput: function () {
      return {
        name: document.querySelector(UISelectors.itemNameInput).value,
        calories: document.querySelector(UISelectors.itemCaloriesInput).value
      };
    },

    // Add item to UI: pass in same item added to data array
    addListItem: function (newItem) {
      // show list
      document.querySelector(UISelectors.itemList).style.display = "block";
      // create li element
      const li = document.createElement("li");
      // add class to it
      li.className = "collection-item";
      // get the id
      li.id = `item-${newItem.id}`;
      // add the li html template to the new li
      li.innerHTML = `<strong>${newItem.name} </strong> <em>${newItem.calories} Calories</em>
          <a href="#" class="secondary-content">
            <i class="edit-item fa fa-pencil"></i>
          </a>`;
      //insert item to dom
      document.querySelector(UISelectors.itemList).insertAdjacentElement("beforeend", li);
    },

    // clear inputs after submit
    clearInputs: function () {
      document.querySelector(UISelectors.itemNameInput).value = "";
      document.querySelector(UISelectors.itemCaloriesInput).value = "";
    },

    // hide list if no items (remove the border of list)
    hideList: function () {
      document.querySelector(UISelectors.itemList).style.display = "none";
    },

    // show total calories
    showTotalCalories: function (totalCalories) {
      document.querySelector(UISelectors.totalCalories).textContent = totalCalories;
    }
  };
})();

/*
 * App controller
 */
const App = (function (ItemCtrl, UICtrl) {
  // Event listeners
  const loadEventListeners = function () {
    // Get access to all selectors
    const UISelectors = UICtrl.getSelectors();
    // add item
    document.querySelector(UISelectors.addBtn).addEventListener("click", itemAddSubmit);
  };

  // Add item submit
  const itemAddSubmit = function (e) {
    e.preventDefault();
    // get input from UI
    const input = UICtrl.getItemInput();
    // 1. Add item to data
    if (input.name !== "" && input.calories !== "") {
      const newItem = ItemCtrl.addItem(input.name, input.calories);
      // 2. Add newItem to UI
      UICtrl.addListItem(newItem);
      // 3. Clear inputs
      UICtrl.clearInputs();

      // Get total calories
      const totalCalories = ItemCtrl.getTotalCalories();
      // add total calories to UI
      UICtrl.showTotalCalories(totalCalories);
    }
  };

  // public methods
  return {
    init: function () {
      const items = ItemCtrl.getItems();

      // show list if has items
      if (items.length === 0) {
        UICtrl.hideList();
      } else {
        UICtrl.populateItemList(ItemCtrl.getItems());
      }

      // ItemCtrl logdata
      console.log(ItemCtrl.logData());

      // load events
      loadEventListeners();
    }
  };
})(ItemCtrl, UICtrl); // invoke controllers

// App init's function
App.init();
