// Helper functions

// Execute a function for each item in a list
const forEach = function (list, func) {
	Array.prototype.forEach.call(list, func);
};

// Check if a value is undefined
const isUndefined = v => typeof v === "undefined";

// Round number with certain "step"
const roundStep = function(value, step) {
	if (isUndefined(step)) step = 1.0;
	var inv = 1.0 / step;
	return Math.round(value * inv) / inv;
}

// This is a strange way to load content
var data = [
	{
		name: "HTML Snippets",
		description: "Full HTML tags including HTML5 Snippets",
		author: "Mohamed Abusaid",
		url: "https://marketplace.visualstudio.com/items?itemName=abusaidm.html-snippets",
		downloads: 2469024,
		stars: 4.3,
		selector: "p1",
	},
	{
		name: "CSS Peek",
		description: "Allow peeking to css ID and class strings as definitions from html files to respective CSS. Allows peek and goto definition.",
		author: "Pranay Prakash",
		url: "https://marketplace.visualstudio.com/items?itemName=pranaygp.vscode-css-peek",
		downloads: 533627,
		stars: 3.6,
		selector: "p2",
	},
	{
		name: "Rainbow Brackets",
		description: "A rainbow brackets extension for VS Code.",
		author: "2gua",
		url: "https://marketplace.visualstudio.com/items?itemName=2gua.rainbow-brackets",
		downloads: 303716,
		stars: 4.3,
		selector: "p3",
	},
];

// Package constructor
function Package(data) {
	this.name = data.name;
	this.description = data.description;
	this.author = data.author;
	this.url = data.url;
	this.downloads = data.downloads;
	this.stars = data.stars;
	this.selector = data.selector;
	
	this.getFormattedDownloads = function() {
		return this.downloads.toLocaleString();
	}
	
	this.getFormattedStars = function() {
		//return this.downloads.toLocaleString();
		var fullstar = "\u2605", halfstar = "\u2BEA", emptystar = "\u2606";
		var starCounter = roundStep(this.stars, .5);
		
		var formattedStars = "";
		for (var i = 0; i < 5; i++)
		{
			// Declarations
			var newStarChar,
			starFilledPortion = Math.min(starCounter, 1);
			// Decide which character to include for the current star
			switch(starFilledPortion) {
				case .5:
					newStarChar = halfstar;
					break;
				case 1:
					newStarChar = fullstar;
					break;
				default:
					newStarChar = emptystar;
					break;
			};
			// Add this character
			formattedStars += newStarChar
			// We've processed one of the stars, so subtract it
			starCounter = Math.max(0, starCounter - 1);
		}
		
		return formattedStars;
	}
}

// Write package info to page
function writePackageInfo(packData) {
	// Declarations
	var pack = new Package(packData),
	selector = pack.selector,
	nameEl = document.getElementById(selector + "-name"),
	descEl = document.getElementById(selector + "-description"),
	authEl = document.getElementById(selector + "-author"),
	downloadEl = document.getElementById(selector + "-downloads"),
	linkEl = document.getElementById(selector + "-link"),
	starsEl = document.getElementById(selector + "-stars");
	
	nameEl.textContent = pack.name;
	descEl.textContent = pack.description;
	authEl.textContent = pack.author;
	downloadEl.textContent = pack.getFormattedDownloads();
	linkEl.textContent = "Install";
	linkEl.setAttribute("href", pack.url);
	// Make the link open in another tab
	linkEl.setAttribute("target", "_blank");
	starsEl.textContent = pack.getFormattedStars();
}

// Initialize the script
function init() {
	forEach(data, function(packageData) {
		writePackageInfo(packageData);
	});
}

// Call init() on page load
init();