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
      this.sprite = null;
    }

    preload() {
      super.preload();
      //
      this.load.image('disk', '/assets/sprites/copy-that-floppy.png');
    }

    create() {
      this.sprite = this.add.sprite(400, 100, 'disk');
      this.add
        .tween(this.sprite)
        .to({ angle: 45 }, 2000, Phaser.Easing.Linear.None, true);
      this.add
        .tween(this.sprite.scale)
        .to({ x: 2, y: 2 }, 2000, Phaser.Easing.Linear.None, true);
    }

    update() {}

    render() {}
  }
})();
