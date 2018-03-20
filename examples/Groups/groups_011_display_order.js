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
      this.items = null;
      this.card = null;
    }

    preload () {
      super.preload();
      //
      this.load.image('atari1', '/assets/sprites/atari130xe.png');
      this.load.image('atari2', '/assets/sprites/atari800.png');
      this.load.image('card', '/assets/sprites/mana_card.png');
    }

    create () {
      this.items = this.add.group();
      //
      this.items.create(64, 100, 'atari1');
      this.card = this.items.create(240, 80, 'card');
      this.items.create(280, 100, 'atari2');
      //
      this.input.onTap.addOnce(this.removeCard, this);
    }

    update () {
    }

    render () {
    }

    removeCard () {
      this.card.kill();
      //
      this.input.onTap.addOnce(this.replaceCard, this);
    }

    replaceCard () {
      let deadCard = this.items.getFirstDead();
      deadCard.revive();
    }
  }
})();
