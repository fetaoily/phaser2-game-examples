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
      this.start = null;
      this.texture1 = null;
      this.data = { res: 6, pow: 10000, angle: 0.1, height: 6 };
    }

    preload() {
      super.preload();
      //
      this.load.image('star', '/assets/sprites/chunk.png');
    }

    create() {
      this.star = this.make.sprite(0, 0, 'star');
      //
      this.texture1 = this.add.renderTexture(800, 600, 'texrure1');
      //
      this.add.sprite(0, 0, this.texture1);
      //
      this.add
        .tween(this.data)
        .to({ height: 12 }, 3000, 'Sine.easeInOut', true, 4000, -1, true);
      this.add
        .tween(this.data)
        .to({ angle: 1.0 }, 4000, 'Linear', true, 0, -1, true);
    }

    update() {
      this.plot();
    }

    render() {}

    plot() {
      this.texture1.clear();
      //
      for (let x = -100; x <= 100; x += 2) {
        let v =
          this.data.res *
          Math.floor(Math.sqrt(this.data.pow - x * x) / this.data.res);
        for (let y = v; y > -v; y -= this.data.res) {
          let z =
            32 * Math.sin(Math.sqrt(x * x + y * y) / this.data.height) +
            this.data.angle * y;
          let drawX = 400 + Math.floor(x * 3);
          let drawY = 300 + Math.floor(z * 2);
          this.texture1.renderRawXY(this.star, drawX, drawY, false);
        }
      }
    }
  }
})();
