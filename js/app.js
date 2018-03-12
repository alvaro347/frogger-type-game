/*jshint esversion: 6 */
// Udacity Project: Arcade Game
// Alvaro Fernandez

// NOTE : Enemy class: generates a enemy object with its location, sprite
// and speed. The update function will have the collision with the player
class Enemy {
  constructor(x, y, speed) {
    this.x= x;
    this.y= y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
  }
  update(dt) {
    // once the enemy reaches the end of the board it will reset its location
    this.x = this.x + (dt * this.speed);
    if (this.x > 500) {
      this.x = -100;
      this.speed = 200 + Math.random() * 300;
    }
    // check collisions with the player
    if (player.x - this.x < 50 && player.x - this.x > -50) {
      if (player.y - this.y < 30 && player.y - this.y > -30) {
        player.x = 200;
        player.y = 380;
        player.lives -= 1;
      }
    }
  }
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}


// NOTE: Player class: will create a player objetc with the location score,
// gems collected and the sprite. The update attribute will check
// when the player reaches the end of the level to place the gem and
// rock in a new random position.
class Player {
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.score = 0;
    // feature to be added: lives
    // this.lives = 3;
    this.gemsCollected = 0;
    this.sprite = 'images/char-horn-girl.png';
  }
  update() {
    // Check if player reaches the end of the board.
    if (this.y == -20) {
      this.x = 200;
      this.y = 380;
      this.score += 1;
      // once the player score, the gem and rock will be place randomly
      // positions available for rock and gem
      let placeX = [15, 115, 215, 315, 415];
      let placeY = [90, 170, 250];
      let x = placeX[Math.floor(Math.random() * placeX.length)];
      let y = placeY[Math.floor(Math.random() * placeY.length)];
      // place the gem randomly using math.random()
      gem.place(x, y);
      // avoid putting the rock and gem in the same place
      for (var i = 0; i < placeX.length; i++) {
        let x2 = placeX[Math.floor(Math.random() * placeX.length)];
        // Checks if location x it's the same as x2, if not it will find y2
        if (x != x2) {
          // checks if location y it's the same as y2, if not it will place the rock
          for (var j = 0; j < placeY.length; j++) {
            let y2 = placeY[Math.floor(Math.random() * placeY.length)];
            if (y != y2) {
              // place the rock with the new x2 and y2
              rock.place(x2, y2);
            }
          }
        }
      }
    }
  }
  // render() renders the player
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
  // For moving the player we use the handleInput() function.
  // the function will check which key was pressed and will avoid the player
  // to move out of the board or move if the rock is near.
  handleInput(key) {
    if (key == 'left' && this.x > 0 && !(rock.x - this.x == -85 && rock.y - player.y == 30)) {
      this.x -= 100;
    } else if (key == 'right' && this.x < 400 && !(rock.x - this.x == 115 && rock.y - player.y == 30)) {
      this.x += 100;
    } else if (key == 'up' && this.y > 0 && !(rock.x - this.x == 15 && rock.y - player.y == -50)) {
      this.y -= 80;
    } else if (key == 'down' && this.y < 380 && !(rock.x - this.x == 15 && rock.y - player.y == 110)) {
      this.y += 80;
    }
  }
}


// NOTE: Gems Class will create gems and check if the player takes it.
class Gems {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/gem-blue.png';
  }
  // renders the first gem on the board
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
  // check if the player takes the gem and adds one point to gemsCollected
  update() {
    if (player.x - this.x < -10 && player.x - this.x > -20) {
      if (player.y - this.y < 20 && player.y - this.y > -40) {
        // move the gem out of the board once the player takes it (just for visuals)
        this.x = -100;
        this.y = -100;
        player.gemsCollected += 1;
      }
    }
  }
  // place the gem once the player reaches the end
  place(x, y){
    this.x = x;
    this.y = y;
  }
}


// Rocks class creates a rock and place it.
class Rocks {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/rock.png';
  }
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
  // random position for the rock once the player reaches the end
  place(x, y){
    this.x = x;
    this.y = y;
  }
}


// NOTE: Create a enemies array to store all the enemies.
let allEnemies = [];
// Y position where enemies can appear on the board
let y = [225,145,65];

// creates different enemies objects and push them to the allEnemies array
y.forEach(function (y) {
  let enemy = new Enemy(-100, y, 200 + Math.random() * 300);
  allEnemies.push(enemy);
});

// Creates a player a gem and a rock to put it on the board.
let player = new Player(200,380);
let gem = new Gems(115, 170);
let rock = new Rocks(315, 250);

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
