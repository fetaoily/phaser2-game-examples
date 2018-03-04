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
      this.bmpText = this.add.bitmapText(200, 100, 'desyrel', 'Phaser & Pixi\nrocking!', 64);
    }

    update () {
      this.bmpText.text = 'Phaser & Pixi\nrocking!\n' + Math.round(this.time.now);
    }

    render () {
    }
  }
})();
