(() => {
  'use strict';
  let game;

  window.onload = () => {
    game = new NewGame();
  };

  class NewGame extends ErtaoGame {
    constructor() {
      super(800, 600, Phaser.AUTO);
      this.state.add('PlayGame', PlayGame);
      this.state.start('PlayGame');
    }
  }

  class PlayGame extends ErtaoGameState {
    constructor() {
      super();
    }

    preload() {
      super.preload();
      this.load.image('mushroom', '/assets/sprites/mushroom2.png');
    }

    create() {
      this.add.sprite(200, 200, 'mushroom');
    }

    update() {}

    render() {}
  }
})();
