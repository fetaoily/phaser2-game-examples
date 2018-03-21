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
    }

    preload() {
      super.preload();
      //
      this.load.image('bunny', '/assets/sprites/bunny.png');
    }

    create() {
      for (let i = 0.1; i < 2; i += 0.1) {
        new MonsterBunny(this.game, i);
      }
    }

    update() {}

    render() {}
  }

  class MonsterBunny extends Phaser.Sprite {
    constructor(game, rotateSpeed) {
      super(game, game.world.randomX, game.world.randomY, 'bunny');
      //
      this.anchor.setTo(0.5, 0.5);
      this.rotateSpeed = rotateSpeed;
      //
      let randomScale = 0.1 + Math.random();
      this.scale.setTo(randomScale, randomScale);
      //
      this.game.add.existing(this);
    }

    update() {
      this.angle += this.rotateSpeed;
    }
  }
})();
