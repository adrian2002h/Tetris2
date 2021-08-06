// Name any p5.js functions we use in `global` so Glitch can recognize them.
/* global
 *    HSB, background, color, colorMode, createCanvas, ellipse, fill, height,
 *    noStroke, random, strokeWeight, text, textSize, width
 */

document.addEventListener('keydown', event => {
    if ([32, 37, 38, 39, 40].includes(event.keyCode)) {
    	event.preventDefault();
    }
    switch (event.keyCode) {
        
      // Down arrow
      case 40:
      	fallingPiece.moveDown();
        if (!playfield.isValid(fallingPiece))
          fallingPiece.moveUp()
        else
          fallingPiece.resetBuffer()
        break;
        
      // Left arrow
      case 37:
      	fallingPiece.moveLeft();
        if (!playfield.isValid(fallingPiece))
          fallingPiece.moveRight()
        break;

      // Right Arrow
      case 39:
      	fallingPiece.moveRight();
        if (!playfield.isValid(fallingPiece))
          fallingPiece.moveLeft()
        break;         
    }
        
});