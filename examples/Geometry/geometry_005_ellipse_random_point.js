let game;

window.onload = () => {
  game = new Phaser.Game(800, 600, Phaser.AUTO);
  game.state.add('PlayGame', PlayGame);
  game.state.start('PlayGame');
};

let PlayGame = function () {
};

PlayGame.prototype = {
  preload () {
    //
    this.bmb = null;
    this.ellipse = null;
    this.colors = null;
    this.i = 0;
    this.p = null;
    //
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    //

  },
  create () {
    this.colors = Phaser.Color.HSVColorWheel();
    //
    this.ellipse = new Phaser.Ellipse(game.world.centerX, game.world.centerY, 300, 550);
    //
    this.bmd = game.add.bitmapData(game.width, game.height);
    this.bmd.addToWorld();
    //
    this.p = new Phaser.Point();
  },
  update () {
    for (let c = 0; c < 10; c++) {
      let color = this.colors[this.i];
      this.ellipse.random(this.p);
      this.p.floor();
      this.bmd.setPixel(this.p.x, this.p.y, color.r, color.g, color.b);
    }
    this.i = game.math.wrapValue(this.i, 1, 359);
  },
  render () {
  }
};