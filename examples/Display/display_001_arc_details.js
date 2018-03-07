(() => {
  let game;

  window.onload = () => {
    game = new NewGame();
  };

  class NewGame extends Phaser.Game {
    constructor () {
      super(800, 600, Phaser.AUTO);
      this.state.add('PlayGame', PlayGame);
      this.state.start('PlayGame');
    }
  }

  class PlayGame extends Phaser.State {
    constructor () {
      super();
      this.info = null;
      this.graphics1 = null;
      this.graphics2 = null;
      this.angle = {min: 0, max: 0};
    }

    preload () {
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.scale.pageAlignHorizontally = true;
      this.scale.pageAlignVertically = true;
    }

    create () {
      this.stage.setBackgroundColor(0x2d2d2d);
      //
      this.graphics1 = this.add.graphics(0, 0);
      this.graphics2 = this.add.graphics(0, 0);
      //
      let style = {font: '24px Arial', fill: '#ffffff', align: 'center'};
      this.info = this.add.text(32, 32, 'Arc', style);
      //
      this.add.text(130, 500, 'Clockwise', style);
      this.add.text(530, 500, 'Anticlockwise', style);
      //
      this.add.tween(this.angle).to({max: 360}, 6000, "Linear", true, 0, -1, true);
    }

    update () {
      //
      this.info.text = 'Arc maxAngle: ' + Math.round(this.angle.max);
      //
      this.graphics1.clear();
      this.graphics1.lineStyle(2, 0xffffff);
      this.graphics1.beginFill(0x00bff3);
      this.graphics1.arc(200, 300, 160, this.angle.min, this.math.degToRad(this.angle.max), false);
      this.graphics1.endFill();
      //
      this.graphics2.clear();
      this.graphics2.lineStyle(2, 0xffffff);
      this.graphics2.beginFill(0xa000f3);
      this.graphics2.arc(600, 300, 160, this.angle.min, this.math.degToRad(this.angle.max), true);
      this.graphics2.endFill();
    }

    render () {
    }
  }
})();