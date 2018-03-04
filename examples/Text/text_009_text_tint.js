(() => {

  let game;

  window.onload = () => {
    game = new NewGame();
  };

  class NewGame extends Phaser.Game {
    constructor () {
      super(800, 600, Phaser.AUTO);
      this.state.add('PlayGame', PlayGame);
      this.state.start('PlayGame');
    }
  }

  class PlayGame extends Phaser.State {
    constructor () {
      super();
      this.clicks = 0;
      this.counter = 0;
      this.textStyle = {
        font: '65px Arial', fill: '#ffff00', align: 'center'
      };
    }

    preload () {
      game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      game.scale.pageAlignHorizontally = true;
      game.scale.pageAlignVertically = true;
    }

    create () {
      this.text = game.add.text(game.world.centerX, game.world.centerY, 'Click me', this.textStyle);
      this.text.anchor.set(0.5);
      this.text.inputEnabled = true;
      this.text.events.onInputDown.add(this.down, this);
    }

    update () {
      this.counter++;
      this.text.angle = 2 * Math.sin(this.counter);
    }

    render () {
      game.debug.spriteInfo(this.text, 32, 32);
    }

    down (item) {
      this.clicks++;
      item.text = 'clicked ' + this.clicks + ' times';
      item.tint = (item.tint === 0xffffff) ? 0xff0000 : 0xffffff;
    }
  }

})();
