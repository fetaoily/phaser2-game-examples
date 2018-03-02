(() => {
  let game;

  window.onload = () => {
    game = new Phaser.Game(800, 600, Phaser.CANVAS);
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
      game.load.spritesheet('mummy', '/assets/sprites/metalslug_mummy37x45.png', 37, 45, 18);
    },
    create () {
      Phaser.Canvas.setSmoothingEnabled(game.context, false);
      //
      this.b = game.add.sprite(game.world.centerX, game.world.centerY, 'mummy');
      this.b.anchor.set(0.5);
      this.b.scale.set(6);
      this.b.smoothed = false;
      this.b.animations.add('walk');
      this.b.animations.play('walk', 5, true);
      //
      this.b.inputEnabled = true;
      this.b.input.pixelPerfectOver = true;
      this.input.useHandCursor = true;
    },
    update () {
      game.debug.spriteInputInfo(this.b, 32, 32);
      game.debug.geom(this.b.input._tempPoint);
    },
    render () {
    }
  };
})();