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
    this.circle = new Phaser.Circle(game.world.centerX, 100, 64);
  },
  update () {
  },
  render () {
    game.debug.geom(this.circle, '#cfffff');
    game.debug.text('Diameter : ' + this.circle.diameter, 50, 200);
    game.debug.text('Circumference : ' + this.circle.circumference(), 50, 230);
  }
};