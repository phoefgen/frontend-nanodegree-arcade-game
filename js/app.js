// Enemies our player must avoid
var Enemy = function(xloc, yloc, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = xloc;
    this.y = yloc;
    this.speed = speed;
};


// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // Game is not over, Update Passed in enemy
    // Loop Enemies
    if ( this.x > 510 ){
      this.x = -100;
    }
    this.x = this.x + this.speed * dt;
    }

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function(enemy) {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};



// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 400;
}
Player.prototype.handleInput = function(key){
    if (key === 'left' && this.x >= 0) {
        if (this.x >= 0) {
            this.x = this.x - 75;
        }
    }
    if (key === 'right' && this.x <= 350) {
        this.x = this.x + 75;
        }
    if (key === 'up' && this.y >= 25) {
        console.log('up');
        this.y = this.y - 75;
    }
    if (key === 'down' && this.y <= 325) {
        console.log('down');
        this.y = this.y + 75;
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.update = function() {
    // Check for collisions with enemies.
    for (var i = 0; i < 3; i++) {
        if ((this.x < allEnemies[i].x + 72) && (this.x + 72 > allEnemies[i].x) && (this.y < allEnemies[i].y + 72) && (this.y + 72 > allEnemies[i].y)) {
           this.reset();
        }
    }
    // Player reaches target.
    if (player.y === -50) {
        this.reset();
    }
};

Player.prototype.reset = function() {
    // Reset player position.
    console.log("At time of reset:\n  Player X: " + player.x + " Player Y:  " + player.y);
    console.log("Enemy  X:  " + this.x + " Enemy Y: " + this.y );
    player.x = 200;
    player.y = 400;
    for (enemy of allEnemies) {
        enemy.x = -100;
    }
    alert("Game Over! Restarting!");
    console.log("game over");
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var numEnemies = 3; // Zero Indexed.
const startRows = [225, 130, 50];
let allEnemies  = [];

do {
    /* Generate Random enemy attributes*/

    // Set pseudo-random speed of bugs.
    let speed = Math.floor(Math.random() * (75 - 100 + 1)) + 75;
    // Set pseudo-random offscreen start of bugs
    let start = Math.floor(Math.random() * (-100 - 0 + 1)) + -100;
    // Select starting y position
    startRow = startRows.splice(0,1);

    /* Generate random enemy*/
    let bug = new Enemy(0, startRow, speed);
    allEnemies.push(bug);
    numEnemies --;
} while (numEnemies > 0);

const player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
