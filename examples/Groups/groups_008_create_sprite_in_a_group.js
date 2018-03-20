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
      this.friendAndFoe = null;
      this.enemies = null;
    }

    preload () {
      super.preload();
      //
      this.load.image('ufo', '/assets/sprites/ufo.png');
      this.load.image('baddie', '/assets/sprites/space-baddie.png');
    }

    create () {
      this.friendAndFoe = this.add.group();
      this.enemies = this.add.group();
      //
      this.friendAndFoe.create(200, 240, 'ufo');
      //
      for (let i = 0; i < 8; i++) {
        this.createBaddie();
      }
      //
      this.input.onTap.add(this.createBaddie, this);
    }

    update () {
    }

    render () {
      this.game.debug.text(
          'Tap screen or click to create new baddies.',
          16,
          24
      );
    }

    createBaddie () {
      this.enemies.create(
          360 + Math.random() * 200,
          120 + Math.random() * 200,
          'baddie'
      );
    }
  }
})();
