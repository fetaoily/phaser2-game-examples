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
      this.pineapples = null;
    }

    preload() {
      super.preload();
      //
      this.load.image('pineapple', '/assets/sprites/pineapple.png');
    }

    create() {
      this.pineapples = this.add.group();
      this.pineapples.enableBody = true;
      this.pineapples.physicsBodyType = Phaser.Physics.ARCADE;
      //
      for (let i = 0; i < 10; i++) {
        let pineapple = this.pineapples.create(200 + i * 48, 50, 'pineapple');
        pineapple.body.collideWorldBounds = true;
        pineapple.body.gravity.x = this.game.rnd.integerInRange(-50, 50);
        pineapple.body.gravity.y = 100 + Math.random() * 100;
        //
        pineapple.body.bounce.setTo(0.9, 0.9);
      }
    }

    update() {
      this.physics.arcade.collide(this.pineapples);
    }

    render() {}
  }
})();
