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
      //
      this.line1 = null;
      this.line2 = null;
      //
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.scale.pageAlignHorizontally = true;
      this.scale.pageAlignVertically = true;
      //
      this.load.bitmapFont('desyrel', '/assets/fonts/bitmapFonts/desyrel.png', '/assets/fonts/bitmapFonts/desyrel.xml');
    }

    create () {
      let text = this.add.bitmapText(400, 300, 'desyrel', 'Middle Earth', 64);
      text.anchor.x = 0.5;
      text.anchor.y = 0.5;
      this.line1 = new Phaser.Line(400, 0, 400, 600);
      this.line2 = new Phaser.Line(0, 300, 800, 300);
    }

    update () {
    }

    render () {
      game.debug.geom(this.line1);
      game.debug.geom(this.line2);
    }
  }
})();