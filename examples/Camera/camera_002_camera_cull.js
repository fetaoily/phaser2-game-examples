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
    }

    preload () {
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.scale.pageAlignHorizontally = true;
      this.scale.pageAlignVertically = true;
      //
      this.load.image(
          'disk',
          '/assets/sprites/ra_dont_crack_under_pressure.png'
      );
    }

    create () {
      this.stage.setBackgroundColor('#1822d3b');
      //
      this.s = this.add.sprite(this.world.centerX, this.world.centerY, 'disk');
      this.s.anchor.setTo(0.5, 0.5);
    }

    update () {
      this.s.rotation += 0.01;
      if (this.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
        this.s.x -= 4;
      } else if (this.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
        this.s.x += 4;
      }
      //
      if (this.input.keyboard.isDown(Phaser.Keyboard.UP)) {
        this.s.y -= 4;
      } else if (this.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
        this.s.y += 4;
      }
    }

    render () {
      this.game.debug.spriteBounds(this.s);
      this.game.debug.spriteInfo(this.s, 20, 32);
    }
  }
})();
