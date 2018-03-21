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
      this.chick = null;
      this.car = null;
      this.mech = null;
      this.robot = null;
      this.cop = null;
    }

    preload() {
      super.preload();
      //
      this.load.atlas(
        'atlas',
        '/assets/pics/texturepacker_test.png',
        '/assets/pics/texturepacker_test.json'
      );
    }

    create() {
      this.stage.setBackgroundColor('#404040');
      //
      this.click = this.add.sprite(64, 64, 'atlas');
      this.click.frameName = 'budbrain_chick.png';
      //
      this.cop = this.add.sprite(600, 64, 'atlas');
      this.cop.frameName = 'ladycop.png';
      //
      this.robot = this.add.sprite(50, 300, 'atlas');
      this.robot.frameName = 'robot.png';
      //
      this.car = this.add.sprite(100, 400, 'atlas');
      this.car.frameName = 'supercars_parsec.png';
      //
      this.mech = this.add.sprite(250, 100, 'atlas');
      this.mech.frameName = 'titan_mech.png';
    }

    update() {}

    render() {}
  }
})();
