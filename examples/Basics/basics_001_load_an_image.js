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
      this.sprite = game.add.sprite(0, 0, 'einstein');
    },
    update () {
    },
    render () {
      game.debug.spriteInfo(this.sprite, 32, 32);
    }
  };
})();