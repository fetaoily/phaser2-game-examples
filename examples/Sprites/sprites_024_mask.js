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
      this.mask = null;
    }

    preload() {
      super.preload();
      //
      this.load.image('chaos', '/assets/pics/hotshot-chaos_in_tokyo.png');
    }

    create() {
      this.sprite = this.add.sprite(0, 0, 'chaos');
      this.sprite.scale.set(2);
      //
      this.mask = this.add.graphics(0, 0);
      this.mask.beginFill(0xffffff);
      this.mask.drawCircle(100, 100, 100);
      //
      this.sprite.mask = this.mask;
      //
      this.input.addMoveCallback(this.move, this);
    }

    update() {}

    render() {}

    move(pointer, x, y) {
      this.mask.x = x - 100;
      this.mask.y = y - 100;
    }
  }
})();
