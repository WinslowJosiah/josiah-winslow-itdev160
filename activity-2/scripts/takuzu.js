// Helper functions

const arraysEqual = (arr1, arr2) => {
	// Return true if same array
	if (arr1 === arr2) return true;
	// Return false if either is null
	if (arr1 == null || arr2 == null) return false;
	// Return false if lengths different
	if (arr1.length != arr2.length) return false;
	// Return false if any single element different
	for (var i = 0; i < arr1.length; i++)
	{
		if (Array.isArray(arr1[i]) && Array.isArray(arr2[i]))
		{
			if (!arraysEqual(arr1[i],arr2[i])) return false;
		}
		else
		{
			if (arr1[i] !== arr2[i]) return false;
		}
	}
	// Otherwise, return true
	return true;
};

Array.prototype.countOf = function(value) {
	var counter = 0;
	forEach(this, v => {
		if (v==value) counter++;
	});
	return counter;
}

const distinct = (value, index, self) => self.indexOf(value) === index;

const forEach = function (item, func) {
	Array.prototype.forEach.call(item, func);
};

const isUndefined = v => typeof v === "undefined";

Array.prototype.transpose = function() {
	return this[0].map((col, i) => this.map(row => row[i]));
};

// Make indexOf work with nested arrays
(function() {
	var cachedIndexOf = Array.prototype.indexOf;
	
	Array.prototype.indexOf = function (searchElement, fromIndex) {
		if (!Array.isArray(searchElement)) return cachedIndexOf.apply(this, arguments);
		
		// Default fromIndex of 0
		fromIndex = fromIndex || 0;
		// Default return value of -1
		var firstIndex = -1;
		// Return first index where values equal
		for (var i = 0; i < this.length; i++)
		{
			if (Array.isArray(this[i]) && arraysEqual(this[i], searchElement))
			{
				firstIndex = i;
				break;
			}
		}
		return firstIndex;
	};
})();

// Now the REAL code begins

window.onload = function() {
	// Declarations
	takuzuGameEl = document.getElementById("takuzu-game");
	takuzuCellsVoid = document.querySelectorAll("#takuzu tr td.void");
	
	// For each clickable cell...
	forEach(takuzuCellsVoid, function(cell) {
		// Change cursor to pointer (they're buttons)
		cell.style.cursor = "pointer";
		cell.onclick = function() {
			// If cell is symbol 1...
			if (this.classList.contains("tohu"))
			{
				// Change to symbol 2
				this.classList.toggle("tohu",false);
				this.classList.add("vohu");
			}
			// If cell is symbol 2...
			else if (this.classList.contains("vohu"))
			{
				// Change to empty
				this.classList.toggle("vohu",false);
			}
			// If cell is empty...
			else
			{
				// Change to symbol 1
				this.classList.add("tohu");
			}
			checkForWin();
		};
	});
};

function checkForWin() {
	takuzuRows = document.querySelectorAll("#takuzu tr");
	
	var takuzu = [];
	forEach(takuzuRows, function(row) {
		var thisRow = [];
		var takuzuColumns = row.getElementsByTagName("td");
		forEach(takuzuColumns, function(col) {
			var value;
			if (col.classList.contains("tohu"))
			{
				value = 0;
			}
			else if (col.classList.contains("vohu"))
			{
				value = 1;
			}
			else
			{
				value = undefined; // Hooray for undefined!
			}
			thisRow.push(value);
		});
		takuzu.push(thisRow);
	});
	
	if (
		// If every square is filled...
		takuzu.every(row => row.every(col => !isUndefined(col)))
		&&
		// ...and every row contains the name number of each symbol...
		takuzu.every(row => row.countOf(0) == row.countOf(1))
		&&
		// ...and every column contains the name number of each symbol...
		takuzu.transpose().every(col => col.countOf(0) == col.countOf(1))
		&&
		// ...and no rows contain 3 of the same symbol in a row...
		takuzu.every(row => !checkRunOf3(row))
		&&
		// ...and no columns contain 3 of the same symbol in a row...
		takuzu.transpose().every(col => !checkRunOf3(col))
		&&
		// ...and every row is unique...
		arraysEqual(takuzu,takuzu.filter(distinct))
		&&
		// ...and every column is unique...
		arraysEqual(takuzu.transpose(),takuzu.transpose().filter(distinct))
	)
	{
		// You win!
		takuzuGameEl.classList.toggle("win", true);
	}
	else
	{
		// You've got a while to go
		takuzuGameEl.classList.toggle("win", false);
	}
}

function checkRunOf3(arr) {
	var run = 1;
	var lastVal;
	for (v of arr) {
		if (v==lastVal)
		{
			run++;
			if (run>=3) return true;
		}
		else
		{
			lastVal = v;
			run = 1;
		}
	}
	return false;
}