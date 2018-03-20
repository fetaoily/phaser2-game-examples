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
      this.yourGroup = null;
    }

    preload () {
      super.preload();
      //
      this.load.image('sonic', '/assets/sprites/sonic_havok_sanity.png');
    }

    create () {
      this.yourGroup = this.add.group();
      for (let i = 0; i < 10; i++) {
        this.yourGroup.create(this.world.randomX, this.world.randomY, 'sonic');
      }
    }

    update () {
    }

    render () {
    }
  }
})();
