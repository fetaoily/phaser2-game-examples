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
    }

    preload() {
      super.preload();
      //
      this.load.image('arrow', '/assets/sprites/arrow.png');
    }

    create() {
      this.stage.setBackgroundColor('#0072bc');
      //
      this.sprite = this.add.sprite(400, 300, 'arrow');
      this.sprite.anchor.setTo(0.5, 0.5);
    }

    update() {
      this.sprite.angle += 1;
    }

    render() {
      this.game.debug.spriteInfo(this.sprite, 32, 32);
    }
  }
})();
