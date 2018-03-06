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
      this.music = null;
    }

    preload () {
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.scale.pageAlignHorizontally = true;
      this.scale.pageAlignVertically = true;
      //
      this.load.audio('boden', ['assets/audio/bodenstaendig_2000_in_rock_4bit.mp3', 'assets/audio/bodenstaendig_2000_in_rock_4bit.ogg']);
    }

    create () {
      this.stage.setBackgroundColor('#182d3b');
      this.music = this.sound.play('boden');
    }

    update () {
    }

    render () {
      game.debug.soundInfo(this.music, 32, 32);
      if (this.music.isDecoding) {
        game.debug.text('Decoding MP3 ...', 32, 200);
      }
    }
  }
})();