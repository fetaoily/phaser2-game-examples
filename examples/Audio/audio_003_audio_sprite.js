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
      this.game.load.audio('sfx', '/assets/audio/SoundEffects/fx_mixdown.ogg');
    }

    create () {
      this.game.add.image(0, 0, 'title');
      //
      this.fx = this.game.add.audio('sfx');
      this.fx.allowMultiple = true;
      //
      this.fx.addMarker('alien death', 1, 1.0);
      this.fx.addMarker('boss hit', 3, 0.5);
      this.fx.addMarker('escape', 4, 3.2);
      this.fx.addMarker('meow', 8, 0.5);
      this.fx.addMarker('numkey', 9, 0.1);
      this.fx.addMarker('ping', 10, 1.0);
      this.fx.addMarker('death', 12, 4, 2);
      this.fx.addMarker('shot', 17, 1.0);
      this.fx.addMarker('squit', 19, 0.3);
      //
      this.makeButton('alien death', 600, 100);
      this.makeButton('boss hit', 600, 100 + 40 * 1);
      this.makeButton('escape', 600, 100 + 40 * 2);
      this.makeButton('meow', 600, 100 + 40 * 3);
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
      //
      let text = this.game.add.bitmapText(x, y + 7, 'nokia', name, 16);
      text.x += button.width / 2 - text.textWidth / 2;
    }

    click (button) {
      this.fx.play(button.name);
    }
  }
})();
