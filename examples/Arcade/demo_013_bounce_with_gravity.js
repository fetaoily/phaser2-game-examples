'use strict';
let game;

window.onload = () => {
  game = new Phaser.Game(600, 400, Phaser.AUTO);
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
    game.load.image('flyer', '/assets/sprites/phaser-dude.png');
  },
  create () {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    this.flyer = game.add.sprite(400, 200, 'flyer');

    game.physics.enable(this.flyer, Phaser.Physics.ARCADE);

    this.flyer.body.velocity.setTo(200, 200);
    this.flyer.body.collideWorldBounds = true;

    this.flyer.body.bounce.set(0.8);
    this.flyer.body.gravity.set(0, 180);

    this.cursors = game.input.keyboard.createCursorKeys();

  },
  update () {
    if (this.cursors.up.isDown) {
      this.flyer.body.velocity.y = -2000;
    } else {
      this.flyer.body.velocity.y = 200;
    }
  },
  render () {
    game.debug.spriteInfo(this.flyer, 32, 32);
    game.debug.body(this.flyer);
  }
};