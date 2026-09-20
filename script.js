// Declaring the variables that hold the DOM elements.
const elAddTaskBtn = document.querySelector("#addTaskBtn");
const elTaskInput = document.querySelector("#taskInput");
const elTaskList = document.querySelector("#taskList");
const elWarningMsg = document.querySelector("#warningMsg");

// The main function.
elAddTaskBtn.addEventListener("click", addTodoItem);

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

    newItemLabel.addEventListener("click", function () { // Adds the class name "completed" to items that you click on. That class name is styled in the CSS.
        if (newItem.getAttribute("class") == "completed") { // checks to see if the completed class name is set on an item.
            newItem.setAttribute("class", ""); // removes the class name completed from items if you click on them again.
        }
        else {
            newItem.setAttribute("class", "completed"); // sets the class name completed to items you click on the first time.
        }
    })

    elTaskInput.value = ""; // Clears the input after adding a task.
}





