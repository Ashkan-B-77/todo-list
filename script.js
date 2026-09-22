/* Note - To easily remember which variable does what I've used prefixes for these variables:
        I've used the prefix "el" for variables which hold DOM elements. 
        I've used the prefix "new" for variables that create elements within the DOM.
*/

// ---------- Declaring the variables that hold the DOM elements ----------
const elAddTaskBtn = document.querySelector("#addTaskBtn");
const elTaskInput = document.querySelector("#taskInput");
const elTaskList = document.querySelector("#taskList");
const elWarningMsg = document.querySelector("#warningMsg");
const elNumOfCompletes = document.querySelector("#numOfCompletes");

// ---------- Declaring a variable for the section "completed..." ----------
let completedCount = 0; // Declare a variable for showing the number of completed tasks in an html placeholder, to be used in the "completed" section below.

// ---------- Declaring variables for the section "adding list items to an array" ----------
let taskData = []; // Creates an empty array variable that stores the list items as objects.
let nextId = 1; // Creates a counter variable to give each list item a unique id.



// ---------- The main function ----------
elAddTaskBtn.addEventListener("click", addTodoItem); // Runs the function below if the task button is clicked.
function addTodoItem(){
    const inputText = elTaskInput.value; // Creates a variable from the text in the html input, to be used later in the function.

    // ----- Warning message -----
    if (inputText.trim() === "") { // Using trim() here instead of "inputText.length == 0" because it gives the warning even with whitespace.
        elWarningMsg.textContent = "The input is empty!";
        return;
    }
    elWarningMsg.textContent = ""; // Clears the warning message if text is added. This works without an "else" statement.

    // ----- Creation of list items -----
    const newItem = document.createElement("li"); // Creates a variable with the job of creating list items (in memory).
    elTaskList.appendChild(newItem); // adds the created list items inside of the empty html "ul" tag. (it creates only empty "li" elements, no text).
    // Continuation of the "li" creation lines from above.
    const newItemLabel = document.createElement("span"); // Creates a variable with the job of creating span elements (in memory).
    newItemLabel.textContent = inputText; // sets the created span elements to be the text in the html input.
    newItem.appendChild(newItemLabel); // adds the created span element (with the input-text included) to the "li" elements which it created above.

    // ----- Adding list items to an array -----
    const taskId = nextId++; // assigns a list item a unique id, and increments the counter.
    newItem.dataset.id = taskId; // stores that id on the "li" so it can be matched back to its object in taskData later.

    const newTask = {id: taskId, text: inputText, completed: false}; // creates an object holding the li data, id, text, and completed status.
    taskData.push(newTask); // adds the created object above to the end of the taskData array.

    // ----- Adds the class name "completed" to list items that you click on. That class is styled in the CSS file -----    
    newItemLabel.addEventListener("click", function () { // listens for clicks on the list items, runs the function below if clicked.
        if (newItem.getAttribute("class") == "completed") { // checks to see if class name "completed" is set on a list item.
            newItem.setAttribute("class", ""); // removes the class name "completed" from list items if you click on them again. Which then removes the styles.
            completedCount--; // decrement the count variable by 1; if you click on a completed list item.
        }
        else {
            newItem.setAttribute("class", "completed"); // sets the class name "completed" to items you click on the first time, which then puts on the styles.
            completedCount++; // increment the count variable by 1; if you click on an uncompleted list item.
        }

        elNumOfCompletes.textContent = completedCount; // Shows the number of completes in the chosen html placeholder.

        const matchingTask = taskData.find(task => task.id === taskId); // finds the object in taskData whose id matches this task's id.
        matchingTask.completed = !matchingTask.completed; // flips its completed boolean (true to false, false to true).
    });

    // ----- Creates a delete button and adds it to the list items -----
    const newDeleteBtn = document.createElement("button"); // creates a variable with the job of creating a button element (in memory).
    newDeleteBtn.textContent = "🗑️"; // sets a trash can icon for the button (from windows emojis). To enter the emoji character code instead then you have to change "textContent" to "innerHTML".
    newDeleteBtn.setAttribute("class", "deleteBtn"); // adds a class to the del button so you can style it in the CSS file.
    newItem.appendChild(newDeleteBtn); // adds the created delete button inside list items.

    newDeleteBtn.addEventListener("click", function () { // listens for clicks on the delete button.
        const matchingTask = taskData.find(task => task.id === taskId); // finds this task's object before it's removed (array function).

        if (matchingTask.completed) { // if it was marked completed then:
            completedCount--; // ...decrease the count, since it's about to be deleted.
            elNumOfCompletes.textContent = completedCount; // update the displayed completed count number (could use string template here but i only need the "completedCount" variable here for my code).
        }

        newItem.remove(); // removes the li from the shown item list.
        taskData = taskData.filter(task => task.id !== taskId); // creates a new array excluding this task, and stores it back in taskData (array function).
    });

    elTaskInput.value = ""; // Clears the input after adding a task.
}