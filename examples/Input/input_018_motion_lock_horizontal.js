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
      game.load.image('sprite', '/assets/sprites/parsec.png');
    },
    create () {
      game.stage.backgroundColor = 'rgb(85,85,85)';
      this.sprite = game.add.sprite(200, 400, 'sprite');
      this.sprite.inputEnabled = true;
      this.sprite.input.enableDrag();
      this.sprite.input.allowVerticalDrag = false;
    },
    update () {
    },
    render () {
      game.debug.inputInfo(32, 32);
      game.debug.spriteInputInfo(this.sprite, 300, 32);
    }
  };
})();
