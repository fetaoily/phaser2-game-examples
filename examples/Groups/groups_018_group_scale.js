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
      this.load.spritesheet('coin', '/assets/sprites/coin.png', 32, 32);
    }

    create () {
      this.coins = this.add.group();
      for (let i = 0; i < 50; i++) {
        this.coins.create(
            this.world.randomX / 2,
            this.world.randomY / 2,
            'coin',
            0
        );
      }
      this.coins.scale.set(2, 2);
    }

    update () {
    }

    render () {
    }
  }
})();
