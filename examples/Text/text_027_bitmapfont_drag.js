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
      super()
    }

    preload () {
      //
      this.bmpText = null;
      //
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.scale.pageAlignHorizontally = true;
      this.scale.pageAlignVertically = true;
      //
      this.load.bitmapFont('carrier_command', '/assets/fonts/bitmapFonts/carrier_command.png', '/assets/fonts/bitmapFonts/carrier_command.xml');
    }

    create () {
      this.bmpText = this.add.bitmapText(10, 100, 'carrier_command', 'Drag me around !', 34);
      this.bmpText.inputEnabled = true;
      this.bmpText.input.enableDrag();
    }

    update () {
    }

    render () {
    }
  }
})();