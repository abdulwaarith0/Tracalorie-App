// Storage Controller


// Item Controller
const ItemCtrl = (function () {
    // Item Constructor
    class Item {
        constructor(id, name, calories) {
            this.name = name;
            this.id = id;
            this.calories = calories;
        }
    }

    // Data Structure / State
    const data = {
        items: [
            // { id: 0, name: "Steak Dinner", calories: 1200 },
            // { id: 1, name: "Cookies", calories: 400 },
            // { id: 2, name: "Eggs", calories: 800 }

        ],
        currentItem: null,
        totalCalories: 0
    };

    return {
        getItems: function () {
            return data.items;
        },
        addItem: function (name, calories) {
            let ID;
            // Create ID 
            if (data.items.length > 0) {
                ID = data.items[data.items.length - 1].id + 1;
            } else {
                ID = 0;
            }

            // Calories to number
            calories = parseInt(calories);

            // Create new item 
            newItem = new Item(ID, name, calories);

            // Add to items array
            data.items.push(newItem);

            return newItem;

        },

        getTotalCalories: function () {
            let total = 0;
            // Loop through items and add calls
            data.items.forEach(function (item) {
                total += item.calories;
            });

            // Set total calories in data structure
            data.totalCalories = total;

            // Return total calories
            return data.totalCalories;
        },

        logData: function () {
            return data;
        }
    };
})();


// UI Controller
const UICtrl = (function () {
    const UIselectors = {
        itemList: "#item-list",
        addItems: ".add-btn",
        itemNameInput: "#item-name",
        itemCalorieInput: "#item-calories",
        totalCalories: ".total-calories"
    };

    // Public Methods
    return {
        populateItemList: function (items) {
            let html = "";

            items.forEach(function (item) {
                html += `
                    <li id="item-${item.id}" class="collection-item">
                        <strong>${item.name}: </strong> 
                            <em>${item.calories} Calories</em>
                        <a href="#" class="secondary-content">
                            <i class="edit-item fa fa-pencil"></i>
                        </a>
                    </li>
                `;
            });

            // Insert List Items
            document.querySelector(UIselectors.itemList).innerHTML = html;
        },

        getItemInput: function () {
            return {
                name: document.querySelector(UIselectors.itemNameInput).value,
                calories: document.querySelector(UIselectors.itemCalorieInput).value
            }
        },

        addListItem: function (item) {
            // Show list
            document.querySelector(UIselectors.itemList).style.display = "block";
            // Create li item
            const li = document.createElement("li");
            // Add class
            li.className = "collection-item";
            // Add ID
            li.id = `item-${item.id}`;

            // Add Html
            li.innerHTML = `<strong>${item.name}: </strong> 
                            <em>${item.calories} Calories</em>
                        <a href="#" class="secondary-content">
                            <i class="edit-item fa fa-pencil"></i>
                        </a>`
            // Insert Item
            document.querySelector(UIselectors.itemList).insertAdjacentElement("beforeend", li)
        },

        clearInput: function () {
            document.querySelector(UIselectors.itemNameInput).value = "";
            document.querySelector(UIselectors.itemCalorieInput).value = "";
        },

        hideList: function () {
            document.querySelector(UIselectors.itemList).style.display = "none";
        },

        showTotalCalories: function (totalCalories) {
            document.querySelector(UIselectors.totalCalories).textContent = totalCalories;
        },

        getSelectors: function () {
            return UIselectors;
        }
    }
})();



// App Controller
const AppCtrl = (function (ItemCtrl, UICtrl) {
    // Load event listeners
    const loadEventListeners = function () {
        // Get UI Selectors
        const UIselectors = UICtrl.getSelectors();

        // Add Item Events
        document.querySelector(UIselectors.addItems).addEventListener("click",
            itemAddSubmit);
    };

    // Add Item Submit
    const itemAddSubmit = function (e) {
        // Get form input from UI controller
        const input = UICtrl.getItemInput(e);

        // Check for name and calorie input
        if (input.name !== "" && input.calories !== "") {
            console.log("Added");
            // Add Item 
            const newItem = ItemCtrl.addItem(input.name, input.calories);

            // Add item to UI list
            UICtrl.addListItem(newItem);

            // Get total calories
            const totalCalories = ItemCtrl.getTotalCalories();

            // Add total calories to the UI
            UICtrl.showTotalCalories(totalCalories);
            // Clear field input
            UICtrl.clearInput();

        }


        e.preventDefault();
    }

    // Public Methods
    return {
        init: function () {

            // Fetch Items from Data Structure
            const items = ItemCtrl.getItems();

            // Check if any item
            if (items.length === 0) {
                // hide list items
                UICtrl.hideList();
            } else {
                // populate list with items
                UICtrl.populateItemList(items);
            }
            // Get total calories
            const totalCalories = ItemCtrl.getTotalCalories();

           // Add total calories to the UI
            UICtrl.showTotalCalories(totalCalories);

            // Load Event Listeners
            loadEventListeners();
        }
    }


})(ItemCtrl, UICtrl);

AppCtrl.init();