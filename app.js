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

  // 2. Add new object to data
  const data = {
    // array of objects
    items: [
      { id: 0, name: "Burger", calories: 1000 },
      { id: 1, name: "Chips", calories: 400 },
      { id: 2, name: "Coke", calories: 200 }
    ],
    currentItem: null,
    totalCalories: 0
  };

  // Public methods, return makes it public
  return {
    logData: function () {
      return data;
    },

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
    itemCaloriesInput: "#item-calories"
  };

  // Public method
  return {
    // return data items in html
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
    // get input from UI
    const input = UICtrl.getItemInput();
    // add item to data
    if (input.name !== "" && input.calories !== "") {
      const newItem = ItemCtrl.addItem(input.name, input.calories);
    }
    e.preventDefault();
  };

  // public methods
  return {
    init: function () {
      const items = ItemCtrl.getItems();
      UICtrl.populateItemList(ItemCtrl.getItems());

      // ItemCtrl logdata
      console.log(ItemCtrl.logData());

      // load events
      loadEventListeners();
    }
  };
})(ItemCtrl, UICtrl); // invoke controllers

// App init's function
App.init();
