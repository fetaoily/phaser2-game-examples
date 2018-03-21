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
    }

    create() {
      this.bmd = this.add.bitmapData(128, 128);
      this.bmd.ctx.beginPath();
      this.bmd.ctx.rect(0, 0, 128, 128);
      this.bmd.ctx.fillStyle = '#ff0000';
      this.bmd.ctx.fill();
      //
      this.sprite = this.add.sprite(200, 200, this.bmd);
    }

    update() {}

    render() {}
  }
})();
