(() => {
  let game;

  window.onload = () => {
    game = new NewGame();
  };

  class NewGame extends Phaser.Game {
    constructor () {
      // super(800,600,Phaser.AUTO);
      super(800, 600, Phaser.CANVAS);
      this.state.add('PlayGame', PlayGame);
      this.state.start('PlayGame');
    }
  }

  class PlayGame extends Phaser.State {
    constructor () {
      super();
      this.i = 0;
      this.bmd = null;
      this.colors = null;
    }

    preload () {
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.scale.pageAlignHorizontally = true;
      this.scale.pageAlignVertically = true;
    }

    create () {
      this.bmd = this.add.bitmapData(800, 600);
      this.add.sprite(0, 0, this.bmd);
      //
      this.colors = Phaser.Color.HSVColorWheel();
      //
      this.input.addMoveCallback(this.paint1, this);
      this.input.addMoveCallback(this.paint2, this);
      this.input.addMoveCallback(this.paint3, this);
      this.input.addMoveCallback(this.paint4, this);
      this.input.addMoveCallback(this.paint5, this);
      //
      this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.addOnce(this.remove, this);
    }

    update () {
    }

    render () {
    }

    remove () {
      this.input.deleteMoveCallback(this.paint3, this);
    }

    paint1 (pointer, x, y) {
      if (pointer.isDown) {
        this.bmd.circle(x, y, 16, this.colors[this.i].rgba);
        this.i = this.math.wrapValue(this.i, 1, 359);
      }
    }

    paint2 (pointer, x, y) {
      if (pointer.isDown) {
        this.bmd.circle(x, y + 64, 8, this.colors[this.i].rgba);
      }
    }

    paint3 (pointer, x, y) {
      if (pointer.isDown) {
        this.bmd.circle(x, y - 64, 8, this.colors[this.i].rgba);
      }
    }

    paint4 (pointer, x, y) {
      if (pointer.isDown) {
        this.bmd.circle(x - 64, y, 8, this.colors[this.i].rbga);
      }
    }

    paint5 (pointer, x, y) {
      if (pointer.isDown) {
        this.bmd.circle(x + 64, y, 8, this.colors[this.i].rgba);
      }
    }
  }
})();