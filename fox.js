// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Initial todo lists data
    const todoLists = [
        {
            title: "✅ Check List A",
            items: [
                "Identify the overall trend using the 1D time frame",
                "Check if the market is retracing on the 1D and identify if it's  currently on the third touch of a trend line or fib zone",
                "Then check out the 4H trend and chart pattern ",
                "Mark out the 4H major SNR",
                "Check if the market is retrancing on the 4th and identify if it's on the third touch of a trend line or fib zone ",
                "Check out the 1H trend and chart patterns ",
                "Check if the market  is retrancing on the 1h and identify if it's currently on third touch of a trend line or fib zone "
            ]
        },
        // {
        //     title: "✅ Risk Management",
        //     items: [
        //         "Decide % risk for this trade (max ___%)",
        //         "Set stop-loss level before entering",
        //         "Set take-profit level (minimum 2:1 reward-to-risk)",
        //         "Calculate correct lot size based on account balance"
        //     ]
        // },
        // {
        //     title: "✅ Trade Confirmation",
        //     items: [
        //         "Wait for candle close or confirmation before entry",
        //         "Double-check for false breakouts or fake signals",
        //         "Ensure trade aligns with my trading plan (not impulse)",
        //         "Check economic calendar/news before entry"
        //     ]
        // },
        // {
        //     title: "✅ Execution & Discipline",
        //     items: [
        //         "Make sure I'm calm, focused, not emotional",
        //         "Confirm I'm not overleveraging",
        //         "Set alerts / automation (SL, TP, trailing stop)",
        //         "Record trade idea in my trading journal"
        //     ]
        // }
    ];

    // Custom items array
    let customItems = [];
    let completedItems = {};

    // DOM elements
    const todoListsContainer = document.getElementById('todo-lists');
    const customItemsContainer = document.getElementById('custom-items');
    const newItemInput = document.getElementById('new-item');
    const addItemButton = document.getElementById('add-item');
    const clearCustomButton = document.getElementById('clear-custom');

    // Create todo lists
    function createTodoLists() {
        todoListsContainer.innerHTML = '';
        
        todoLists.forEach((list, listIndex) => {
            const section = document.createElement('div');
            section.className = 'section';
            
            const title = document.createElement('h2');
            title.textContent = list.title;
            section.appendChild(title);
            
            const itemsContainer = document.createElement('div');
            
            list.items.forEach((item, itemIndex) => {
                const key = `${listIndex}-${itemIndex}`;
                const isCompleted = completedItems[key] || false;
                
                const todoItem = document.createElement('div');
                todoItem.className = `todo-item ${isCompleted ? 'completed' : ''}`;
                
                const checkbox = document.createElement('div');
                checkbox.className = `checkbox ${isCompleted ? 'checked' : ''}`;
                checkbox.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                `;
                
                checkbox.addEventListener('click', () => {
                    completedItems[key] = !completedItems[key];
                    todoItem.classList.toggle('completed');
                    checkbox.classList.toggle('checked');
                });
                
                const itemText = document.createElement('span');
                itemText.className = 'item-text';
                itemText.textContent = item;
                
                todoItem.appendChild(checkbox);
                todoItem.appendChild(itemText);
                itemsContainer.appendChild(todoItem);
            });
            
            section.appendChild(itemsContainer);
            todoListsContainer.appendChild(section);
        });
    }

    // Create custom items
    function createCustomItems() {
        customItemsContainer.innerHTML = '';
        
        if (customItems.length === 0) {
            const placeholder = document.createElement('div');
            placeholder.style.color = 'rgba(255, 255, 255, 0.5)';
            placeholder.style.padding = '10px 0';
            placeholder.textContent = 'No custom tasks yet. Add one below!';
            customItemsContainer.appendChild(placeholder);
            return;
        }
        
        customItems.forEach(item => {
            const customItem = document.createElement('div');
            customItem.className = `custom-item ${item.completed ? 'completed' : ''}`;
            
            const checkbox = document.createElement('div');
            checkbox.className = `checkbox ${item.completed ? 'checked' : ''}`;
            checkbox.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
            `;
            
            checkbox.addEventListener('click', () => {
                item.completed = !item.completed;
                customItem.classList.toggle('completed');
                checkbox.classList.toggle('checked');
            });
            
            const itemText = document.createElement('span');
            itemText.className = 'item-text';
            itemText.textContent = item.text;
            
            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'delete-btn';
            deleteBtn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
            `;
            
            deleteBtn.addEventListener('click', () => {
                customItems = customItems.filter(i => i.id !== item.id);
                createCustomItems();
            });
            
            customItem.appendChild(checkbox);
            customItem.appendChild(itemText);
            customItem.appendChild(deleteBtn);
            customItemsContainer.appendChild(customItem);
        });
    }

    // Add new custom item
    function addCustomItem() {
        const text = newItemInput.value.trim();
        if (text === '') return;
        
        const newItem = {
            id: Date.now(),
            text: text,
            completed: false
        };
        
        customItems.push(newItem);
        newItemInput.value = '';
        createCustomItems();
    }

    // Event listeners
    addItemButton.addEventListener('click', addCustomItem);
    
    newItemInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addCustomItem();
        }
    });
    
    clearCustomButton.addEventListener('click', function() {
        if (customItems.length > 0 && confirm('Are you sure you want to clear all custom tasks?')) {
            customItems = [];
            createCustomItems();
        }
    });

    // Initialize the app
    createTodoLists();
    createCustomItems();
});