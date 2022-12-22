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
            { id: 0, name: "Steak Dinner", calories: 1200 },
            { id: 1, name: "Cookies", calories: 400 },
            { id: 2, name: "Eggs", calories: 800 }

        ],
        currentItem: null,
        totalCalories: 0
    };

    return {
        getItems: function() {
            return data.items;
        },

        logData: function () {
            return data;
        }
    };
})();


// UI Controller
const UICtrl = (function () {
    const UIselectors = {
        itemList: "#item-list"
    };
    // Public Methods
    return {
        populateItemList: function(items) {
            let html = "";

            items.forEach(function(item) {
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
        }
    }
})();



// App Controller
const AppCtrl = (function (ItemCtrl, UICtrl) {

    // Public Methods
    return {
        init: function() {

            // Fetch Items from Data Structure
            const items = ItemCtrl.getItems();
            // console.log(items);

            // Populate List With Items
            UICtrl.populateItemList(items);
        }
    }
    

})(ItemCtrl, UICtrl);

AppCtrl.init();