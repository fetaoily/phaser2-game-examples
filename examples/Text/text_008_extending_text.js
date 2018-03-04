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
      let text = new CustomText(game, game.world.centerX, game.world.centerY, 'Hello World!');
      game.add.existing(text);
    },
    update () {
    },
    render () {
    }
  };

  class CustomText extends Phaser.Text {
    constructor (game, x, y, text) {
      super(game, x, y, text);
      this.setStyle({ font: '65px Arial', fill: '#ff0044', align: 'center' });
      this.anchor.set(0.5);
      this.rotateSpeed = 1;
    }

    update () {
      this.angle += this.rotateSpeed;
    }
  }
})();
