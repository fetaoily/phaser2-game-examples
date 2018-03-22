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
      this.area = null;
      this.dropTime = 0;
    }

    preload() {
      super.preload();
      //
      this.load.image('pic', '/assets/pics/hotshot-chaos_in_tokyo.png');
    }

    create() {
      this.stage.setBackgroundColor('#2d2d2d');
      //
      this.bmd = this.make.bitmapData();
      this.bmd.load('pic').cls();
      //
      this.bmd.addToWorld(
        this.world.centerX,
        this.world.centerY,
        0.5,
        0.5,
        2,
        2
      );
      //
      this.stage.smoothed = false;
      //
      this.area = new Phaser.Rectangle(0, this.bmd.height, this.bmd.width, 1);
      //
      this.dropTime = this.game.time.now + 250;
    }

    update() {
      if (this.area.y > 0 && this.game.time.now > this.dropTime) {
        for (let y = 0; y < this.area.y; y++) {
          this.bmd.copyRect('pic', this.area, 0, y);
        }
        this.area.y--;
        this.dropTime = this.game.time.now + 25;
      }
    }

    render() {}
  }
})();
