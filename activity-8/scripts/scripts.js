// Helper functions

// Check if string is either undefined or full of whitespace
const isNullOrWhitespace = function(str) {
	if (isUndefined(str) || str == null) return true;
	return str.replace(/\s/g, "").length < 1;
}

// Check if a value is undefined
const isUndefined = v => typeof v === "undefined";

// Get an element by its ID (shorthand)
const get = id => document.getElementById(id);

// Now the REAL code begins

window.onload = function() {
	var newButton = get("new-button");
	var cancelButton = get("cancel-button");
	var saveButton = get("save-button");
	var modalBackdrop = get("modal-backdrop");
	
	newButton.addEventListener("click", openModal);
	cancelButton.addEventListener("click", closeModal);
	saveButton.addEventListener("click", saveContent);
	modalBackdrop.addEventListener("click", closeModal);
}

function openModal() {
	var modal = get("modal-dialog");
	var backdrop = get("modal-backdrop");
	
	modal.classList.add("visible");
	backdrop.classList.add("visible");
}

function closeModal() {
	var title = get("edit-title-text");
	var text = get("edit-content-text");
	var modal = get("modal-dialog");
	var backdrop = get("modal-backdrop");
	
	// Clear text
	title.value = "";
	text.value = "";
	
	// Hide modal
	modal.classList.remove("visible");
	backdrop.classList.remove("visible");
}

function saveContent() {
	var title = get("edit-title-text");
	var text = get("edit-content-text");
	var content = get("display-content");
	
	if (!isNullOrWhitespace(title.value) && !isNullOrWhitespace(text.value))
	{
		// Create content elements
		var newTitle = document.createElement("h2");
		var newTitleText = document.createTextNode(title.value);
		var newContent = document.createElement("p");
		var newContentText = document.createTextNode(text.value);
		
		// Add elements
		newTitle.appendChild(newTitleText);
		newContent.appendChild(newContentText);
		content.appendChild(newTitle);
		content.appendChild(newContent);
		
		closeModal();
	}
}