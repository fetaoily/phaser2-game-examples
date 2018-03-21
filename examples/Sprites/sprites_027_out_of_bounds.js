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
      this.player = null;
      this.aliens = null;
    }

    preload() {
      super.preload();
      //
      this.load.image('alien', '/assets/sprites/space-baddie.png');
      this.load.image('ship', '/assets/sprites/shmup-ship.png');
    }

    create() {
      this.player = this.add.sprite(400, 500, 'ship');
      this.player.anchor.setTo(0.5, 0.5);
      //
      this.aliens = this.add.group();
      this.aliens.enableBody = true;
      this.aliens.physicsBodyType = Phaser.Physics.ARCADE;
      //
      for (let y = 0; y < 4; y++) {
        for (let x = 0; x < 100; x++) {
          let alien = this.aliens.create(200 + x * 48, y * 50, 'alien');
          alien.name = 'alien' + x.toString + y.toString();
          alien.checkWorldBounds = true;
          alien.events.onOutOfBounds.add(this.alienOut, this);
          alien.body.velocity.y = 500 + Math.random() * 200;
        }
      }
    }
    //
    alienOut(alien) {
      alien.reset(alien.x, 0);
      alien.body.velocity.y = 50 + Math.random() * 200;
    }

    update() {}

    render() {}
  }
})();
