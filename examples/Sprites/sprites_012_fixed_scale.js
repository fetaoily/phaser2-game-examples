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
      this.parent = null;
      this.child = null;
    }

    preload() {
      super.preload();
      //
      this.load.image('disk', '/assets/sprites/copy-that-floppy.png');
      this.load.image('ball', '/assets/sprites/mushroom2.png');
    }

    create() {
      this.parent = this.add.sprite(100, 100, 'disk');
      this.parent.name = 'disk';
      //
      this.child = this.make.sprite(0, 0, 'ball');
      this.parent.addChild(this.child);
      this.child.setScaleMinMax(1, 2);
      //
      this.add
        .tween(this.parent.scale)
        .to(
          { x: 3, y: 3 },
          2000,
          Phaser.Easing.Linear.None,
          true,
          0,
          1000,
          true
        );
    }

    update() {}

    render() {}
  }
})();
