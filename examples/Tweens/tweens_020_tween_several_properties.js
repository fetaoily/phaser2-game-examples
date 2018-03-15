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
      this.game.load.image('sky', '/assets/skies/sky4.png');
      this.game.load.spritesheet(
          'phaser',
          '/assets/tests/tween/phaser.png',
          70,
          90
      );
    }

    create () {
      this.game.add.sprite(0, 0, 'sky');
      let item;

      for (let i = 0; i < 6; i++) {
        item = this.game.add.sprite(190 + 69 * i, -100, 'phaser', i);
        item.anchor.setTo(0.5, 0.5);
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
        this.game.add
            .tween(item)
            .to(
                {angle: 360},
                2400,
                Phaser.Easing.Cubic.In,
                true,
                100 + 400 * i,
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
