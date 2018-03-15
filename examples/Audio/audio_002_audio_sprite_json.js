(() => {
  'use strict';
  let game;
  let audioJSON = {
    spritemap: {
      'alien death': {
        start: 1,
        end: 2,
        loop: false
      },
      'boss hit': {
        start: 3,
        end: 3.5,
        loop: false
      },
      escape: {
        start: 4,
        end: 7.2,
        loop: false
      },
      meow: {
        start: 8,
        end: 8.5,
        loop: false
      },
      numkey: {
        start: 9,
        end: 9.1,
        loop: false
      },
      ping: {
        start: 10,
        end: 11,
        loop: false
      },
      death: {
        start: 12,
        end: 16.2,
        loop: false
      },
      shot: {
        start: 17,
        end: 18,
        loop: false
      },
      squit: {
        start: 19,
        end: 19.3,
        loop: false
      }
    }
  };

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
      this.game.load.image('title', '/assets/pics/catastrophi.png');
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
      this.game.load.audiosprite(
          'sfx',
          '/assets/audio/SoundEffects/fx_mixdown.ogg',
          null,
          audioJSON
      );
    }

    create () {
      this.game.add.image(0, 0, 'title');
      //
      this.fx = this.game.add.audioSprite('sfx');
      this.fx.allowMultiple = true;
      //
      this.makeButton('alien death', 600, 100);
      this.makeButton('boss hit', 600, 140);
      this.makeButton('escape', 600, 220);
      this.makeButton('meow', 600, 220);
      this.makeButton('numkey', 600, 260);
      this.makeButton('ping', 600, 300);
      this.makeButton('death', 600, 340);
      this.makeButton('shot', 600, 380);
      this.makeButton('squit', 600, 420);
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
      let text = this.game.add.bitmapText(x, y + 7, 'nokia', name, 16);
      text.x += button.width / 2 - text.textWidth / 2;
    }

    click (button) {
      this.fx.play(button.name);
    }
  }
})();
