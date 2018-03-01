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
      game.load.image('ball', '/assets/sprites/shinyball.png');
    },
    create () {
      this.sprite = game.add.sprite(game.world.centerX, game.world.centerY, 'ball');
      game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
    },
    update () {
      if (game.input.mousePointer.isDown) {
        game.physics.arcade.moveToPointer(this.sprite, 400);
        if (Phaser.Rectangle.contains(this.sprite.body, game.input.x, game.input.y)) {
          this.sprite.body.velocity.setTo(0, 0);
        }
      } else {
        this.sprite.body.velocity.setTo(0, 0);
      }
    },
    render () {
      game.debug.spriteInfo(this.sprite, 32, 32);
    }
  };
})();