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
    }

    preload () {
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.scale.pageAlignHorizontally = true;
      this.scale.pageAlignVertically = true;
    }

    create () {
      this.graphics = this.add.graphics(this.world.centerX, this.world.centerY);
      this.graphics.lineStyle(8, 0xffd900);
      this.graphics.arc(0, 0, 135, 0, 1.5707963267948966, false);
      //
      this.graphics.lineStyle(0);
      this.graphics.beginFill(0xff3300);
      this.graphics.arc(-100, -100, 135, this.math.degToRad(0), this.math.degToRad(90), true);
      this.graphics.endFill();
    }

    update () {
    }

    render () {
    }
  }
})();