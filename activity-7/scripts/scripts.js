// Helper functions

// Check if a value is undefined
const isUndefined = v => typeof v === "undefined";

// Check if string is either undefined or full of whitespace
if (!String.prototype.isNullOrWhitespace)
{
	String.prototype.isNullOrWhitespace = function() {
		if (isUndefined(this) || this == null) return true;
		return this.replace(/\s/g, "").length < 1;
	}
}

// Now the REAL code begins

var tasks = [];

// Task status "enum"
var taskStatus = {
	active: "active",
	completed: "completed"
};

// Task constructor
function Task(id, name, status) {
	this.id = id;
	this.name = name;
	this.status = status;
}

// Click handler for adding new task
function addTask(e) {
	var inputEl = document.getElementById("input-task");
	
	if (!inputEl.value.isNullOrWhitespace())
	{
		// Create a unique ID
		var id = "item-" + tasks.length;
		
		// Create a new task
		var task = new Task(id, inputEl.value, taskStatus.active);
		
		// Append the task to the DOM
		addTaskElement(task);
		
		// Reset input
		inputEl.value = "";
	}
}

// Creates a new task element and adds it to the DOM
function addTaskElement(task) {
	// Create elements
	var listEl = document.getElementById("active-list");
	var taskEl = document.createElement("li");
	var textEl = document.createTextNode(task.name);
	
	// Set ID attribute
	taskEl.setAttribute("id", task.id);
	
	// Add text to task element
	taskEl.appendChild(textEl);
	
	// Add task element to list
	listEl.appendChild(taskEl);
}

// Click handler for completing task
function completeTask(e) {
	var completedListEl = document.getElementById("completed-list");
	
	var taskEl = event.target;
	var id = taskEl.id;
	
	// Find task and update its status
	for (var i = 0; i < tasks.length; i++)
	{
		if (tasks[i].id === id)
		{
			tasks[i].status = taskStatus.completed;
			break;
		}
	}
	
	// Move task element from active list to completed list
	taskEl.remove();
	completedListEl.appendChild(taskEl);
}

// Keypress handler to automatically click the add task button
function clickAddTaskButton(e) {
	var addButtonEl = document.getElementById("add-task");
	
	if (e.keyCode == 13)
	{
		// Don't do whatever you were gonna do!
		e.preventDefault();
		// Click on the button
		addButtonEl.click();
	}
}

// Initialize the app
function init() {
	var activeListEl = document.getElementById("active-list");
	var addButtonEl = document.getElementById("add-task");
	var inputTaskEl = document.getElementById("input-task");
	
	activeListEl.onclick = completeTask;
	addButtonEl.onclick = addTask;
	inputTaskEl.onkeydown = clickAddTaskButton;
}

window.onload = function() {
	init();
}