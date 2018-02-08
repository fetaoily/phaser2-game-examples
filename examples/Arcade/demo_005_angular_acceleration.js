'use strict';
let game;
let sprite;
window.onload = () => {
  game = new Phaser.Game(400, 400, Phaser.CANVAS);
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
    game.stage.backgroundColor = '#0072bc';
    sprite = this.sprite = game.add.sprite(game.world.centerX, game.world.centerY, 'arrow');
    this.sprite.anchor.setTo(0.5, 0.5);

    // game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
    game.physics.arcade.enable(this.sprite);
    // this.sprite.body.gravity.x = 100;
    this.sprite.body.collideWorldBounds = true;
    this.sprite.body.bounce.set(0.5);

    this.sprite.body.maxAngular = 500;
    this.sprite.body.angularDrag = 50;
  },
  update () {
    this.sprite.body.angularAcceleration = 0;
    if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
      this.sprite.body.gravity.x = -100;
      this.sprite.body.angularAcceleration -= 200;
    } else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
      this.sprite.body.gravity.x = +100;
      this.sprite.body.angularAcceleration += 200;
    } else if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
      this.sprite.body.gravity.y = -100;
      this.sprite.body.angularAcceleration -= 500;
    } else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
      this.sprite.body.gravity.y = +100;
      this.sprite.body.angularAcceleration += 500;
    } else {
      this.sprite.body.gravity.x = 0;
      this.sprite.body.gravity.y = 0;
    }
    // console.info(this.sprite.body.angularAcceleration);
  },
  render () {
    game.debug.spriteInfo(this.sprite, 32, 32);
    game.debug.spriteBounds(this.sprite);
    game.debug.text(`AngularAcceleration: ${this.sprite.body.angularAcceleration}`, 32, 140)
  }
};
