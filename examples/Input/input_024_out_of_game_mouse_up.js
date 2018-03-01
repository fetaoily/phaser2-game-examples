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
      game.load.image('rain', '/assets/pics/thalion-rain.png');
      game.load.image('bubble', '/assets/pics/bubble-on.png');
    },
    create () {
      game.add.tileSprite(0, 0, 800, 600, 'rain');
      //
      this.bubble = game.add.image(game.world.centerX, game.world.centerY, 'bubble');
      this.bubble.anchor.set(0.5);
      this.bubble.inputEnabled = true;
      this.bubble.input.enableDrag();
      //
      this.bubble.events.onInputDown.add(this.onDown, this);
      this.bubble.events.onInputUp.add(this.onUp, this);
    },
    update () {
    },
    render () {
    },
    onDown () {
      this.bubble.alpha = 0.3;
    },
    onUp () {
      this.bubble.alpha = 1;
    }
  };
})();