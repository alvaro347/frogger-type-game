/*jshint esversion: 6 */


class Enemy {
  constructor(x, y, speed) {
    this.x= x;
    this.y= y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
  }
  update(dt) {
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
  }
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}



class Player {
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.score = 0;
    this.gemsCollected = 0;
    this.sprite = 'images/char-horn-girl.png';
  }
  update() {
    if (this.y == -20) {
      this.x = 200;
      this.y = 380;
      this.score += 1;
      let placeX = [15, 115, 215, 315, 415];
      let placeY = [90, 170, 250];
      let x = placeX[Math.floor(Math.random() * placeX.length)];
      let y = placeY[Math.floor(Math.random() * placeY.length)];
      gem.place(x, y);

      for (var i = 0; i < placeX.length; i++) {
        let x2 = placeX[Math.floor(Math.random() * placeX.length)];
        if (x != x2) {
          
          for (var j = 0; j < placeY.length; j++) {
            let y2 = placeY[Math.floor(Math.random() * placeY.length)];
            if (y != y2) {
              rock.place(x2, y2);
            }
          }
        }
      }
    }
  }
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
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

class Gems {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/gem-blue.png';
  }
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
  update() {
    if (player.x - this.x < -10 && player.x - this.x > -20) {
      if (player.y - this.y < 20 && player.y - this.y > -40) {
        this.x = -100;
        this.y = -100;
        player.gemsCollected += 1;
      }
    }
  }
  place(x, y){
    this.x = x;
    this.y = y;
  }
}


class Rocks {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/rock.png';
  }
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
  update() {
    // if (player.x - this.x < -10 && player.x - this.x > -20) {
    //   if (player.y - this.y < 20 && player.y - this.y > -40) {
    //   }
    // }
  }
  place(x, y){
    this.x = x;
    this.y = y;
  }
}



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = [];
let y = [225,145,65];

// y.forEach(function (y) {
//   let enemy = new Enemy(-100, y, 200 + Math.random() * 300);
//   allEnemies.push(enemy);
// });


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
