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
      this.enemies = null;
    }

    preload() {
      super.preload();
      //
      this.load.image('baddie', '/assets/sprites/space-baddie.png');
      this.load.spritesheet(
        'button',
        '/assets/buttons/baddie-buttons.png',
        224,
        70
      );
    }

    create() {
      this.enemies = this.add.group();
      //
      for (let i = 0; i < 8; i++) {
        this.enemies.create(360 + Math.random() * 200, 120 + Math.random() * 200, 'baddie');
      }
      //
      this.add.button(16, 50, 'button', this.createBaddie, this, 0, 0, 0);
      this.add.button(16, 130, 'button', this.killBaddie, this, 1, 1, 1);
    }

    update() {}

    render() {
      this.game.debug.text('Recycle baddies from a group using getFirstExists.', 16, 24);
      this.game.debug.text('Notice that you cannot add more then 8 baddies since we only create 8 instance.', 16, 36);
      this.game.debug.text('Living baddies: ' + (this.enemies.countLiving()), 340, 420);
    }

    killBaddie() {
      let baddie = this.enemies.getFirstAlive();
      if (baddie) {
        baddie.kill();
      }
    }

    createBaddie() {
      let enemy = this.enemies.getFirstExists(false);
      if (enemy) {
        enemy.revive();
      }
    }
  }
})();