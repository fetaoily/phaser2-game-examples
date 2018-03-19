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
      this.explosion = null;
      this.sword = null;
      this.blaster = null;
      this.text = null;
      this.text1 = null;
      this.text2 = null;
      this.text3 = null;
      //
      this.keys = null;
    }

    preload () {
      this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.game.scale.pageAlignHorizontally = true;
      this.game.scale.pageAlignVertically = true;
      //
      this.game.load.audio(
          'explosion',
          '/assets/audio/SoundEffects/explosion.mp3'
      );
      this.game.load.audio('sword', '/assets/audio/SoundEffects/sword.mp3');
      this.game.load.audio('blaster', '/assets/audio/SoundEffects/blaster.mp3');
    }

    create () {
      this.game.stage.setBackgroundColor('#414040');
      //
      let style = {font: '65px Arial', fill: '#52bace', align: 'center'};
      this.text = this.game.add.text(
          this.world.centerX,
          100,
          'decoding',
          style
      );
      this.text.anchor.set(0.5);
      //
      this.explosion = this.game.add.audio('explosion');
      this.sword = this.game.add.audio('sword');
      this.blaster = this.game.add.audio('blaster');
      //
      this.game.sound.setDecodedCallback(
          [this.explosion, this.sword, this.blaster],
          this.start,
          this
      );
    }

    update () {
    }

    render () {
    }

    start () {
      this.text.text = 'Press 1, 2 or 3';
      //
      let style = {font: '48px Arial', fill: '#cdba52', align: 'center'};
      //
      this.text1 = this.game.add.text(
          this.game.world.centerX,
          250,
          'Blaster: Stopped',
          style
      );
      this.text1.anchor.set(0.5);
      //
      this.text2 = this.game.add.text(
          this.game.world.centerX,
          350,
          'Explosion: Stopped',
          style
      );
      this.text2.anchor.set(0.5);
      //
      this.text3 = this.game.add.text(
          this.game.world.centerX,
          450,
          'Sword: Stopped',
          style
      );
      this.text3.anchor.set(0.5);
      //
      this.explosion.onStop.add(this.soundStopped, this);
      this.sword.onStop.add(this.soundStopped, this);
      this.blaster.onStop.add(this.soundStopped, this);
      //
      this.keys = this.game.input.keyboard.addKeys({
        blaster: Phaser.Keyboard.ONE,
        explosion: Phaser.Keyboard.TWO,
        sword: Phaser.Keyboard.THREE
      });
      this.keys.blaster.onDown.add(this.playFx, this);
      this.keys.explosion.onDown.add(this.playFx, this);
      this.keys.sword.onDown.add(this.playFx, this);
      //
      this.game.input.onDown.add(this.onTouch, this);
    }

    onTouch (pointer) {
      let b = this.game.height / 3;
      if (pointer.y < b) {
        this.playFx(this.keys.blaster);
      } else if (pointer.y > b * 2) {
        this.playFx(this.keys.sword);
      } else {
        this.playFx(this.keys.explosion);
      }
    }

    playFx (key) {
      switch (key.keyCode) {
        case Phaser.Keyboard.ONE: {
          this.text1.text = 'Blaster: Playing';
          this.blaster.play();
          break;
        }
        case Phaser.Keyboard.TWO: {
          this.text2.text = 'Explostion: Playing';
          this.explosion.play();
          break;
        }
        case Phaser.Keyboard.THREE: {
          this.text3.text = 'Sword: Playing';
          this.sword.play();
          break;
        }
      }
    }

    soundStopped (sound) {
      if (sound === this.blaster) {
        this.text1.text = 'Blaster: Complete';
      } else if (sound === this.explosion) {
        this.text2.text = 'Explosion: Complete';
      } else if (sound === this.sword) {
        this.text3.text = 'Sword: Complete';
      }
    }
  }
})();
