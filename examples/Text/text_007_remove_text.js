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
    },
    create () {
      this.text = game.add.text(game.world.centerX, game.world.centerY, '- Phaser -\nclick to remove', {
        font: '65px Arial', fill: '#ff0044', align: 'center'
      });
      this.text.anchor.setTo(0.5, 0.5);
      //
      game.input.onDown.addOnce(this.removeText, this);
    },
    update () {
    },
    render () {
    },
    removeText () {
      this.text.destroy();
    }
  };
})();
