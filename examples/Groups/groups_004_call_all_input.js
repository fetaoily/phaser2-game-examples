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
      this.coins = null;
    }

    preload () {
      super.preload();
      //
      this.load.spritesheet('coin', '/assets/sprites/coin.png', 32, 32);
    }

    create () {
      this.coins = this.add.group();
      //
      for (let i = 0; i < 50; i++) {
        let coin = this.coins.create(
            this.world.randomX,
            this.world.randomY,
            'coin',
            0
        );
      }
      //
      this.coins.setAll('inputEnabled', true);
      this.coins.callAll(
          'events.onInputDown.add',
          'events.onInputDown',
          this.removeCoin
      );
    }

    update () {
    }

    render () {
    }

    removeCoin (item) {
      console.info(item);
      item.alpha = 0.3;
    }
  }
})();
