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
      game.load.image('pic', '/assets/pics/game14_angel_dawn.png');
      game.load.image('atari', '/assets/sprites/atari800xl.png');
    },
    create () {
      game.stage.backgroundColor = '#2d2d2d';
      //
      this.bounds = game.add.sprite(game.world.centerX, game.world.centerY, 'pic');
      this.bounds.alpha = 0.5;
      this.bounds.anchor.set(0.5);
      //
      this.sprite = game.add.sprite(300, 300, 'atari');
      this.sprite.inputEnabled = true;
      this.sprite.anchor.set(0.5);
      this.sprite.input.enableDrag();
      this.sprite.input.boundsSprite = this.bounds;
    },
    update () {
    },
    render () {
    }
  };
})();