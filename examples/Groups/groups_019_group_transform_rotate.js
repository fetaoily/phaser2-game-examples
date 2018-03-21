(() => {
  'use strict';
  let game;

  window.onload = () => {
    game = new NewGame();
  };

  class NewGame extends ErtaoGame {
    constructor () {
      super(800, 600, Phaser.AUTO);
      this.state.add('PlayGame', PlayGame);
      this.state.start('PlayGame');
    }
  }

  class PlayGame extends ErtaoGameState {
    constructor () {
      super();
      this.robot = null;
    }

    preload () {
      super.preload();
      //
      this.load.image('eye', '/assets/sprites/robot/eye.png');
      this.load.image('body', '/assets/sprites/robot/body.png');
      this.load.image('arm-l', '/assets/sprites/robot/arm-l.png');
      this.load.image('arm-r', '/assets/sprites/robot/arm-r.png');
      this.load.image('leg-l', '/assets/sprites/robot/leg-l.png');
      this.load.image('leg-r', '/assets/sprites/robot/leg-r.png');
    }

    create () {
      this.robot = this.add.group();
      //
      this.robot.x = 300;
      this.robot.y = 200;
      //
      this.robot.pivot.x = 300;
      this.robot.pivot.y = 300;
      //
      this.amrL = this.robot.create(90, 175, 'arm-l');
      this.armR = this.robot.create(549, 175, 'arm-r');
      this.legL = this.robot.create(270, 325, 'leg-l');
      this.legR = this.robot.create(410, 325, 'leg-r');
      this.body = this.robot.create(219, 32, 'body');
      this.eye = this.robot.create(335, 173, 'eye');
      //
      // this.body.anchor.set(0.5);
    }

    update () {
      this.robot.rotation += 0.02;
      // this.body.rotation -= 0.02;
    }

    render () {
      this.game.debug.text(
          'The robot is a group and every component is a sprite.',
          240,
          580
      );
    }
  }
})();
