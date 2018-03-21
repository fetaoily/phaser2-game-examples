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
    }

    preload() {
      super.preload();
      //
      this.load.image('trsi', '/assets/pics/trsipic1_lazur.jpg');
    }

    create() {
      this.pic = this.add.image(this.world.centerX, 550, 'trsi');
      this.pic.anchor.setTo(0.5, 1);
      //
      this.cropRect = new Phaser.Rectangle(0, 0, 0, this.pic.height);
      //
      let tween = this.add
        .tween(this.cropRect)
        .to(
          { width: this.pic.width },
          3000,
          Phaser.Easing.Bounce.Out,
          false,
          0,
          1000,
          true
        );
      this.pic.crop(this.cropRect);
      tween.start();
    }

    update() {
      this.pic.updateCrop();
    }

    render() {}
  }
})();
