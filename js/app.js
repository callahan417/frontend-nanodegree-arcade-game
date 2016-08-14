// Enemies our player must avoid
var Enemy = function(x, y, speed, left) {
    // Enemy x and y positions
    this.x = x;
    this.y = y;

    //The amount by which each enemy moves during each cycle
    this.speed = speed;

    //distances of each actual side of sprite from the top left of the image:
    //(factors out transparent space)
    this.top = 77;
    this.bottom = 144;
    this.left = 10;
    this.right = 91;

    //Boolean variable to indicate whether the enemy moves to the left
    this.left = left;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // this.speed is multipled by the dt parameter
    // to ensure the game runs at the same speed for
    // all computers.
    if (this.left) {
        if (this.x - this.speed * dt > -90) {
            this.x -= this.speed * dt;
        }
        else {
            this.x = 550;
        }
    }
    else {
        if (this.x + this.speed * dt <= 550) {
            this.x += this.speed * dt;
        }
        else {
            this.x = -90;
        }
    }
};

// Draw the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Create Player class: entities that play the game
var Player = function() {
    // Player x and y positions
    this.x = 202;
    this.y = 415;

    //url of the Player sprite/image
    this.sprite = 'images/char-boy.png';

    //step sizes for X and Y axis:
    this.stepX = 50;
    this.stepY = 44;

    //distances of each actual side of sprite from the top left of the image:
    //(factors out transparent space)
    this.top = 64;
    this.bottom = 139;
    this.left = 20;
    this.right = 80;

    // variable used to test if player has lost
    this.dead = false;
}

//Move player back to the starting position
Player.prototype.reset = function() {
    this.x = 202;
    this.y = 415;
    this.dead = false;
};

// Draw the player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Check the player for winning and losing conditions
Player.prototype.update = function() {
    //check for a win (player reached the water)
    if (this.y <= -25) {
        alert("Congratulations! You made it to the water. You win the game!");
        this.reset();
    }
    //check for collisions with enemies
    allEnemies.forEach(function(enemy) {
        if (!(enemy.x + enemy.left > player.x + player.right ||
                enemy.y + enemy.top > player.y + player.bottom ||
                enemy.x + enemy.right < player.x + player.left ||
                enemy.y + enemy.bottom < player.y + player.top)) {
            player.dead = true;
            return;
        }
    });
};

//Handle keyboard input and move player accordingly (i.e. change player x and y positions)
Player.prototype.handleInput = function(move){
    //move player
    switch (move){
        case 'up':
            if (this.y - this.stepY >= -25) {
                this.y -= this.stepY;
            }
            break;
        case 'down':
            if (this.y + this.stepY < 450) {
                this.y += this.stepY;
            }
            break;
        case 'left':
            if (this.x - this.stepX >= 0) {
                this.x -= this.stepX;
            }
            break;
        case 'right':
            if (this.x + this.stepX <= 425) {
                this.x += this.stepX;
            }
    }
};

// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [new Enemy(0, 150, 60, false), new Enemy(0, 60, 120, false),
                     new Enemy(250, 150, 60, false), new Enemy(0, 230, 225, true)];
var player = new Player();

// Listens for key presses and send the keys to the
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
