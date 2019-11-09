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

// Return the last element in an array
if (!Array.prototype.last)
{
	Array.prototype.last = function() {
		return this[this.length - 1];
	}
}

// Return the last element in a NodeList
if (!NodeList.prototype.last)
{
	NodeList.prototype.last = function() {
		return this[this.length - 1];
	}
}

// Return a random element from an Array
if (!Array.prototype.random)
{
	Array.prototype.random = function() {
		return this[Math.floor(Math.random()*this.length)];
	}
}

// Generate range of numbers
const range = function*(start, end, step) {
	// range(n) is the same as range(0,n)
	if (isUndefined(end))
	{
		end = start;
		start = 0;
	}
	// Default step of 1 or -1
	if (isUndefined(step)) step = start < end ? 1 : -1;
	for (var i = start; step > 0 ? i <= end : i >= end; i += step)
	{
		yield i;
	}
}

// Sleep for a specified number of ms
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Wait for condition to be true
const until = function(condition) {
	const poll = resolve => {
		if (condition())
		{
			resolve();
		}
		else
		{
			setTimeout(() => poll(resolve), 100);
		}
	}
	return new Promise(poll);
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
		type: messageType.in,
		user: "C.H.A.T.B.O.T.",
		text: "Hello! Why don't we play a game of Connect 4 together?"
	}
];

var messages = initialMessages;

window.onload = function() {
	// Declarations
	var messageInputEl = document.getElementById("message-input");
	var sendButtonEl = document.getElementById("send-button");
	var replyButtonEl = document.getElementById("reply-button");
	
	// Libraries are nice
	autosize(messageInputEl);
	
	// Append the initial messages to the DOM
	messages.forEach(function(msg) {
		appendMessageObject(msg);
	});
	
	// Run the chatbot
	chatInit();
	runChat();
	
	// Add event handlers
	sendButtonEl.onclick = addMessageHandler;
	replyButtonEl.onclick = addMessageHandler;
	messageInputEl.onkeydown = function(e) {
		// If ENTER pressed and not Shift pressed...
		if ((e.keyCode == 13) && !(e.shiftKey))
		{
			// Stop a newline from being entered
			e.preventDefault();
			// If less than a certain length...
			if (this.value.length <= 2000)
			{
				// Send the message
				sendButtonEl.click();
			}
		}
	}
}

// Message constructor
function Message(type, user, text) {
	this.type = type;
	this.user = user;
	this.text = text;
}

// Handle an event that triggers the addition of a message
function addMessageHandler(event) {
	var user, type;
	var messageInputEl = document.getElementById("message-input");
	
	// Determine message type and set message variables accordingly
	switch (event.target.id)
	{
		case "send-button":
			user = "Me";
			type = messageType.out;
			break;
		case "reply-button":
			user = "Me";
			type = messageType.in;
			break;
		default:
			user = "unknown";
			type = messageType.unknown;
			break;
	}
	
	// Create new message object
	if (!messageInputEl.value.isNullOrWhitespace())
	{
		appendMessage(type, user, messageInputEl.value);
		// Reset input
		messageInputEl.value = "";
		autosize.update(messageInputEl);
		// Return control to the chatbot
		if (type == messageType.out) chatbot.active = true;
	}
}

// Append message using type, user, and text
function appendMessage(type, user, text) {
	var msg = new Message(type, user, text);
	appendMessageObject(msg);
}

// Append an existing message object
function appendMessageObject(msg) {
	var messageInputEl = document.getElementById("message-input");
	var messageContainerEl = document.getElementById("message-container");
	var typingAnimationEl = document.getElementById("message-typing");
	
	// Remove the tail on the last message if it has the same type and user
	var messageDivs = messageContainerEl.querySelectorAll(".message");
	if (messageDivs.length > 0)
	{
		var lastMessageEl = messageDivs.last();
		if (lastMessageEl.getAttribute("data-user") == msg.user && lastMessageEl.getAttribute("data-type") == msg.type)
		{
			lastMessageEl.removeAttribute("data-tail");
		}
	}
	messages.push(msg);
	if (msg.type === messageType.out) chatbot.messages.push(msg);
	// Create text element for the message
	var messageString = msg.text;
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
	messageEl.setAttribute("data-type", msg.type);
	messageEl.setAttribute("data-user", msg.user);
	messageEl.setAttribute("data-tail","");
	// Hide the typing animation
	hideTyping();
	// Add message element to the DOM
	messageContainerEl.insertBefore(messageEl, typingAnimationEl);
	// Scroll down to the message
	scrollMessages();
}

// Scroll the message container all the way to the bottom
function scrollMessages() {
	var messageContainerEl = document.getElementById("message-container");
	messageContainerEl.scrollTop = messageContainerEl.scrollHeight;
}

// Show typing animation
function showTyping() {
	var typingAnimationEl = document.getElementById("message-typing");
	typingAnimationEl.style.display = "block";
	scrollMessages();
}

// Hide typing animation
function hideTyping() {
	var typingAnimationEl = document.getElementById("message-typing");
	typingAnimationEl.style.display = "none";
	scrollMessages();
}