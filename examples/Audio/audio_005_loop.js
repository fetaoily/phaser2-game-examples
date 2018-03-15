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
      this.bass = null;
      this.drums = null;
      this.percussion = null;
      this.synth1 = null;
      this.synth2 = null;
      this.top1 = null;
      this.top2 = null;
      //
      this.text = null;
      this.sounds = null;
      this.current = null;
      this.speakers = null;
      this.loopCount = 0;
    }

    preload () {
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.scale.pageAlignHorizontally = true;
      this.scale.pageAlignVertically = true;
      //
      this.game.load.image('speakers', '/assets/sprites/speakers.png');
      //
      this.game.load.audio('bass', '/assets/audio/tech/bass.mp3');
      this.game.load.audio('drums', '/assets/audio/tech/drums.mp3');
      this.game.load.audio('percussion', '/assets/audio/tech/percussion.mp3');
      this.game.load.audio('synth1', '/assets/audio/tech/synth1.mp3');
      this.game.load.audio('synth2', '/assets/audio/tech/synth2.mp3');
      this.game.load.audio('top1', '/assets/audio/tech/top1.mp3');
      this.game.load.audio('top2', '/assets/audio/tech/top2.mp3');
    }

    create () {
      this.game.stage.setBackgroundColor('#838282');
      //
      this.speakers = this.game.add.image(
          this.game.world.centerX,
          500,
          'speakers'
      );
      this.speakers.anchor.set(0.5, 1);
      //
      let style = {font: '65px Arial', fill: '#52bace', align: 'center'};
      this.text = this.game.add.text(
          this.game.world.centerX,
          100,
          'decoding',
          style
      );
      this.text.anchor.set(0.5);
      //
      this.bass = this.game.add.audio('bass');
      this.drums = this.game.add.audio('drums');
      this.percussion = this.game.add.audio('percussion');
      this.synth1 = this.game.add.audio('synth1');
      this.synth2 = this.game.add.audio('synth2');
      this.top1 = this.game.add.audio('top1');
      this.top2 = this.game.add.audio('top2');
      //
      this.sounds = [
        this.bass,
        this.drums,
        this.percussion,
        this.synth1,
        this.synth2,
        this.top1,
        this.top2
      ];
      //
      this.game.sound.setDecodedCallback(this.sounds, this.start, this);
    }

    update () {
    }

    render () {
    }

    start () {
      this.sounds.shift();
      //
      this.bass.loopFull(0.6);
      this.bass.onLoop.add(this.hasLooped, this);
      //
      this.text.text = 'bass';
    }

    hasLooped (sound) {
      this.loopCount++;
      if (this.loopCount === 1) {
        this.sounds.shift();
        this.drums.loopFull(0.6);
        this.text.text = 'drums';
        this.game.add
            .tween(this.speakers.scale)
            .to({x: 1.3, y: 1.1}, 230, 'Sine.easeInOut', true, 0, -1, true);
      } else if (this.loopCount === 2) {
        this.current = this.game.rnd.pick(this.sounds);
        this.current.loopFull();
        this.text.text = this.current.key;
      } else if (this.loopCount > 2) {
        this.current.stop();
        this.current = this.game.rnd.pick(this.sounds);
        this.current.loopFull();
        this.text.text = this.current.key;
      }
    }
  }
})();
