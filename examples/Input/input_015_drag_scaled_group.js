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
      game.load.image('atari', '/assets/sprites/atari800xl.png');
    },
    create () {
      game.add.sprite(0, 0, 'grid');
      //
      this.group = game.add.group();
      this.group.scale.set(1.5);
      //
      this.atari1 = this.group.create(100, 100, 'atari');
      this.atari1.scale.set(0.7);
      this.atari1.inputEnabled = true;
      this.atari1.input.enableDrag(false);
      //
      this.atari2 = game.add.sprite(500, 300, 'atari');
      this.atari2.inputEnabled = true;
      this.atari2.input.enableDrag(true);
    },
    update () {
    },
    render () {
    }
  };
})();