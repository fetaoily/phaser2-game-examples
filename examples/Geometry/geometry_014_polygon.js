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
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
  },
  create () {
    this.poly = new Phaser.Polygon();
    this.poly.setTo([new Phaser.Point(200, 100), new Phaser.Point(350, 100), new Phaser.Point(375, 200), new Phaser.Point(150, 200)]);
    //
    this.graphics = game.add.graphics(0,0);
    this.graphics.beginFill(0xff33ff);
    this.graphics.drawPolygon(this.poly.points);
    this.graphics.endFill();
  },
  update () {
  },
  render () {
  }
};