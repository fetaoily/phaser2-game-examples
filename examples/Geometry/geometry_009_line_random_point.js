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
    this.colors = Phaser.Color.HSVColorWheel();
    //
    this.lines = [];
    //
    for (let c = 0; c < 50; c++) {
      this.lines.push(new Phaser.Line(game.world.randomX, game.world.randomY, game.world.randomX, game.world.randomY));
    }
    //
    this.bmd = game.add.bitmapData(game.width, game.height);
    this.bmd.addToWorld();
    //
    this.p = new Phaser.Point();
  },
  update () {
    for (let c = 0; c < this.lines.length; c++) {
      this.lines[c].random(this.p);
      this.p.floor();
      this.bmd.setPixel(this.p.x, this.p.y, this.colors[this.i].r, this.colors[this.i].g, this.colors[this.i].b);
    }
    this.i = game.math.wrapValue(this.i, 1, 359);
  },
  render () {
  }
};