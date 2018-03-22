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
      this.bmd1 = null;
      this.bmd2 = null;
    }

    preload() {
      super.preload();
      //
      this.load.image('pic', '/assets/pics/Equality_by_Ragnarok.png');
    }

    create() {
      this.stage.setBackgroundColor('#2d2d2d');
      //
      this.bmd1 = this.make.bitmapData(800, 600);
      this.bmd1.copy('pic');
      this.bmd1.addToWorld();
      //
      this.bmd2 = this.make.bitmapData(64, 64);
      this.bmd2.circle(32, 32, 32, 'rgba(255,0,255,0.2)');
      //
      this.input.addMoveCallback(this.paint, this);
    }

    update() {}

    render() {}

    paint(pointer, x, y) {
      if (pointer.isDown) {
        this.bmd1.draw(this.bmd2, x - 16, y - 16);
      }
    }
  }
})();
