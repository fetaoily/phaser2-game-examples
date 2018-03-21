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
      this.load.image('disk', '/assets/sprites/darkwing_crazy.png');
    }

    create() {
      for (let i = 0; i < 15; i++) {
        let sprite = this.add.sprite(
          this.world.randomX,
          this.world.randomY,
          'disk'
        );
        //
        let rand = this.game.rnd.realInRange(-2, 6);
        //
        sprite.scale.setTo(rand, rand);
        //
        // sprite.scale.x = rand;
        // sprite.scale.y = rand;
      }
    }

    update() {}

    render() {}
  }
})();
