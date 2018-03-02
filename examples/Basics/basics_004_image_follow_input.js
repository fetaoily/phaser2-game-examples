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
      game.load.image('phaser', '/assets/sprites/phaser.png');
    },
    create () {
      this.sprite = game.add.sprite(game.world.centerX, game.world.centerY, 'phaser');
      this.sprite.anchor.set(0.5);
      //
      game.physics.arcade.enable(this.sprite);
    },
    update () {
      if (game.physics.arcade.distanceToPointer(this.sprite, game.input.activePointer) > 8) {
        game.physics.arcade.moveToPointer(this.sprite, 300);
      } else {
        this.sprite.body.velocity.set(0);
      }
    },
    render () {
      game.debug.inputInfo(32, 32);
    }
  };
})();