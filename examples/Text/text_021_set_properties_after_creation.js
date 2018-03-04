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
      this.counter = 0;
      this.lastTime = 0;
    }

    preload () {
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.scale.pageAlignHorizontally = true;
      this.scale.pageAlignVertically = true;
      //
      this.load.bitmapFont('desyrel', '/assets/fonts/bitmapFonts/desyrel.png', '/assets/fonts/bitmapFonts/desyrel.xml');
    }

    create () {
      this.text = this.add.bitmapText(0, 100, 'desyrel', 'I\'m growing', 64)
    }

    update () {
      if (this.text.fontSize < 250) {
        this.text.fontSize += 1;
      }
      // if (this.time.now > this.lastTime) {
      //   this.counter++;
      //   this.text.fontSize = 250 * Math.sin(this.counter);
      //   this.lastTime = this.time.now + 50;
      // }
    }

    render () {
    }
  }

})();
