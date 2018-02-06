let game;
let shipSprite;
window.onload = () => {
  game = new Phaser.Game(640, 480, Phaser.AUTO);
  game.state.add('PlayGame', PlayGame);
  game.state.start('PlayGame');
};


let PlayGame = function () {

};

PlayGame.prototype = {
  preload () {
    game.load.image('car', '/assets/sprites/car/car.png');
    game.load.image('tinycar', '/assets/sprites/car/tinycar.png');
  },
  create () {
    game.physics.startSystem(Phaser.Physics.P2JS);
    this.bullets = game.add.group();
    for (let i = 0; i < 10; i++) {
      let bullet = this.bullets.create(game.rnd.integerInRange(200, 1700), game.rnd.integerInRange(-200, 400), 'tinycar');
      game.physics.p2.enable(bullet, false);
    }
    this.cursors = game.input.keyboard.createCursorKeys();
    this.ship = game.add.sprite(32, game.world.height - 150, 'car');
    game.physics.p2.enable(this.ship);
    shipSprite = this.ship;
  },
  update () {
    this.bullets.forEachAlive(this.moveBullets, this);
    if (this.cursors.left.isDown) {
      this.ship.body.rotateLeft(100);
    } else if (this.cursors.right.isDown) {
      this.ship.body.rotateRight(100);
    } else {
      this.ship.body.setZeroRotation();
    }
    if (this.cursors.up.isDown) {
      this.ship.body.thrust(400);
    } else if (this.cursors.down.isDown) {
      this.ship.body.reverse(400);
    }
  },
  render () {
  },
  moveBullets (bullet) {
    this.accelerateToObject(bullet, this.ship, 30);
  },
  accelerateToObject (obj1, obj2, speed) {
    if (typeof speed === 'undefined') {
      speed = 60;
    }
    let angle = Math.atan2(obj2.y - obj1.y, obj2.x - obj2.x);
    obj1.body.rotation = angle + game.math.degToRad(90);
    obj1.body.force.x = Math.cos(angle) * speed;
    obj1.body.force.y = Math.sin(angle) * speed;
  }
};
