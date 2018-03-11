/*jshint esversion: 6 */


// Enemies our player must avoid
var Enemy = function(x, y, speed) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started
  this.x= x;
  this.y= y;
  this.speed = speed;
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
  this.x = this.x + (dt * this.speed);
  if (this.x > 500) {
    this.x = -100;
    this.speed = 200 + Math.random() * 300;
  }
  if (player.x - this.x < 50 && player.x - this.x > -50) {
    if (player.y - this.y < 30 && player.y - this.y > -30) {
      player.x = 200;
      player.y = 380;
    }

  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.score = 0;
    this.sprite = 'images/char-horn-girl.png';
  }
  update() {
    if (this.y == -20) {
      this.x = 200;
      this.y = 380;
      this.score += 1;
      
    }
  }
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
  handleInput(key) {
    if (key == 'left' && this.x > 0) {
      this.x -= 100;
    } else if (key == 'right' && this.x < 400) {
      this.x += 100;
    } else if (key == 'up' && this.y > 0) {
      this.y -= 80;
    } else if (key == 'down' && this.y < 380) {
      this.y += 80;
    }
  }
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = [];
let y = [225,145,65];

y.forEach(function (y) {
  for (var i = 0; i < 1; i++) {
    let enemy = new Enemy(-100, y, 200 + Math.random() * 300);
    allEnemies.push(enemy);
  }
});


let player = new Player(200,380);

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
