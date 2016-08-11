// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.width = 101;
    this.height = 171;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x + this.speed * dt <= 550) {
        this.x += this.speed * dt;
    }
    else {
        this.x = -90;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(){
    this.x = 202;
    this.y = 415;
    this.sprite = 'images/char-boy.png';
    this.width = 101;
    this.height = 171;
}

//Move player back to the starting position
Player.prototype.reset = function(){
    this.x = 202;
    this.y = 415;
}

// Draw the enemy on the screen
Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.update = function(){
    //check for a win
    if (this.y <= -25) {
        alert("Congratulations! You made it to the water. You win the game!");
        this.reset();
    }
    //check for collisions
};

Player.prototype.handleInput = function(move){
    //move player
    switch (move){
        case 'up':
            if (this.y - 44 >= -25) {
                this.y -= 44;
            }
            break;
        case 'down':
            if (this.y + 44 < 450) {
                this.y += 44;
            }
            break;
        case 'left':
            if (this.x - 50 >= 0) {
                this.x -= 50;
            }
            break;
        case 'right':
            if (this.x + 50 <= 425) {
                this.x += 50;
            }
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [new Enemy(5, 60, 120), new Enemy(5, 150, 80)];
var player = new Player();

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
