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
      this.load.pack('level1', '/assets/asset-pack1.json', null, this);
      this.load.image('test', '/assets/sprites/ilkke.png');
    }

    create () {
      this.stage.setBackgroundColor('#182d3b');
      //
      this.add.image(0, 0, 'starwars');
      this.add.image(0, 3000, 'spaceship');
      this.add.image(700, 360, 'test');
      //
      this.music = this.sound.play('boden');
      //
      this.add.bitmapText(380, 150, 'desyrel', 'Bitmap Fonts', 48);
      //
      this.mummy = this.add.sprite(370, 232, 'mummy');
      this.mummy.animations.add('walk');
      this.mummy.animations.play('walk', 20, true);
    }

    update () {
    }

    render () {
      this.game.debug.soundInfo(this.music, 370, 32);
      if (this.music.isDecoding) {
        this.game.debug.text('Decoding MP3 ...', 32, 200);
      }
    }
  }
})();