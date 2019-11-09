// Declarations

var chatbot;
const chatState = {
	c4Diff: "connect4-setDifficulty",
	c4Game: "connect4-game",
	c4GameOver: "connect4-gameOver",
};

const EMOJI = {
	COLLISION_SYMBOL: "\uD83D\uDCA5",
	CROSS_MARK: "\u274C",
	DOWN_POINTING_RED_TRIANGLE: "\uD83D\uDD3B",
	HANDSHAKE: "\uD83E\uDD1D",
	INPUT_SYMBOL_FOR_NUMBERS: "\uD83D\uDD22",
	KEYCAP: "\uFE0F\u20E3",
	LARGE_RED_CIRCLE: "\uD83D\uDD34",
	LARGE_YELLOW_CIRCLE: "\uD83D\uDFE1",
	SMILING_FACE_WITH_OPEN_MOUTH_AND_SMILING_EYES: "\uD83D\uDE04",
	WHITE_MEDIUM_SQUARE: "\u25FB",
	WINKING_FACE: "\uD83D\uDE09"
}

const emojiRegex = /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/g;

// Initialize the chat
function chatInit() {
	chatbot = {
		state: undefined,
		active: true,
		name: "C.H.A.T.B.O.T.",
		messages: [],
		con4: {
			COLS: 7,
			ROWS: 6,
			diff: undefined,
			board: undefined,
			lastMove: undefined,
			cpuTurn: undefined,
			firstEmptyRow: function(col) {
				var row = -1;
				while (this.board[row + 1][col] == 0) {
					row++;
					if (row + 1 >= this.ROWS) break;
				}
				return row;
			},
			makeMove: function(col) {
				if (col >= 0 && col < this.COLS)
				{
					var row = this.firstEmptyRow(col);
					if (row >= 0)
					{
						this.board[row][col] = this.cpuTurn ? 1 : 2;
						this.lastMove = col;
						return true;
					}
				}
				return false;
			},
			winner: function() {
				var lastRow = (this.firstEmptyRow(this.lastMove) + 1);
				var lastCol = this.lastMove;
				var lastPlayer = this.board[lastRow][lastCol];
				
				function checkDir(dir, explode) {
					var total = 0;
					
					var i = lastRow + dir.i;
					var j = lastCol + dir.j;
					while (i >= 0 && i < this.ROWS && j >= 0 && j < this.COLS && this.board[i][j]==lastPlayer) {
						// If you won, turn the winning pieces into explosions
						if (explode) this.board[i][j] = 3;
						total++;
						i += dir.i;
						j += dir.j;
					}
					return total;
				}
				
				function checkFour(dirA, dirB) {
					var fourInARow = (1 + checkDir.call(this, dirA) + checkDir.call(this, dirB) >= 4);
					// If you won...
					if (fourInARow)
					{
						// Turn the winning pieces into explosions
						checkDir.call(this, dirA, true);
						checkDir.call(this, dirB, true);
						this.board[lastRow][lastCol] = 3;
					}
					return fourInARow;
				}
				
				var dirsToCheck = [
					[{i: 0, j: -1}, {i: 0, j: 1}], // Horizontal
					[{i: -1, j: 0}, {i: 1, j: 0}], // Vertical
					[{i: 1, j: -1}, {i: -1, j: 1}], // Diagonal (/)
					[{i: 1, j: 1}, {i: -1, j: -1}] // Diagonal (\)
				];
				
				for (var dirs of dirsToCheck)
				{
					if (checkFour.apply(this, dirs)) return lastPlayer;
				}
				
				return false;
			},
			boardToString: function() {
				var boardRows = [];
				
				for (var i = 0; i < this.ROWS; i++)
				{
					var boardRow = "";
					this.board[i].forEach(function(stone) {
						boardRow += [EMOJI.WHITE_MEDIUM_SQUARE, EMOJI.LARGE_RED_CIRCLE, EMOJI.LARGE_YELLOW_CIRCLE, EMOJI.COLLISION_SYMBOL][stone];
					});
					boardRows.push(boardRow);
				}
				
				return boardRows.join("\n");
			},
			movementToString: function(col) {
				return [...range(0,6)].map(n => n==col ? EMOJI.DOWN_POINTING_RED_TRIANGLE : (this.firstEmptyRow(n) < 0 ? EMOJI.CROSS_MARK : (n+1).toString() + EMOJI.KEYCAP)).join("");
			},
			validColsToString: function() {
				return [...range(0,6)].map(n => this.firstEmptyRow(n) < 0 ? EMOJI.CROSS_MARK : (n+1).toString() + EMOJI.KEYCAP).join("");
			}
		}
	};
};

// Execute the logic behind the chat
async function runChat() {
	var con4 = chatbot.con4;
	
	while (true) {
		con4.state = chatState.c4Diff;
		con4.diff = undefined;
		// Loop until a difficulty setting has been chosen
		do {
			await sendMsg(`Choose your difficulty...
1${EMOJI.KEYCAP}: Easy
2${EMOJI.KEYCAP}: Medium
3${EMOJI.KEYCAP}: Hard`);
			
			chatbot.active = false;
			await until(() => chatbot.active);
			
			processMessages(function(msg, index){
				if (isUndefined(con4.diff))
				{
					if (msg.text.match(/^\s*(?:1|easy)\s*$/i))
					{
						con4.diff = 0;
					}
					else if (msg.text.match(/^\s*(?:2|med(ium)?)\s*$/i))
					{
						con4.diff = 1;
					}
					else if (msg.text.match(/^\s*(?:3|hard)\s*$/i))
					{
						con4.diff = 2;
					}
				}
			});
			
			if (isUndefined(con4.diff))
			{
				await sendMsg(`Whoops! That's not a valid difficulty setting!`);
			}
		} while (isUndefined(con4.diff));
		
		await sendMsg(`You chose ${["Easy", "Medium", "Hard"][con4.diff]}. This is gonna be fun...`);
		
		// Populate Connect 4 board
		con4.board = [];
		for (var i = 0; i < con4.ROWS; i++)
		{
			con4.board[i] = [];
			for (var j = 0; j < con4.COLS; j++)
			{
				con4.board[i][j] = 0;
			}
		}
		
		// Define initial variables
		con4.cpuTurn = false;
		con4.lastMove = undefined;
		
		// Play Connect 4 game
		chatbot.state = chatState.c4Game;
		await sendMsg(`Here is the game board.

${con4.validColsToString()}
${con4.boardToString()}`);
		do {
			// Allow the next move to be made
			await makeMove(con4.cpuTurn);
			// If someone won, stop playing
			if (con4.winner()) break;
			con4.cpuTurn = !con4.cpuTurn;
		} while (true);
		
		// Tell us who won
		chatbot.state = chatState.c4GameOver;
		if (con4.cpuTurn)
		{
			await sendMsg(`Looks like I won! ${EMOJI.SMILING_FACE_WITH_OPEN_MOUTH_AND_SMILING_EYES}

${con4.boardToString()}`);
		}
		else
		{
			await sendMsg(`Oh my, this is embarrassing...`);
			await sendMsg(`...I guess you won fair and square, my friend. ${EMOJI.HANDSHAKE} Good game.

${con4.boardToString()}`);
		}
		await sendMsg(`I'll reset the pieces, so we can start a new game! ${EMOJI.WINKING_FACE}`);
	}
}

// Connect 4 functions

async function makeMove(bot) {
	var con4 = chatbot.con4;
	var moveToMake;
	
	if (bot)
	{
		await sendMsg(`My turn!`);
		
		// Choose a good move
		// (At this point, it's just random)
		var validMoves = [];
		for (var i = 0; i < con4.COLS; i++)
		{
			if (con4.firstEmptyRow(i) >= 0)
			{
				validMoves.push(i);
			}
		}
		
		moveToMake = validMoves.random();
		
		// Make the chosen move
		con4.makeMove(moveToMake);
		await sendMsg(`I think I should go here:

${con4.movementToString(moveToMake)}
${con4.boardToString()}`);
	}
	else
	{
		// Ask for user input
		do {
			sendMsg(`Enter a column number from 1 to 7.`);
			chatbot.active = false;
			await until(() => chatbot.active);
			
			moveToMake = undefined;
			processMessages(function(msg, index) {
				var colMatch = msg.text.match(/^\s*(?:col(?:umn)?\s+)?(\d)\s*$/i);
				if (colMatch)
				{
					moveToMake = Number(colMatch[1]) - 1;
				}
			});
			
			var moveIsDefined = !isUndefined(moveToMake);
			var moveIsInBounds = moveToMake >= 0 && moveToMake < con4.COLS;
			var moveIsValid = con4.firstEmptyRow(moveToMake) >= 0;
			if (!moveIsDefined)
			{
				await sendMsg(`You must enter in a number.`);
				await sendMsg(`Here's the board again. There are numbers here for a reason...I expect you to use them! ${EMOJI.INPUT_SYMBOL_FOR_NUMBERS}

${con4.validColsToString()}
${con4.boardToString()}`);
			}
			else if (!moveIsInBounds)
			{
				await sendMsg(`That's not a valid column number.`);
				await sendMsg(`Here's the board again. You can make a move in any column from 1 to 7 that doesn't have a ${EMOJI.CROSS_MARK} over it.

${con4.validColsToString()}
${con4.boardToString()}`);
			}
			else if (!moveIsValid)
			{
				await sendMsg(`You can't make a move in that column.`);
				await sendMsg(`Here's the board again, so you know which moves are valid. If you see a ${EMOJI.CROSS_MARK} over a column, you can't make a move there.

${con4.validColsToString()}
${con4.boardToString()}`);
			}
		} while (!(moveIsDefined && moveIsInBounds && moveIsValid));
		
		// Make the chosen move
		con4.makeMove(moveToMake);
		
		await sendMsg(`${con4.movementToString(moveToMake)}
${con4.boardToString()}`);
	}
}

// Chatbot functions

// Send a message from the chatbot
async function sendMsg(text) {
	// Display the typing animation
	await sleep(500);
	showTyping();
	// Simulate typing
	await sleep(text.replace(emojiRegex, "").length * 15);
	// Hide the typing animation
	hideTyping();
	// Do the rather immediate work of adding the messages
	appendMessage(messageType.in, chatbot.name, text);
	// Discard all of the messages sent in that time
	processMessages(() => null);
}

// Run a function on every unprocessed message
function processMessages(callback) {
	var index = 0;
	var breakLoop = false;
	while (chatbot.messages.length > 0)
	{
		breakLoop = callback(chatbot.messages[0], index);
		chatbot.messages.shift();
		index++;
		if (breakLoop) break;
	}
}
