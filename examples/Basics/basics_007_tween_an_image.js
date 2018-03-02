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
      game.load.image('einstein', '/assets/pics/ra_einstein.png');
    },
    create () {
      this.sprite = game.add.sprite(game.world.randomX, game.world.centerY, 'einstein');
      this.sprite.anchor.set(0.5);
      this.tween = game.add.tween(this.sprite);
      this.tween.to({
        x: game.world.randomX,
        y: game.world.randomY,
        angle: 360
      }, 5000, 'Linear', true, 1000, Number.MAX_VALUE, true);
    },
    update () {
    },
    render () {
      game.debug.spriteInfo(this.sprite, 32, 32);
    }
  };
})();