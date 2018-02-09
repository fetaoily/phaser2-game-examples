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

    this.flyer = game.add.sprite(0, 0, 'flyer');
    this.flyer.anchor.set(0.5);

    game.physics.enable(this.flyer, Phaser.Physics.ARCADE);
    this.flyer.body.velocity.setTo(200, 200);
    this.flyer.body.collideWorldBounds = true;

    this.flyer.body.bounce.set(1);
    this.flyer.body.angularVelocity = 100;
  },
  update () {
  },
  render () {
    game.debug.spriteInfo(this.flyer, 32, 32);
    game.debug.body(this.flyer);
  }
};