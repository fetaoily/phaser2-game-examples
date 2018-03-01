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
      game.load.image('atari', '/assets/sprites/atari800xl.png');
    },
    create () {
      game.stage.backgroundColor = '#2d2d2d';
      //
      this.bounds = new Phaser.Rectangle(100, 100, 500, 400);
      //
      this.graphics = game.add.graphics(this.bounds.x, this.bounds.y);
      this.graphics.beginFill(0x000077);
      this.graphics.drawRect(0, 0, this.bounds.width, this.bounds.height);
      //
      this.sprite = game.add.sprite(300, 300, 'atari');
      this.sprite.inputEnabled = true;
      this.sprite.anchor.set(0.5);
      this.sprite.input.enableDrag();
      this.sprite.input.boundsRect = this.bounds;

    },
    update () {
    },
    render () {
    }
  };
})();