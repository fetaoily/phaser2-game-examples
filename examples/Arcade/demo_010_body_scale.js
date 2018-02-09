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
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    //
    game.load.spritesheet('gameboy', '/assets/sprites/gameboy_seize_color_40x60.png', 40, 60);
  },
  create () {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.stage.backgroundColor = '#124184';

    this.sprite = game.add.sprite(100, 200, 'gameboy', 2);
    this.sprite.anchor.set(0.5);
    this.sprite.smoothed = false;

    game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
    this.sprite.body.immovable = true;

    this.sprite2 = game.add.sprite(300, 200, 'gameboy', 3);
    this.sprite2.anchor.set(0.5);
    game.physics.enable(this.sprite2, Phaser.Physics.ARCADE);
    // this.sprite2.body.angularVelocity = 1000;
    this.sprite2.body.angularAcceleration = 500;

    game.add.tween(this.sprite.scale).to({x: 4, y: 4}, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);

  },
  update () {
    this.sprite2.body.velocity.x = -200;

    game.physics.arcade.collide(this.sprite, this.sprite2);
  },
  render () {
    game.debug.spriteInfo(this.sprite, 32, 32);
    game.debug.spriteInfo(this.sprite2, 32, 32 * 4)
  }
};