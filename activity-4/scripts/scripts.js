// Helper functions

// Execute a function for each item in a list
const forEach = function (list, func) {
	Array.prototype.forEach.call(list, func);
};

// Now the REAL code begins

// Declarations
var tocEl = document.getElementById("toc-container");
var tocHTML =
	"<h2>On this page:</h2>" +
	"<ul>";

var nextLine, productTitle, productLink;

// Iterate over every product on the page
forEach(document.getElementsByClassName("product"), function(el) {
	productTitle = el.querySelector(".product-name").textContent;
	productLink = "#" + el.getAttribute("id");
	nextLine =
		"<li>" +
			"<a href='" + productLink + "'>" +
				productTitle +
			"</a>" +
		"</li>";
	tocHTML += nextLine;
});

tocHTML += "</ul>";

tocEl.innerHTML = tocHTML;