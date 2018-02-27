'use strict';
(() => {
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
      game.load.image('grid', '/assets/tests/debug-grid-1920x1920.png');
      game.load.image('atari', '/assets/sprites/atari800xl.png');
    },
    create () {
      game.add.sprite(0, 0, 'grid');
      this.atari1 = game.add.sprite(300, 300, 'atari');
      this.atari1.anchor.set(0.5);
      this.atari1.inputEnabled = true;
      this.atari1.input.enableDrag(true);
    },
    update () {
    },
    render () {
      game.debug.spriteInfo(this.atari1, 32, 32);
    }
  };
})();