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
      this.bmd = null;
      this.loop = null;
    }

    preload() {
      super.preload();
      //
      this.load.image('loop', '/assets/sprites/loop.png');
    }

    create() {
      this.loop = this.make.sprite(0, 0, 'loop');
      this.loop.anchor.set(0.5);
      //
      this.bmd = this.add.bitmapData(this.game.width, this.game.height);
      this.bmd.addToWorld();
      //
      this.bmd.smoothed = false;
      //
      this.input.addMoveCallback(this.paint, this);
    }

    update() {
      this.loop.rotation += 0.1;
    }

    render() {}

    paint(pointer, x, y) {
      if (pointer.isDown) {
        this.bmd.draw(this.loop, x, y);
      }
    }
  }
})();
