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
      this.game.load.audio('boden', '/assets/audio/goaman_intro.mp3');
    }

    create () {
      this.game.stage.setBackgroundColor('#182d3b');
      //
      this.game.input.touch.preventDefault = false;
      //
      this.music = this.game.add.audio('boden');
      this.music.onDecoded.add(this.start, this);
      //
      this.s = this.game.add.sprite(
          this.game.world.centerX,
          this.game.world.centerY,
          'disk'
      );
      this.s.anchor.setTo(0.5, 0.5);
    }

    update () {
    }

    render () {
      this.game.debug.soundInfo(this.music, 20, 32);
    }

    start () {
      this.music.fadeIn(4000);
    }
  }
})();
