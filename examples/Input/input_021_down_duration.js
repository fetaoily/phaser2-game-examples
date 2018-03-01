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
      this.bunny = null;
      this.lastDuration = 0;
      //
      game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      game.scale.pageAlignHorizontally = true;
      game.scale.pageAlignVertically = true;
      //
      game.load.image('bunny', '/assets/sprites/bunny.png');
    },
    create () {
      this.bunny = game.add.sprite(game.world.centerX, game.world.centerY, 'bunny');
      this.bunny.alpha = 0.5;
      this.bunny.anchor.set(0.5);
      //
      game.input.onUp.add(this.getTime, this);
    },
    update () {
      if (game.input.activePointer.isDown) {
        this.bunny.alpha = 1;
      } else {
        this.bunny.alpha = 0.5;
      }
    },
    render () {
      game.debug.text('Duration: ' + game.input.activePointer.duration, 32, 32);
      game.debug.text('Last Duration: ' + this.lastDuration, 32, 32 * 2);
    },
    getTime (pointer) {
      this.lastDuration = pointer.duration;
    }
  };
})();