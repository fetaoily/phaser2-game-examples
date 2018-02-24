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
    game.stage.backgroundColor = '#124184';
    //
    this.line = new Phaser.Line(100, 100, 200, 200);
  },
  update () {
    this.line.centerOn(game.input.activePointer.x, game.input.activePointer.y);
    this.line.rotate(0.05);
  },
  render () {
    game.debug.geom(this.line);
    game.debug.lineInfo(this.line, 32, 32);
  }
};