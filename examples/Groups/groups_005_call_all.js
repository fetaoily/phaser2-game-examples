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
        item.inputEnabled = true;
        item.events.onInputUp.add(this.kill);
        //
        item = this.add.sprite(388, 98 * (i + 1), 'item', i + 3);
        item.inputEnabled = true;
        item.events.onInputUp.add(this.kill);
      }
      //
      this.add.button(270, 400, 'reviveBtn', this.reviveAll, this, 0, 0, 0);
    }

    update () {
    }

    render () {
    }

    kill (item) {
      item.kill();
    }

    reviveAll () {
      this.world.callAll('revive');
    }
  }
})();
