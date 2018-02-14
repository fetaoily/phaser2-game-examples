'use strict';
let game;
let sprite;
window.onload = () => {
  game = new Phaser.Game(600, 400, Phaser.AUTO);
  game.state.add('PlayGame', PlayGame);
  game.state.start('PlayGame');
};

let PlayGame = function () {
};

PlayGame.prototype = {
  preload () {
    game.load.image('arrow', '/assets/sprites/arrow.png');
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  },
  create () {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    // sprite1
    sprite = this.sprite = game.add.sprite(game.world.centerX, game.world.centerY, 'arrow');
    this.sprite.anchor.set(0.5);
    game.physics.arcade.enable(this.sprite);

    this.sprite.body.collideWorldBounds = true;
    this.sprite.body.angularDrag = 50;
    // sprite2
    this.sprite2 = game.add.sprite(100, 100, 'arrow');

    game.physics.arcade.enable(this.sprite2);
    this.sprite2.body.collideWorldBounds = true;

  },
  update () {
    this.sprite.body.velocity.x = 0;
    this.sprite.body.velocity.y = 0;
    this.sprite.body.angularVelocity = 0;
    this.sprite.body.angularAcceleration = 0;
    this.sprite2.body.velocity.x = 0;
    this.sprite2.body.velocity.y = 0;
    this.sprite2.body.angularVelocity = 0;
    if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
      this.sprite.body.angularVelocity = -200;
      // this.sprite.body.angularAcceleration += -2000;
      // this.sprite2.body.angularVelocity = +200;
    } else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
      this.sprite.body.angularVelocity = +200;
      // this.sprite.body.angularAcceleration += +2000;
      // this.sprite2.body.angularVelocity = -200;
    }
    this.sprite2.angle = this.sprite.angle;

    if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
      game.physics.arcade.velocityFromAngle(this.sprite.angle, 300, this.sprite.body.velocity);
      game.physics.arcade.velocityFromAngle(this.sprite2.angle, 300, this.sprite2.body.velocity);
    }
  },
  render () {
    game.debug.spriteInfo(this.sprite, 32, 32);
    game.debug.body(this.sprite);
    game.debug.text('angularVelocity: ' + this.sprite.body.angularVelocity, 32, 200);
    game.debug.text('angularAcceleration: ' + this.sprite.body.angularAcceleration, 32, 232);
    game.debug.text('angularDrag: ' + this.sprite.body.angularDrag, 32, 264);
    game.debug.text('deltaZ: ' + this.sprite.body.deltaZ(), 32, 296);
    game.debug.text('SpriteBodyVelocity:' + this.sprite.body.velocity, 32, 296 + 32);
    game.debug.text('SpriteBodyVelocity:' + this.sprite2.body.velocity, 32, 296 + 32 + 32);
  }
};
