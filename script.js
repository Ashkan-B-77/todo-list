/* Note - To easily rmemeber which variable does what I've used prefixes for these variables:
        I've used the prefix "el" for variables which hold DOM elements. 
        I've used the prefix "new" for variables that create elements within the DOM.
*/

// Declaring the variables that hold the DOM elements.
const elAddTaskBtn = document.querySelector("#addTaskBtn");
const elTaskInput = document.querySelector("#taskInput");
const elTaskList = document.querySelector("#taskList");
const elWarningMsg = document.querySelector("#warningMsg");
const elNumOfCompletes = document.querySelector("#numOfCompletes");

let completedCount = 0; // Declare a variable for showing the number of completed tasks in an html placeholder, to be used in the "completed" section below.


elAddTaskBtn.addEventListener("click", addTodoItem); // Runs the function below if the task button is clicked.

function addTodoItem(){
    const inputText = elTaskInput.value; // Creates a variable from the text in the html input, to be used later in the function.

    if (inputText.trim() === "") { // Using trim() here instead of "inputText.length == 0" because it gives the warning even with whitespace.
        elWarningMsg.textContent = "The input is empty!";
        return;
    }
    elWarningMsg.textContent = ""; // Clears the warning message if text is added. This works without an "else" statement.

    const newItem = document.createElement("li"); // Creates a variable with the job of creating list items (in memory).
    elTaskList.appendChild(newItem); // adds the created list items inside of the empty html "ul" tag. (it creates only empty "li" elements, no text).
    // Continuation of the two lines above.
    const newItemLabel = document.createElement("span"); // Creates a variable with the job of creating span elements (in memory).
    newItemLabel.textContent = inputText; // sets the created span elements to be the text in the html input.
    newItem.appendChild(newItemLabel); // adds the created span element (with the input-text included) to the "li" elements which it created above.

    // Adds the class name "completed" to list items that you click on. That class is styled in the CSS file.    
    newItemLabel.addEventListener("click", function () { // listens to clicks on the list items, runs the function below if clicked.
        if (newItem.getAttribute("class") == "completed") { // checks to see if class name "completed" is set on a list item.
            newItem.setAttribute("class", ""); // removes the class name "completed" from list items if you click on them again. Which then removes the styles.
            completedCount--; // decrement the count variable by 1; if you click on a completed list item.
        }
        else {
            newItem.setAttribute("class", "completed"); // sets the class name "completed" to items you click on the first time, which then puts on the styles.
            completedCount++; // increment the count variable by 1; if you click on an uncompleted list item.
        }

        elNumOfCompletes.textContent = completedCount; // Shows the number of completes in the chosen html placeholder.
    });

    elTaskInput.value = ""; // Clears the input after adding a task.
}





