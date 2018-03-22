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
      this.stage.setBackgroundColor('#003663');
      //
      this.bmd = this.add.bitmapData(32, 32);
      this.grd = this.bmd.context.createLinearGradient(0, 0, 0, 32);
      this.grd.addColorStop(0, '#e8d6ff');
      this.grd.addColorStop(1, '#004cb3');
      this.bmd.context.fillStyle = this.grd;
      this.bmd.context.fillRect(0, 0, 32, 32);
      //
      this.cache.addBitmapData('blueShade', this.bmd);
      //
      this.add.sprite(8, 8, this.cache.getBitmapData('blueShade'));
      //
      this.createBox();
      //
      this.game.time.events.repeat(
        Phaser.Timer.SECOND,
        20,
        this.createBox,
        this
      );
      //
      this.game.input.onDown.add(this.updateBitmapDataTexture, this);
    }

    update() {}

    render() {
      this.game.debug.text('Click to regenerate the texture', 48, 30);
    }

    createBox() {
      let sprite = this.add.sprite(
        this.world.randomX,
        this.world.randomY,
        this.cache.getBitmapData('blueShade')
      );
      //
      this.physics.arcade.enable(sprite);
      //
      sprite.body.collideWorldBounds = true;
      sprite.body.bounce.set(1);
      sprite.body.velocity.x = this.game.rnd.realInRange(-200, 200);
      sprite.body.velocity.y = this.game.rnd.realInRange(-200, 200);
    }

    updateBitmapDataTexture() {
      let bmd = this.cache.getBitmapData('blueShade');
      let grd = bmd.context.createLinearGradient(0, 0, 0, 32);
      //
      grd.addColorStop(0, this.generateHexColor());
      grd.addColorStop(0, this.generateHexColor());
      bmd.context.fillStyle = grd;
      bmd.context.fillRect(0,0,32,32);
      //
      bmd.dirty = true;
    }

    generateHexColor() {
      return `#${(((0.5 + 0.5 * Math.random()) * 0xffffff) << 0).toString(16)}`;
    }
  }
})();
