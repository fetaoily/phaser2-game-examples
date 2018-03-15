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
    }

    preload () {
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.scale.pageAlignHorizontally = true;
      this.scale.pageAlignVertically = true;
      //
      this.game.load.spritesheet(
          'phaser',
          '/assets/tests/tween/phaser.png',
          70,
          90
      );
      this.game.load.image('starfield', '/assets/misc/starfield.jpg');
    }

    create () {
      let item;
      //
      this.game.add.tileSprite(0, 0, 800, 600, 'starfield');
      for (let i = 0; i < 6; i++) {
        item = this.game.add.sprite(190 + 69 * i, -90, 'phaser', i);
        this.game.add
            .tween(item)
            .to(
                {y: 240},
                2400,
                Phaser.Easing.Bounce.Out,
                true,
                1000 + 400 * i,
                false
            );
      }
    }

    update () {
    }

    render () {
    }
  }
})();
