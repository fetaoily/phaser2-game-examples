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
      this.graphics = this.add.graphics(300, 200);
      this.graphics.lineStyle(1, 0xff000, 1);
      this.graphics.moveTo(0, 0);
      this.graphics.lineTo(100, 0);
      //
      this.graphics.lineStyle(1, 0x00ff00, 1);
      this.graphics.moveTo(100, 0);
      this.graphics.lineTo(100, 100);
      //
      this.graphics.lineStyle(1, 0x0000ff, 1);
      this.graphics.moveTo(100, 100);
      this.graphics.lineTo(0, 100);
      //
      this.graphics.lineStyle(1, 0xff00ff, 1);
      this.graphics.moveTo(0, 100);
      this.graphics.lineTo(0, 0);
    }

    update () {
    }

    render () {
    }
  }
})();