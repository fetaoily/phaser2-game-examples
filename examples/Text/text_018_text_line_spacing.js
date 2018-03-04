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
    }

    preload () {
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.scale.pageAlignHorizontally = true;
      this.scale.pageAlignVertically = true;
    }

    create () {
      this.stage.backgroundColor = '#5d5d5d';
      let haiku = 'Turtles and mushrooms\n You are in the wrong castle\nFireball mustache';
      let text = game.add.text(100, 64, haiku, {
        font: '32px Arial', fill: '#ffffff', backgroundColor: 'red'
      });
      text.lineSpacing = -20;
      //
      let haiku2 = 'Green hat, Master Sword\nMonsters and chickens beware\nMoney making game';
      let text2 = game.add.text(100, 300, haiku2, {
        font: '32px Arial', fill: '#ffffff', backgroundColor: 'green'
      });
      text2.lineSpacing = 40;
    }

    update () {
    }

    render () {
    }
  }
})();
