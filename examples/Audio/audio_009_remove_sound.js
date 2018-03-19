(() => {
  'use strict';
  let game;

  window.onload = () => {
    game = new NewGame();
  };

  class NewGame extends Phaser.Game {
    constructor() {
      super(800, 600, Phaser.AUTO);
      this.state.add('PlayGame', PlayGame);
      this.state.start('PlayGame');
    }
  }

  class PlayGame extends Phaser.State {
    constructor() {
      super();
      this.s = null;
      this.music = null;
    }

    preload() {
      this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.game.scale.pageAlignHorizontally = true;
      this.game.scale.pageAlignVertically = true;
      //
      this.game.load.image('greenie', '/assets/sprites/wizball.png');
      this.game.load.audio('wizball', [
        '/assets/audio/oedipus_wizball_highscore.mp3',
        '/assets/audio/oedipus_wizball_highscore.ogg'
      ]);
    }

    create() {
      this.game.stage.setBackgroundColor('#182d3b');
      //
      this.game.input.touch.preventDefault = false;
      //
      this.music = this.game.add.audio('wizball');
      this.music.play();
      //
      this.s = this.game.add.sprite(
        this.game.world.centerX,
        this.game.world.centerY,
        'greenie'
      );
      this.s.anchor.set(0.5);
      //
      this.game.input.onDown.add(this.removeMusic, this);
    }

    update() {}

    render() {
      if (this.game.cache.checkSoundKey('wizball')) {
        this.game.debug.soundInfo(this.music, 20, 32);
      }
    }

    removeMusic() {
      this.music.destroy();
      this.game.cache.removeSound('wizball');
    }
  }
})();
