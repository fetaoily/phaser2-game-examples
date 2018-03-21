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
      this.ballsGroup = null;
      this.shipsGroup = null;
    }

    preload() {
      super.preload();
      //
      this.load.image('ball','/assets/sprites/pangball.png');
      this.load.image('arrow','/assets/sprites/asteroids_ship.png');
    }

    create() {
      this.ballsGroup = this.add.group();
      this.shipsGroup = this.add.group();
      //
      for(let i=0;i<20;i++){
        this.ballsGroup.create(this.game.rnd.integerInRange(0,128),this.game.world.randomY,'ball');
        this.shipsGroup.create(this.game.rnd.integerInRange(0,128),this.game.world.randomY,'arrow');
      }
      //
      this.ballsGroup.add(this.shipsGroup);
    }

    update() {
      this.ballsGroup.x += 0.5;
      this.shipsGroup.x += 0.5;
    }

    render() {
      this.game.debug.spriteBounds(this.ballsGroup);
      this.game.debug.spriteBounds(this.shipsGroup);
    }
  }
})();
