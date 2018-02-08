'use strict';
let game;

window.onload = () => {
  game = new Phaser.Game(400, 400, Phaser.AUTO);
  game.state.add('PlayGame', PlayGame);
  game.state.start('PlayGame');
};

let PlayGame = function () {
};

PlayGame.prototype = {
  preload () {
    game.load.image('arrow', '/assets/sprites/arrow.png');
  },
  create () {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.stage.backgroundColor = '#0072bc';
    this.sprite = game.add.sprite(game.world.centerX, game.world.centerY, 'arrow');
    this.sprite.anchor.setTo(0.5, 0.5);

    // game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
    game.physics.arcade.enable(this.sprite);
    // this.sprite.body.gravity.x = 100;

    // this.sprite.body.maxAngular = 500;
    this.sprite.body.angularDrag = 50;
  },
  update () {
    this.sprite.body.angularAcceleration = 0;
    if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
      this.sprite.body.angularAcceleration -= 200;
    } else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
      this.sprite.body.angularAcceleration += 200;
    }
    console.info(this.sprite.body.angularAcceleration);
  },
  render () {
    game.debug.spriteInfo(this.sprite, 32, 32);
  }
};