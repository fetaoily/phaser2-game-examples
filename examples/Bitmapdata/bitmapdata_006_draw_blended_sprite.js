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
      this.load.image('back', '/assets/pics/swirl1.jpg');
      this.load.image('loop', '/assets/particles/glass.png');
    }

    create() {
      this.add.image(0, 0, 'back');
      //
      this.loop = this.make.sprite(0, 0, 'loop');
      this.loop.anchor.set(0.5);
      this.loop.scale.set(0.05);
      this.loop.alpha = 0.01;
      //
      this.bmd = this.add.bitmapData(this.game.width, this.game.height);
      this.bmd.fill(0, 0, 0, 1);
      this.bmd.addToWorld();
      //
      this.input.addMoveCallback(this.paint, this);
      //
      this.add
        .tween(this.loop.scale)
        .to(
          { x: 0.75, y: 0.75 },
          2000,
          Phaser.Easing.Linear.None,
          true,
          0,
          Number.MAX_VALUE,
          true
        );
      //
      this.add
        .tween(this.loop)
        .to(
          { alpha: 0.25 },
          1000,
          Phaser.Easing.Linear.None,
          true,
          0,
          Number.MAX_VALUE,
          true
        );
    }

    update() {
      this.loop.rotation += 0.1;
    }

    render() {}

    paint(pointer, x, y) {
      if (pointer.isDown) {
        this.bmd.draw(this.loop, x, y, null, null, 'destination-out');
      }
    }
  }
})();
