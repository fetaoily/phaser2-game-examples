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
      this.load.image('bg', '/assets/pics/undersea.jpg');
      this.load.image('loop', '/assets/sprites/beball1.png');
    }

    create() {
      this.add.sprite(0, 0, 'bg');
      //
      let group = this.make.group();
      //
      for (let i = 0; i < 40; i++) {
        group.create(this.world.randomX, this.world.randomY, 'loop');
      }
      //
      let bmd = this.add.bitmapData(this.game.width,this.game.height);
      bmd.addToWorld();
      bmd.drawGroup(group);
    }

    update() {}
  }
})();
