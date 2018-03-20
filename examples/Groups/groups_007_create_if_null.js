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
      this.veg.createMultiple(5, 'veg', 0, false);
      //
      this.time.events.repeat(Phaser.Timer.SECOND, 20, this.resurrect, this);
    }

    update () {
    }

    render () {
      this.game.debug.text('getFirstDead will be called every second', 32, 32);
      this.game.debug.text(
          'Living: ' + this.veg.countLiving() + ' Dead: ' + this.veg.countDead(),
          32,
          64
      );
    }

    resurrect () {
      let x = this.world.randomX;
      let y = this.world.randomY;
      let key = 'veg';
      let frame = this.rnd.between(0, 36);
      //
      this.veg.getFirstDead(true, x, y, key, frame);
    }
  }
})();
