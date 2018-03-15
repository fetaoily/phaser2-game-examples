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
      this.s = null;
      this.music = null;
    }

    preload () {
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.scale.pageAlignHorizontally = true;
      this.scale.pageAlignVertically = true;
      //
      this.game.load.image(
          'disk',
          '/assets/sprites/ra_dont_crack_under_pressure.png'
      );
      this.game.load.audio('boden', [
        '/assets/audio/bodenstaendig_2000_in_rock_4bit.mp3',
        '/assets/audio/bodenstaendig_2000_in_rock_4bit.ogg'
      ]);
    }

    create () {
      this.game.stage.setBackgroundColor('#1822d3b');
      //
      this.game.input.touch.preventDefault = false;
      //
      this.music = this.game.add.audio('boden');
      this.music.play();
      //
      this.s = this.game.add.sprite(
          this.game.world.centerX,
          this.game.world.centerY,
          'disk'
      );
      this.s.anchor.setTo(0.5, 0.5);
      //
      this.game.input.onDown.add(this.changeVolume, this);
    }

    update () {
      this.s.rotation += 0.01;
    }

    render () {
      this.game.debug.soundInfo(this.music, 20, 32);
    }

    changeVolume (pointer) {
      if (pointer.y < 100) {
        this.music.mute = false;
      } else if (pointer.y < 300) {
        this.music.volume += 0.1;
      } else {
        this.music.volume -= 0.1;
      }
    }
  }
})();
