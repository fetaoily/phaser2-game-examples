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
      game.load.image('rain', '/assets/pics/thalion-rain.png');
      game.load.image('bubble', '/assets/pics/bubble-on.png');
    },
    create () {
      game.add.tileSprite(0, 0, 800, 600, 'rain');
      this.bubble = game.add.image(game.world.centerX, game.world.centerY, 'bubble');
      this.bubble.anchor.set(0.5);
    },
    update () {
      if (game.input.activePointer.withinGame) {
        this.bubble.alpha = 1;
      } else {
        this.bubble.alpha = 0.3;
      }
    },
    render () {
      game.debug.inputInfo(32, 32);
      game.debug.pointer(game.input.activePointer);
    }
  };
})();