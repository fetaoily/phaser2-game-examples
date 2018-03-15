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
      this.fx = null;
    }

    preload () {
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.scale.pageAlignHorizontally = true;
      this.scale.pageAlignVertically = true;
      //
      this.game.load.image('bg', '/assets/pics/cougar_dragonsun.png');
      this.game.load.spritesheet(
          'button',
          '/assets/buttons/flixel-button.png',
          80,
          20
      );
      this.game.load.bitmapFont(
          'nokia',
          '/assets/fonts/bitmapFonts/nokia16black.png',
          '/assets/fonts/bitmapFonts/nokia16black.xml'
      );
      this.game.load.audio('sfx', [
        '/assets/audio/SoundEffects/magical_horror_audiosprite.mp3',
        '/assets/audio/SoundEffects/magical_horror_audiosprite.ogg'
      ]);
    }

    create () {
      this.bg = this.game.add.image(0, 0, 'bg');
      this.bg.width = 800;
      this.bg.height = 600;
      //
      this.fx = this.game.add.audio('sfx');
      this.fx.allowMultiple = false;
      //
      this.fx.addMarker('charm', 0, 2.7);
      this.fx.addMarker('curse', 4, 2.9);
      this.fx.addMarker('fireball', 8, 5.2);
      this.fx.addMarker('spell', 14, 4.7);
      this.fx.addMarker('soundscape', 20, 18.8);
      //
      this.makeButton('charm', 600, 100);
      this.makeButton('curse', 600, 140);
      this.makeButton('fireball', 600, 180);
      this.makeButton('spell', 600, 220);
      this.makeButton('soundscape', 600, 260);
      this.makeButton('pause', 600, 380);
    }

    update () {
    }

    render () {
    }

    makeButton (name, x, y) {
      let button = this.game.add.button(
          x,
          y,
          'button',
          this.click,
          this,
          0,
          1,
          2
      );
      button.name = name;
      button.scale.set(2, 1.5);
      button.smoothed = false;
      //
      let text = this.game.add.bitmapText(x, y + 7, 'nokia', name, 16);
      text.x += button.width / 2 - text.textWidth / 2;
    }

    click (button) {
      if (button.name === 'pause') {
        if (this.fx.paused) {
          this.fx.resume();
        } else {
          this.fx.pause();
        }
      } else {
        this.fx.play(button.name);
      }
    }
  }
})();
