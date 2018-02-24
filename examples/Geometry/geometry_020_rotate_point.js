let game;

window.onload = () => {
  game = new Phaser.Game(800, 600, Phaser.CANVAS);
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
    this.p1 = new Phaser.Point(300, 300);
    this.p2 = new Phaser.Point(400, 300);
  },
  update () {
    this.p1.rotate(this.p2.x, this.p2.y, 1, true);
  },
  render () {
    game.context.fillStyle = 'rgb(255,255,0)';
    game.context.fillRect(this.p1.x, this.p1.y, 4, 4);
    //
    game.context.fillStyle = 'rgb(255,0,0)';
    game.context.fillRect(this.p2.x, this.p2.y, 4, 4);
  }
};