(() => {
  'use strict';

  let game;

  window.onload = () => {
    game = new NewGame();
  };

  class NewGame extends ErtaoGame {
    constructor () {
      super(800, 600, Phaser.AUTO);
      this.state.add('PlayGame', PlayGame);
      this.state.start('PlayGame');
    }
  }

  class PlayGame extends ErtaoGameState {
    constructor () {
      super();
      this.baseAlphaIncSpeed = 0.006;
    }

    preload () {
      super.preload();
      //
      this.load.spritesheet(
          'item',
          '/assets/buttons/number-buttons-90x90.png',
          90,
          90
      );
    }

    create () {
      for (let i = 0; i < 3; i++) {
        this.add.sprite(290, 98 * (i + 1), 'item', i).alphaIncSpeed =
            this.baseAlphaIncSpeed * (i + 1);
        this.add.sprite(388, 98 * (i + 1), 'item', i + 3).alphaIncSpeed =
            this.baseAlphaIncSpeed * (i + 4);
      }
    }

    update () {
      this.world.forEach(item => {
        item.alpha -= item.alphaIncSpeed;
        if (item.alpha < 0.001 || item.alpha > 0.999) {
          item.alphaIncSpeed *= -1;
        }
      });
    }

    render () {
      this.game.debug.text('ALpha of items is always changing.', 280, 480);
    }
  }
})();
