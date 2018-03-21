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
      //
      this.load.image('bunny', '/assets/sprites/bunny.png');
    }

    create() {
      this.wabbit = new MonsterBunny(this.game, 200, 300, 1);
      this.wabbit.anchor.setTo(0.5, 0.5);
      //
      this.wabbit2 = new MonsterBunny(this.game, 600, 300, 0.5);
      this.wabbit2.anchor.setTo(0.5, 0.5);
      //
      this.add.existing(this.wabbit);
      this.add.existing(this.wabbit2);
    }

    update() {}

    render() {
      this.game.debug.spriteInfo(this.wabbit, 32, 32);
      this.game.debug.spriteInfo(this.wabbit2, 32, 32 * 5);
    }
  }

  class MonsterBunny extends Phaser.Sprite {
    constructor(game, x, y, rotateSpeed) {
      super(game, x, y, 'bunny');
      this.rotateSpeed = rotateSpeed;
    }

    update() {
      this.angle += this.rotateSpeed;
    }
  }
})();
