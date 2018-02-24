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
    this.i = 0;
    this.p = null;
    //
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
  },
  create () {
    //
    this.colors = Phaser.Color.HSVColorWheel();
    //
    this.circle = new Phaser.Circle(game.world.centerX, game.world.centerY, 500);
    //
    this.bmd = game.add.bitmapData(game.width, game.height);
    this.bmd.addToWorld();
    //
    this.graphics = game.add.graphics(0, 0);
    this.graphics.lineStyle(1, 0x00ff00, 1);
    this.graphics.drawCircle(this.circle.x, this.circle.y, this.circle.diameter);
    //
    this.p = new Phaser.Point();
  },
  update () {
    for (let c = 0; c < 10; c++) {
      this.circle.random(this.p);
      this.p.floor();
      this.bmd.setPixel(this.p.x, this.p.y, this.colors[this.i].r, this.colors[this.i].g, this.colors[this.i].b);
    }
    this.i = game.math.wrapValue(this.i, 1, 359);
    //
  },
  render () {
    // game.debug.geom(this.circle);
  }
};