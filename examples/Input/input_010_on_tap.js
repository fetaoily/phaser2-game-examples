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
      //
      game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      game.scale.pageAlignHorizontally = true;
      game.scale.pageAlignVertically = true;
      //
      game.load.image('TheEnd', 'assets/pics/TheEnd_by_Iloe_and_Made.jpg');
      game.load.image('BountyHunter', 'assets/pics/Bounty_Hunter_by_Anathematixs_Desire.png');
    },
    create () {
      this.pic = game.add.sprite(game.world.centerX, game.world.centerY, 'TheEnd');
      this.pic.alpha = 0.5;
      this.pic.anchor.set(0.5);
      this.pic.scale.set(0.6);
      game.add.text(16, 16, 'tap or double-tap the image', {font: '32px Arial', fill: '#ffffff'});
      game.input.onTap.add(this.onTap, this);
    },
    update () {
    },
    render () {
    },
    onTap (pointer, doubleTap) {
      if (doubleTap) {
        if (this.pic.key === 'TheEnd') {
          this.pic.loadTexture('BountyHunter');
        } else {
          this.pic.loadTexture('TheEnd');
        }
      } else {
        this.pic.alpha = (this.pic.alpha === 0.5) ? 1 : 0.5;
      }
    }
  };
})();