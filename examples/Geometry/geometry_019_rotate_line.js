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
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
  },
  create () {
    game.stage.backgroundColor = '#011052';
    this.line = new Phaser.Line(300, 100, 500, 500);
  },
  update () {
    this.line.rotate(1, true);
  },
  render () {
    game.debug.geom(this.line);
  }
};