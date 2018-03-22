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
      this.i = null;
      this.r = null;
      this.bmd = null;
      this.bmdDest = null;
      this.colors = null;
    }

    preload() {
      super.preload();
    }

    create() {
      this.bmd = this.make.bitmapData(this.game.width, this.game.height);
      //
      this.bmdDest = this.make.bitmapData(this.game.width, this.game.height);
      this.bmdDest.addToWorld();
      //
      this.colors = Phaser.Color.HSVColorWheel();
      //
      this.input.addMoveCallback(this.paint, this);
      //
      this.i = 0;
      this.r = new Phaser.Rectangle(0, 0, this.game.width, this.game.height);
      //
      this.data = { r: 0, s: 0.5 };
      //
      this.add
        .tween(this.data)
        .to(
          { r: 300, s: 2 },
          2000,
          Phaser.Easing.Sinusoidal.InOut,
          true,
          0,
          Number.MAX_VALUE,
          true
        );
    }

    update() {
      this.bmdDest.fill(0, 0, 0, 0, 1);
      this.bmdDest.copy(this.bmd, 0, 0);
    }

    render() {}

    paint(pointer, x, y) {
      if (pointer.isDown) {
        this.bmd.circle(x, y, 4, this.colors[this.i].rgba);
        this.i = this.game.math.wrapValue(this.i, 1, 359);
      }
    }
  }
})();
