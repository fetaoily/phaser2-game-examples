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
    }

    preload () {
      //
      super.preload();
      //
      this.load.image('blue', '/assets/sprites/blue_ball.png');
      this.load.image('red', '/assets/sprites/orb-red.png');
      this.load.image('card', '/assets/sprites/mana_card.png');
      this.load.image('hotdog', '/assets/sprites/hotdog.png');
    }

    create () {
      this.items = this.add.group();
      //
      for (let i = 0; i < 10; i++) {
        this.items.create(this.world.randomX, this.world.randomY, 'blue');
        this.items.create(this.world.randomX, this.world.randomY, 'red');
        this.items.create(this.world.randomX, this.world.randomY, 'card');
      }
      //
      this.input.onDown.add(this.pickCard, this);
    }

    update () {
    }

    render () {
    }

    pickCard () {
      let card = this.items.iterate('key', 'card', Phaser.Group.RETURN_CHILD);
      if (card !== null) {
        card.loadTexture('hotdog');
      }
    }
  }
})();
