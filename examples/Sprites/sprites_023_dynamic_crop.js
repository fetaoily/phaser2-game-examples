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
      this.pic = null;
      this.cropRect = null;
      this.w = null;
      this.h = null;
    }

    preload() {
      super.preload();
      //
      this.load.image('trsi', '/assets/pics/trsipic1_lazur.jpg');
    }

    create() {
      this.pic = this.add.sprite(0, 0, 'trsi');
      //
      this.w = this.pic.width;
      this.h = this.pic.height;
      //
      this.cropRect = new Phaser.Rectangle(0, 0, 128, 128);
      //
      this.pic.crop(this.cropRect);
    }

    update() {
      if (this.game.input.x < this.w && this.game.input.y < this.h) {
        this.pic.x = this.game.input.x;
        this.pic.y = this.game.input.y;
        //
        this.cropRect.x = this.game.input.x;
        this.cropRect.y = this.game.input.y;
        //
        this.pic.updateCrop();
      }
    }

    render() {
      this.game.debug.text(
        'x: ' + this.game.input.x + ' y: ' + this.game.input.y,
        32,
        32
      );
    }
  }
})();
