'use strict';
let game;
let sprite;
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
    game.stage.disableVisibilityChange = true;

    sprite = game.add.sprite(game.world.centerX, game.world.centerY, 'arrow');
    sprite.anchor.setTo(0.5, 0.5);

    game.physics.arcade.enable(sprite);
    sprite.body.gravity.y = 10;
    sprite.body.collideWorldBounds = true;
  },
  update () {
    sprite.rotation = game.physics.arcade.angleToPointer(sprite);
  },
  render () {
    game.debug.spriteInfo(sprite, 32, 32);
  }
};