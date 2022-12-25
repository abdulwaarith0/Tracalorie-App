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

        getItemById: function (id) {
            let found = null;
            // Loop through
            data.items.forEach(function (item) {
                if (item.id === id) {
                    found = item;
                }
            });
            return found;
        },

        updateItem: function (name, calories) {
            // Calories to number
            calories = parseInt(calories);

            let found = null;

            data.items.forEach(function (item) {
                if (item.id === data.currentItem.id) {
                    item.name = name;
                    item.calories = calories;
                    found = item;
                }
            });
            return found;
        },

        deleteItem: function(id) {
            // Get ids
            const ids = data.items.map(function(item) {
                return item.id;
            });
            // Get index
            const index = ids.indexOf(id);

            // Splice / Remove item
            data.items.splice(index, 1);
        },

        setCurrentItem: function (item) {
            data.currentItem = item;
        },

        getCurrentItem: function () {
            return data.currentItem;
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
        listItems: "#item-list li",
        addBtn: ".add-btn",
        updateBtn: ".update-btn",
        deleteBtn: ".delete-btn",
        backBtn: ".back-btn",
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
            document.querySelector(UIselectors.itemList).insertAdjacentElement("beforeend",
                li)
        },

        updateListItem: function(item){
            let listItems = document.querySelectorAll(UIselectors.listItems);

            // Turn Node list into array
            listItems = Array.from(listItems);

        listItems.forEach(function(listItem){
            const itemID = listItem.getAttribute('id');
 
                if(itemID === `item-${item.id}`){
                document.querySelector(`#${itemID}`).innerHTML = 
                `<strong>${item.name}: </strong>  
                    <em>${item.calories} Calories</em>
                <a href="#" class="secondary-content">
                    <i class="edit-item fa fa-pencil"></i>
                </a>`;
                }
            });
        },

        deleteListItem: function(id) {
            const itemId = `#item-${id}`;
            const item = document.querySelector(itemId);
            
            item.remove();
        },

        clearInput: function () {
            document.querySelector(UIselectors.itemNameInput).value = "";
            document.querySelector(UIselectors.itemCalorieInput).value = "";
        },

        // Add update button content to the form for updating
        addItemToForm: function () {
            document.querySelector(UIselectors.itemNameInput).value =
                ItemCtrl.getCurrentItem().name;
            document.querySelector(UIselectors.itemCalorieInput).value =
                ItemCtrl.getCurrentItem().calories;

            // Show the remaining buttons except add button after adding update button     content to the form
            UICtrl.showEditState();
        },

        hideList: function () {
            document.querySelector(UIselectors.itemList).style.display = "none";
        },

        // Total calories
        showTotalCalories: function (totalCalories) {
            document.querySelector(UIselectors.totalCalories).textContent = totalCalories;
        },

        // Button states
        clearEditState: function () {
            UICtrl.clearInput();
            document.querySelector(UIselectors.updateBtn).style.display = "none";
            document.querySelector(UIselectors.deleteBtn).style.display = "none";
            document.querySelector(UIselectors.backBtn).style.display = "none";
            document.querySelector(UIselectors.addBtn).style.display = "inline";
        },

        showEditState: function () {
            document.querySelector(UIselectors.updateBtn).style.display = "inline";
            document.querySelector(UIselectors.deleteBtn).style.display = "inline";
            document.querySelector(UIselectors.backBtn).style.display = "inline";
            document.querySelector(UIselectors.addBtn).style.display = "none";
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
        document.querySelector(UIselectors.addBtn).addEventListener("click",
            itemAddSubmit);

        // Disable submit on enter
        document.addEventListener("keypress", function (e) {
            // 13 === enter
            if (e.keyCode === 13 || e.which === 13) {
                e.preventDefault();

                return false;
            }
        });

        // Edit icon click event
        document.querySelector(UIselectors.itemList).addEventListener("click",
            itemEditClick);

        // Update item event
        document.querySelector(UIselectors.updateBtn).addEventListener("click",
            itemUpdateSubmit);

        // Back button event
        document.querySelector(UIselectors.backBtn).addEventListener("click",   
           UICtrl.clearEditState);

        // Delete item event
        document.querySelector(UIselectors.deleteBtn).addEventListener("click", 
          itemDeleteSubmit); 

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

    // Click edit item
    const itemEditClick = function (e) {
        if (e.target.classList.contains("edit-item")) {
            // Get list item id (item-0)
            const listId = e.target.parentNode.parentNode.id;

            // Break into ana array
            const listIdArr = listId.split("-");

            // Get Actual Id
            const id = parseInt(listIdArr[1]);

            // Get Item
            const itemToEdit = ItemCtrl.getItemById(id);
            console.log(itemToEdit);

            // Set current item 
            ItemCtrl.setCurrentItem(itemToEdit);

            // Add item to form
            UICtrl.addItemToForm();
        }

        e.preventDefault();
    }

    // Update item submit
    const itemUpdateSubmit = function (e) {
        // Get item input
        const input = UICtrl.getItemInput();

        // Update item 
        const updatedItem = ItemCtrl.updateItem(input.name, input.calories);

        // Update UI
        UICtrl.updateListItem(updatedItem);

        // Get total calories
        const totalCalories = ItemCtrl.getTotalCalories();

        // Add total calories to the UI
        UICtrl.showTotalCalories(totalCalories);

        // Clear input form after updating a food item
        UICtrl.clearEditState(); 

        e.preventDefault();
    }

    // Delete button event
    const itemDeleteSubmit = function(e) {
        // Get current item
        const currentItem = ItemCtrl.getCurrentItem();

        // Delete from data structure
        ItemCtrl.deleteItem(currentItem.id);  

        // Delete from UI
        UICtrl.deleteListItem(currentItem.id);

        // Get total calories
        const totalCalories = ItemCtrl.getTotalCalories();

        // Add total calories to the UI
        UICtrl.showTotalCalories(totalCalories);

        // Clear input form after updating a food item
        UICtrl.clearEditState(); 

        e.preventDefault();
    }

    // Public Methods
    return {
        init: function () {

            // Clear edit state / set initial state
            UICtrl.clearEditState();

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