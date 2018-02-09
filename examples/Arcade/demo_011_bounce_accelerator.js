'use strict';
let game;

window.onload = () => {
  game = new Phaser.Game(600, 600, Phaser.AUTO);
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
    game.load.spritesheet('dude', '/assets/sprites/dude.png', 32, 48);
  },
  create () {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    this.cursors = game.input.keyboard.createCursorKeys();

    this.player = game.add.sprite(200, 200, 'dude');
    this.player.animations.add('left', [0, 1, 2, 3], 10, true);
    this.player.animations.add('right', [5, 6, 7, 8], 10, true);

    game.physics.enable(this.player, Phaser.Physics.ARCADE);

    this.player.body.velocity.setTo(200, 200);
    this.player.body.collideWorldBounds = true;

    this.player.body.bounce.setTo(0.8, 0.8);
  },
  update () {
    if (this.cursors.up.isDown) {
      this.player.body.acceleration.y = -100;
      if (this.player.body.velocity.x > 0) {
        this.player.animations.play('right');
      } else {
        this.player.animations.play('left');
      }
    } else if (this.cursors.down.isDown) {
      this.player.body.acceleration.y = +600;
      if (this.player.body.velocity.x > 0) {
        this.player.animations.play('right');
      } else {
        this.player.animations.play('left');
      }
    } else if (this.cursors.left.isDown) {
      this.player.body.acceleration.x = -100;
      this.player.animations.play('left');
    } else if (this.cursors.right.isDown) {
      this.player.body.acceleration.x = +500;
      this.player.animations.play('right');
    } else {
      this.player.frame = 4;
      this.player.body.acceleration.setTo(0, 0);
      this.player.body.acceleration.setTo(0, 0);
      this.player.animations.stop();
    }
  },
  render () {
    game.debug.spriteInfo(this.player, 32, 32);
    game.debug.body(this.player);
  }
};