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
      this.amrL = this.robot.create(90, 175, 'arm-l');
      this.armR = this.robot.create(549, 175, 'arm-r');
      this.legL = this.robot.create(270, 325, 'leg-l');
      this.legR = this.robot.create(410, 325, 'leg-r');
      this.body = this.robot.create(219, 32, 'body');
      this.eye = this.robot.create(335, 173, 'eye');
      //
      this.add
          .tween(this.robot.scale)
          .to(
              {x: 1.2, y: 1.3},
              1000,
              Phaser.Easing.Back.InOut,
              true,
              0,
              Number.MAX_VALUE
          )
          .yoyo(true);
    }

    update () {
    }

    render () {
      this.game.debug.spriteBounds(this.robot);
      this.game.debug.text(
          'The robot is a group and every coponent is a sprite.',
          32,
          32
      );
    }
  }
})();
