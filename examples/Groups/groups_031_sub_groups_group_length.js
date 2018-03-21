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
      this.friendAndFoe = null;
      this.enemies = null;
      //
      this.normalBaddies = null;
      this.purpleBaddies = null;
    }

    preload() {
      super.preload();
      //
      this.load.image('ufo', '/assets/sprites/ufo.png');
      this.load.image('baddie', '/assets/sprites/space-baddie.png');
      this.load.image(
        'purple-baddie',
        '/assets/sprites/space-baddie-purple.png'
      );
    }

    create() {
      this.friendAndFoe = this.add.group();
      this.enemies = this.add.group();
      //
      this.normalBaddies = this.add.group();
      this.purpleBaddies = this.add.group();
      //
      this.friendAndFoe.create(200, 240, 'ufo');
      //
      for (let i = 0; i < 16; i++) {
        this.createBaddie();
      }
      //
      this.input.onTap.add(this.createBaddie, this);
    }

    update() {}

    render() {
      this.game.debug.style = '#fff';
      this.game.debug.text(
        'Tap screen or click to create new baddies.',
        16,
        24
      );
      this.game.debug.text(
        'enemies: ' +
          this.enemies.length +
          ' (actually ' +
          this.enemies.length +
          ' groups)',
        16,
        48
      );
      this.game.debug.text(
        'bormal baddies: ' + this.normalBaddies.length,
        16,
        60
      );
      this.game.debug.text(
        'purple baddies: ' + this.purpleBaddies.length,
        16,
        72
      );
      this.game.debug.text('firends: ' + this.friendAndFoe.length, 16, 96);
    }

    createBaddie() {
      let baddie;
      if (Math.random() > 0.5) {
        baddie = this.purpleBaddies.create(
          360 + Math.random() * 200,
          120 + Math.random() * 200,
          'purple-baddie'
        );
      } else {
        baddie = this.normalBaddies.create(
          360 + Math.random() * 20,
          120 + Math.random() * 200,
          'baddie'
        );
      }
    }
  }
})();
