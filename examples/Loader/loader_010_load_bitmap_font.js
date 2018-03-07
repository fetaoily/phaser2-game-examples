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
      //
      this.load.bitmapFont('desyrel', '/assets/fonts/bitmapFonts/desyrel.png', '/assets/fonts/bitmapFonts/desyrel.xml');
    }

    create () {
      this.stage.setBackgroundColor('#0072bc');
      this.text = this.add.bitmapText(200, 100, 'desyrel', 'Bitmap Fonts!', 64);
    }

    update () {
      this.text.setText('Bitmap Fonts\nx: ' + Math.round(this.input.x) + ' y: ' + Math.round(this.input.y));
    }

    render () {
    }
  }
})();