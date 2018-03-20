(() => {
  'use strict';

  let game;

  window.onload = () => {
    game = new NewGame();
  };

  class NewGame extends ErtaoGame {
    constructor () {
      super(800, 600, Phaser.AUTO);
      this.state.add('PlayGame', PlayGame);
      this.state.start('PlayGame');
    }
  }

  class PlayGame extends ErtaoGameState {
    constructor () {
      super();
      this.veg = null;
    }

    preload () {
      super.preload();
      //
      this.load.spritesheet(
          'veg',
          '/assets/sprites/fruitnveg32wh37.png',
          32,
          32
      );
    }

    create () {
      this.veg = this.add.group();
      this.veg.createMultiple(20, 'veg', 0, false);
      //
      this.game.time.events.repeat(
          Phaser.Timer.SECOND,
          20,
          this.resurrect,
          this
      );
    }

    update () {
    }

    render () {
      this.game.debug.text('One item will be resurrected every second', 32, 32);
      this.game.debug.text(
          'Living: ' + this.veg.countLiving() + ' Dead: ' + this.veg.countDead(),
          32,
          64
      );
    }

    resurrect () {
      let item = this.veg.getFirstDead();
      if (item) {
        item.reset(this.world.randomX, this.world.randomY);
        //
        item.frame = this.game.rnd.integerInRange(0, 36);
      }
    }
  }
})();
