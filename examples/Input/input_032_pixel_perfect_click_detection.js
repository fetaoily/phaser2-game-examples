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
      game.load.image('bunny', '/assets/sprites/bunny.png');
    },
    create () {
      this.bunny = game.add.sprite(game.world.centerX, game.world.centerY, 'bunny');
      this.bunny.anchor.set(0.5);
      this.bunny.inputEnabled = true;
      // this.bunny.input.pixelPerfectOver = true;
      this.bunny.input.userHandCursor = true;
    },
    update () {
      this.bunny.angle += 0.05;
    },
    render () {
      game.debug.spriteInputInfo(this.bunny, 32, 32);
      game.debug.geom(this.bunny.input_tempPoint);
    }
  };
})();