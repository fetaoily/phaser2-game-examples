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
      this.sprite = null;
      this.point = null;
      this.dec = false;
    }

    preload() {
      super.preload();
      //
      this.load.image('pic', '/assets/pics/lance-overdose-loader_eye.png');
    }

    create() {
      this.stage.setBackgroundColor('#0072bc');
      //
      this.point = new Phaser.Point(300, 300);
      //
      this.sprite = this.add.sprite(this.point.x, this.point.y, 'pic');
      //
      this.input.onDown.add(this.updateAnchor, this);
    }

    update() {
      this.sprite.rotation += 0.01;
    }

    render() {}

    updateAnchor() {
      if (this.dec) {
        this.sprite.anchor.x -= 0.1;
        this.sprite.anchor.y -= 0.1;
        if (this.sprite.anchor.x <= 0) {
          this.dec = false;
        }
      } else {
        this.sprite.anchor.x += 0.1;
        this.sprite.anchor.y += 0.1;
        if (this.sprite.anchor.x >= 1) {
          this.dec = true;
        }
      }
    }
  }
})();
