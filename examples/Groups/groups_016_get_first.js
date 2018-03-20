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
      this.timer = null;
      this.cycle = null;
    }

    preload () {
      super.preload();
      //
      this.load.spritesheet(
          'item',
          '/assets/buttons/number-buttons-90x90.png',
          90,
          90
      );
      this.load.image('reviveBtn', '/assets/buttons/revive-button.png');
    }

    create () {
      let item;
      for (let i = 0; i < 3; i++) {
        item = this.add.sprite(290, 98 * (i + 1), 'item', i);
        item = this.add.sprite(388, 98 * (i + 1), 'item', i + 3);
      }
      this.timer = 0;
      this.cycle = 1000;
    }

    update () {
      if (this.game.time.now > this.timer) {
        this.timer = this.game.time.now + this.cycle;
        let item = this.world.getFirstAlive();
        if (item) {
          item.kill();
        }
      }
    }

    render () {
      this.game.debug.text('One item will the killed each second.', 280, 420);
      this.game.debug.text(
          'Living: ' +
          this.world.countLiving() +
          ', Dead: ' +
          this.world.countDead(),
          330,
          440
      );
    }
  }
})();
