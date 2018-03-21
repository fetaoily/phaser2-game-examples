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
      this.baseIncSpeed = 0.006;
    }

    preload() {
      super.preload();
      //
      this.load.spritesheet(
        'item',
        '/assets/buttons/number-buttons-90x90.png',
        90,
        90
      );
    }

    create() {
      for (let i = 0; i < 3; i++) {
        this.add.sprite(290, 98 * (i + 1), 'item', i).alphaIncSpeed =
          this.baseIncSpeed * (i + 1);
        this.add.sprite(388, 98 * (i + 1), 'item', i + 3).alphaIncSpeed =
          this.baseIncSpeed * (i + 4);
      }
      //
      this.input.onTap.add(this.resetAlpha, this);
    }

    update() {}

    render() {
      this.game.debug.text(
        'Tap or click to set random alpha of all the items.',
        240,
        480
      );
    }

    resetAlpha(item) {
      this.world.setAll('alpha', Math.random());
    }
  }
})();
