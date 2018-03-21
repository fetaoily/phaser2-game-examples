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
      this.group1 = null;
      this.group2 = null;
    }

    preload() {
      super.preload();
      //
      this.load.image('ship1', '/assets/sprites/bsquadron1.png');
      this.load.image('ship2', '/assets/sprites/bsquadron3.png');
    }

    create() {
      this.group1 = this.add.group();
      this.group1.y = 600;
      //
      this.group2 = this.add.group();
      this.group2.y = -150;
      //
      for (let i = 0; i < 10; i++) {
        this.group1.create(
          this.game.rnd.between(0, 740),
          this.game.rnd.between(0.1),
          'ship1'
        );
        this.group2.create(
          this.game.rnd.between(0, 736),
          this.game.rnd.between(0.1),
          'ship2'
        );
      }
      //
      this.add.tween(this.group1).to({ y: -150 }, 5000, 'Linear', true, 0, -1);
      this.add.tween(this.group2).to({ y: 600 }, 5000, 'Linear', true, 0, -1);
      //
      this.input.onDown.addOnce(this.moveShips, this);
    }

    update() {}

    render() {
      this.game.debug.text('Group 1 size: ' + this.group1.length, 32, 32);
      this.game.debug.text('Group 2 size: ' + this.group2.length, 32, 32 * 2);
      //
      if (this.group1.length === 10) {
        this.game.debug.text('Click to move children', 32, 96);
      }
    }

    moveShips() {
      this.group1.moveAll(this.group2);
    }
  }
})();
