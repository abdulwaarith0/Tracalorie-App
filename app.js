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
        logData: function () {
            return data;
        }
    };
})();


// UI Controller
const UICtrl = (function () {
    // Public Methods
    return {

    }
})();



// App Controller
const AppCtrl = (function (ItemCtrl, UICtrl) {

    // Public Methods
    return {
        init: function() {
            console.log("Initializing App.......");
        }
    }
    

})(ItemCtrl, UICtrl);

AppCtrl.init();