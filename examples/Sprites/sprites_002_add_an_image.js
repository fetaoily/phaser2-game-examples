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
      //
      this.load.image('pic', '/assets/pics/acryl_bladerunner.png');
    }

    create() {
      this.add.image(100, 100, 'pic');
    }

    update() {}

    render() {}
  }
})();
