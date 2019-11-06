// Helper functions

// Check if a value is undefined
const isUndefined = v => typeof v === "undefined";

// Check if string is either undefined or full of whitespace
String.prototype.isNullOrWhitespace = function() {
	if (isUndefined(this) || this == null) return true;
	return this.replace(/\s/g, "").length < 1;
}

// Now the REAL code begins

// Global declarations
var messageType = {
	in: "in-message",
	out: "out-message",
	unknown: "unknown-message"
};
var initialMessages = [
	{
		type: messageType.out,
		user: "Mike",
		message: "Hey, do you have lunch plans?"
	},
	{
		type: messageType.in,
		user: "Joe",
		message: "Hi Mike! No, how about QDoba? 🍔"
	},
	{
		type: messageType.out,
		user: "Mike",
		message: "Ok, let's go 😋🍴 I'll meet you there"
	}
];

var messages = initialMessages;

window.onload = function() {
	// Declarations
	var messageInputEl = document.getElementById("message-input");
	var sendButtonEl = document.getElementById("send-button");
	var replyButtonEl = document.getElementById("reply-button");
	
	autosize(messageInputEl);
	
	messages.forEach(function(msg) {
		appendMessageObject(msg);
	});
	
	sendButtonEl.onclick = addMessageHandler;
	replyButtonEl.onclick = addMessageHandler;
	messageInputEl.onkeydown = function(e) {
		// If ENTER pressed and not Shift pressed...
		if ((e.keyCode == 13) && !(e.shiftKey)) {
			// Stop a newline from being entered
			e.preventDefault();
			// If less than a certain length...
			if (this.value.length <= 2000) {
				// Send the message
				sendButtonEl.click();
			}
		}
	}
}

// Message constructor
function Message(type, user, message) {
	this.type = type;
	this.user = user;
	this.message = message;
}

// Handle an event that triggers the addition of a message
function addMessageHandler(event) {
	var user, type;
	var messageInputEl = document.getElementById("message-input");
	
	// Determine message type and set message variables accordingly
	switch (event.target.id) {
		case "send-button":
			user = "Mike";
			type = messageType.out;
			break;
		case "reply-button":
			user = "Joe";
			type = messageType.in;
			break;
		default:
			user = "unknown";
			type = messageType.unknown;
			break;
	}
	
	// Create new message object
	if (!messageInputEl.value.isNullOrWhitespace()) {
		appendMessage(type, user, messageInputEl.value);
	}
}

// Append message using type, user, and message
function appendMessage(type, user, message) {
	var msg = new Message(type, user, message);
	appendMessageObject(msg);
}

// Append an existing message object
function appendMessageObject(msg) {
	var messageInputEl = document.getElementById("message-input");
	var messageContainerEl = document.getElementById("message-container");
	
	messages.push(msg);
	// Create text element for the message
	var messageString = msg.message;
	// Create message element and insert the message text
	var messageEl = document.createElement("div");
	messageString.split(/\r\n|\r|\n/).forEach(function(line,i,lines) {
		messageEl.appendChild(document.createTextNode(line));
		if (i < lines.length-1) messageEl.appendChild(document.createElement("br"));
	});
	// Make the emojis look cool
	twemoji.parse(messageEl);
	// Add classes that make it a message
	messageEl.classList.add("message");
	messageEl.classList.add(msg.type);
	messageEl.setAttribute("data-user", msg.user);
	// Add message element to the DOM
	messageContainerEl.appendChild(messageEl);
	// Reset input
	messageInputEl.value = "";
	autosize.update(messageInputEl);
}