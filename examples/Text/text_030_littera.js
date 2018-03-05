(() => {
  'use strict';
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
      this.load.bitmapFont('shortStack', '/assets/fonts/bitmapFonts/shortStack.png', '/assets/fonts/bitmapFonts/shortStack.fnt');
    }

    create () {
      this.add.bitmapText(32, 32, 'shortStack', 'This font was generated useing the\f free Littera web site\n\nhttp://kvazars.com/littera/', 32);
    }

    update () {
    }

    render () {
    }
  }
})();