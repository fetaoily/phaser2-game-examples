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
      this.atari1 = null;
      this.atari2 = null;
    }

    preload() {
      super.preload();
      //
      this.load.image('atari1', '/assets/sprites/atari130xe.png');
      this.load.image('atari2', '/assets/sprites/atari800xl.png');
    }

    create() {
      //
      this.atari1 = this.add.sprite(100, 100, 'atari1');
      this.atari2 = this.add.sprite(250, 90, 'atari2');
      //
      this.input.onTap.add(this.swapSprites, this);
    }

    update() {}

    render() {
      this.game.debug.text(
        'Tap screen to swap the children and therefore swap their indexes.',
        10,
        280
      );
    }

    swapSprites() {
      this.world.swap(this.atari1, this.atari2);
    }
  }
})();
