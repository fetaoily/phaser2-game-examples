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
      this.tooltip = null;
      this.sprite = null;
    }

    preload() {
      super.preload();
      this.load.image('wheel', 'assets/pics/color_wheel_swirl.png');
    }

    create() {
      this.bmd = game.make.bitmapData(800, 600);
      this.bmd.draw('wheel', -200, -100);
      this.bmd.update();
      this.bmd.addToWorld();

      this.tooltip = game.make.bitmapData(64, 64);
      this.sprite = game.add.sprite(0, 0, this.tooltip);

      this.input.addMoveCallback(this.updateTooltip, this);
    }

    update() {}

    render() {}

    updateTooltip(pointer, x, y) {
      if (x >= 0 && x <= this.bmd.width && y >= 0 && y <= this.bmd.height) {
        
        let color = this.bmd.getPixelRGB(x, y);

        this.tooltip.fill(0, 0, 0);
        this.tooltip.rect(1, 1, 62, 62, color.rgba);

        this.sprite.x = x;
        this.sprite.y = y;
      }
    }
  }
})();
