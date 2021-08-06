
/* global
 *    HSB, background, color, colorMode, createCanvas, ellipse, fill, height,
 *    noStroke, random, strokeWeight, text, textSize, width,
addToGrid, isValid, resetGrid, piece, show, rect, noStroke, fill

*/
let time,
highScore =0,
score =0 ,
gameIsOver, 
counter = 0;

class Playfield {
  
	constructor(w, h) {
		// colors
		this.foreground = color("lightgray");
		this.background = color("black");

		// dimensions and grid
		this.cols = w;
		this.rows = h;
		this.grid = [];
		this.resetGrid();
		
		// drawing sizes
		this.cellSize = 21;
		this.borderSize = 3;

		// whether or not gridlines are seen
		this.gridlines = true;

	}

	addToGrid(piece) {
		for (let row = 0; row < piece.size; row++) {
			for (let col = 0; col < piece.size; col++) {
				
				if (piece.cells[row][col] != null) {
					let gridRow = piece.y + row;
					let gridCol = piece.x + col;

					this.grid[gridRow][gridCol] = 
						piece.cells[row][col];
				}
			}
		}	
	}
	
	clearLines() {
		for (let row = this.rows-1; row >= 0; row--) {

			// if this row is full
			if (!this.grid[row].includes(this.foreground)) {
				// remove the row
				this.grid.splice(row, 1)
				// and add an empty row to the top
				this.grid.unshift(new Array(this.cols).fill(this.foreground));
				score += 100;
			}
		}
	}
	
	isValid(piece) {
		for (let row = 0; row < piece.size; row++) {
			for (let col = 0; col < piece.size; col++) {
				
				if (piece.cells[row][col] != null) {
					
					let gridRow = piece.y + row;
					let gridCol = piece.x + col;
					
					if (gridRow < 0 || gridRow >= this.rows ||
							gridCol < 0 || gridCol >= this.cols ||
							this.grid[gridRow][gridCol] != this.foreground)
						return false;
				}
			}
		}
		return true;
	}
	
	
	resetGrid() {
		for (let i = 0; i < this.rows; i++) {
			this.grid[i] = new Array(this.cols).fill(this.foreground);
		}
    time = 0;
    gameIsOver = false;
    score = 0;
    highScore = 0;
	}

	
	show() {
		//===========================
		// Draw the rectangle behind all the cells
		// for the border and gridlines
		//===========================
    
		let bs = this.borderSize
		let cs = this.cellSize

		if (this.gridlines) fill(this.background);
		else fill(this.foreground);
		
		stroke(this.background)
		strokeWeight(bs);

		// offset the rectangle so that
		// top and right borders stay in canvas
		let offset = floor(bs / 2)
		rect(offset, offset, cs * this.cols + bs - 1, cs * this.rows + bs - 1)
		
		//===========================
		// End of big rectangle 
		//===========================
		
		
		//===========================
		// Draw cells over the big rectangle
		//===========================

		for (let row = 0; row < this.grid.length; row++) {
			for (let col = 0; col < this.grid[row].length; col++) {
				
				// offset the cells by the size of the border
				let offset = this.borderSize;
				
				let cs = this.cellSize;

				// this.grid contains the colors of each cell
				fill(this.grid[row][col]);
				
				noStroke();
				rect(cs * col + offset, cs * row + offset, cs - 1, cs - 1);
			}
		}
		
		//===========================
		// End of cells loop
		//===========================

		
	} // end of show()
}

function scoreboard(){
		textFont('roboto');
		fill(100, 0, 100); // some color
		handleTime();
		if (!gameIsOver) {
			// Add text with the time remaining:
			text(`High Score: ${highScore}`, 10, 20);
			text(`Current score: ${score}`, 10, 40);
			text(`Time Spent: ${counter}`, 10, 60);
		}else {
			fill(0, 0, 100); // RED
			textSize(50);
			textAlign(CENTER);
			text(`GAME OVER`, 200, 200);
			textSize(30);
			text(`SCORE: ${score}`,250, 300);
			if(score == highScore) {
			 text(`NEW HIGH SCORE!!`, 200, 260);
			 }
			text(`HIGH SCORE: ${highScore}`, 200, 290);
		}
		}

function handleTime(){
		// 1 counter = 1 second
		if (counter >= 0) {
			counter = round(performance.now() / 1000);
		}
		}
