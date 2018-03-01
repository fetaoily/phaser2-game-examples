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
      game.load.image('grid', '/assets/tests/debug-grid-1920x1920.png');
      game.load.image('atari1', '/assets/sprites/atari130xe.png');
      game.load.image('atari2', '/assets/sprites/atari800xl.png');
    },
    create () {
      game.add.sprite(0, 0, 'grid');
      //
      this.atari1 = game.add.sprite(128, 128, 'atari1');
      this.atari2 = game.add.sprite(128, 128, 'atari2');
      //
      this.atari1.inputEnabled = true;
      this.atari2.inputEnabled = true;
      //
      this.atari1.input.enableDrag();
      this.atari2.input.enableDrag();
      //
      this.atari1.input.enableSnap(32, 32, true, true);
      this.atari2.input.enableSnap(32, 32, false, true);

    },
    update () {
    },
    render () {
    }
  };
})();

