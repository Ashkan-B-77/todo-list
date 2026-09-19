// Declaring the variables that hold the DOM elements.
const elAddTaskBtn = document.querySelector("#addTaskBtn");
const elTaskInput = document.querySelector("#taskInput");
const elTaskList = document.querySelector("#taskList");
const elWarningMsg = document.querySelector("#warningMsg");

// Code for adding tasks by clicking the "add task" button.
elAddTaskBtn.addEventListener("click", addTodoItem);

function addTodoItem(){
    const inputText = elTaskInput.value;

    if (inputText.trim() === "") {
        elWarningMsg.textContent = "The input is empty!";
        return;
    }
    elWarningMsg.textContent = ""; // Clear the warning message if text is added.

    const newItem = document.createElement("li");
    elTaskList.appendChild(newItem);

    const newItemLabel = document.createElement("span");
    newItemLabel.textContent = inputText;
    newItem.appendChild(newItemLabel);

    elTaskInput.value = ""; // Clear the input after every addition.
}





