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
    this.rectA = new Phaser.Rectangle(0, 0, 200, 100);
    this.rectB = new Phaser.Rectangle(100, 100, 500, 400);
  },
  update () {
    this.rectA.x = game.input.activePointer.x;
    this.rectA.y = game.input.activePointer.y;
  },
  render () {
    game.debug.geom(this.rectA, 'rgb(200,0,0,0.5)');
    game.debug.geom(this.rectB, 'rgb(0,0,255,0.5)');
    //
    let intersects = Phaser.Rectangle.intersection(this.rectA, this.rectB);
    game.debug.geom(intersects, 'rgb(255,0,0,1)');
  }
};