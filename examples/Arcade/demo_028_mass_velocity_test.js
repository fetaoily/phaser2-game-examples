let game;

window.onload = () => {
  game = new Phaser.Game(800, 600, Phaser.AUTO);
  game.state.add('PlayGame', PlayGame);
  game.state.start('PlayGame');
};

let PlayGame = function () {
};
PlayGame.prototype = {
  preload () {
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    //
    game.load.image('car', '/assets/sprites/car90.png');
    game.load.image('baddie', '/assets/sprites/space-baddie.png');
  },
  create () {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    this.aliens = game.add.group();
    this.aliens.enableBody = true;

    for (let i = 0; i < 50; i++) {
      let s = this.aliens.create(game.world.randomX, game.world.randomY, 'baddie');
      s.name = 'alien' + s;
      s.body.collideWorldBounds = true;
      s.body.bounce.setTo(0.8, 0.8);
      // s.body.bounce.setTo(100, 100);
      s.body.velocity.setTo(10 + Math.random() * 40, 10 + Math.random() * 40);
    }

    this.car = game.add.sprite(400, 300, 'car');
    this.car.name = 'car';
    this.car.anchor.set(0.5);

    game.physics.enable(this.car, Phaser.Physics.ARCADE);

    this.car.body.collideWorldBounds = true;
    this.car.body.bounce.set(0.8);
    this.car.body.allowRotation = true;
    this.car.body.immovable = true;
    this.car.body.setCircle(this.car.height * 2, -(this.car.width + this.car.width / 2), -(this.car.height + this.car.height / 2));

    this.cursors = game.input.keyboard.createCursorKeys();
  },
  update () {
    game.physics.arcade.collide(this.car, this.aliens);
    game.physics.arcade.collide(this.aliens, this.aliens);

    this.car.body.velocity.x = 0;
    this.car.body.velocity.y = 0;
    this.car.body.angularVelocity = 0;

    if (this.cursors.left.isDown) {
      this.car.body.angularVelocity = -200;
    } else if (this.cursors.right.isDown) {
      this.car.body.angularVelocity = +200;
    }

    if (this.cursors.up.isDown) {
      // this.car.body.velocity.copyFrom(game.physics.arcade.velocityFromAngle(this.car.angle, 300));
      game.physics.arcade.velocityFromAngle(this.car.angle, 300, this.car.body.velocity);
    }
  },
  render () {
    game.debug.body(this.car);
    game.debug.bodyInfo(this.car, 32, 32);
  }
};


