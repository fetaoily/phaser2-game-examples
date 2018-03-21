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
      this.load.image('pic', '/assets/pics/questar.png');
      this.load.image('mask', '/assets/pics/mask-test2.png');
    }

    create() {
      this.stage.setBackgroundColor(0x4d4d4d);
      //
      this.add.text(64, 10, 'Source image', {
        font: '16px Arial',
        fill: '#ffffff'
      });
      this.add.image(64, 32, 'pic');
      this.add.text(400, 10, 'Alpha mask', {
        font: '16px Arial',
        fill: '#ffffff'
      });
      this.add.image(400, 32, 'mask');
      //
      this.bmd = this.make.bitmapData(320, 256);
      this.bmd.alphaMask('pic', 'mask');
      //
      this.add.image(this.world.centerX, 320, this.bmd).anchor.set(0.5, 0);
    }

    update() {}

    render() {}
  }
})();
