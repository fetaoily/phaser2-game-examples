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
      this.text1 = this.add.bitmapText(400, 70, 'desyrel', 'Anchor.x = 0', 64);
      this.text2 = this.add.bitmapText(400, 270, 'desyrel', 'Anchor.x=0.5', 64);
      this.text2.anchor.x = 0.5;
      this.text3 = this.add.bitmapText(400, 470, 'desyrel', 'Anchor.x=1', 64);
      this.text3.anchor.x = 1;
      this.line = new Phaser.Line(400, 0, 400, 600);
    }

    update () {
    }

    render () {
      game.debug.geom(this.line);
    }
  }
})();
