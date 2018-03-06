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
      this.bmpText = null;
      this.text = 'Lorem ipsum ';
      this.words = [
        'dolor', 'sit', 'amet', 'consectetuer', 'adipiscing', 'elit', 'aenean',
        'commodo', 'ligula', 'eget', 'massa', 'sociis', 'natoque', 'penatibus',
        'et', 'magnis', 'dis', 'parturient', 'montes'
      ];
      this.run = 5;
      this.current = 2;
    }

    preload () {
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.scale.pageAlignHorizontally = true;
      this.scale.pageAlignVertically = true;
      //
      this.load.bitmapFont('gem', '/assets/fonts/bitmapFonts/gem.png', '/assets/fonts/bitmapFonts/gem.xml');
    }

    create () {
      this.stage.backgroundColor = 0x272822;
      this.bmpText = this.add.bitmapText(32, 32, 'gem', this.text, 16);
      this.bmpText.maxWidth = 400;
      //
      let marker = this.add.graphics(432, 0);
      marker.beginFill(0x2a6e22e);
      marker.drawRect(0, 0, 1, game.height);
      marker.endFill();
      //
      this.time.events.repeat(10, 200, this.addText, this);
    }

    update () {
    }

    render () {
    }

    addText () {
      let word = this.rnd.pick(this.words);
      if (this.current === 0) {
        word = word[0].toUpperCase() + word.slice(1);
      }
      this.text += word;
      this.current++;
      if (this.current === this.run) {
        this.text += '. ';
        this.run = this.rnd.between(3, 6);
        this.current = 0;
      } else {
        this.text += ' ';
      }
      this.bmpText.text = this.text;
    }
  }
})();