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
      this.text = null;
      this.count = 0;
      //
      game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      game.scale.pageAlignHorizontally = true;
      game.scale.pageAlignVertically = true;
    },
    create () {
      this.text = game.add.text(game.world.centerX, game.world.centerY, '- You have clicked -\n0 times !', {
        font: '65px Arial',
        fill: '#ff0044',
        align: 'center'
      });
      this.text.anchor.setTo(0.5, 0.5);
      //
      this.text.inputEnabled = true;
      this.text.input.enableDrag();

    },
    update () {
      game.input.onDown.addOnce(this.updateText, this);
    },
    render () {
    },
    updateText () {
      this.count++;
      this.text.setText('- You have clicked -\n' + this.count + ' times!');
    }
  };
})();
