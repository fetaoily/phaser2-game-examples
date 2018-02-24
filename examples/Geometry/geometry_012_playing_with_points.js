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
    //
    this.p1 = null;
    this.p2 = null;
    this.p3 = null;
    this.p4 = null;
    //
    this.d2 = 1;
    this.d3 = 4;
    this.d4 = 16;
    //
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
  },
  create () {
    this.p1 = new Phaser.Point(game.world.centerX, game.world.centerY);
    this.p2 = new Phaser.Point(this.p1.x - 50, this.p1.y - 50);
    this.p3 = new Phaser.Point(this.p2.x - 50, this.p2.y - 50);
    this.p4 = new Phaser.Point(this.p3.x - 50, this.p3.y - 50);
  },
  update () {
    this.p2.rotate(this.p1.x, this.p1.y, this.d2, true, 150);
    this.p3.rotate(this.p2.x, this.p2.y, this.d3, true, 100);
    this.p4.rotate(this.p3.x, this.p3.y, this.d4, true, 50);
  },
  render () {
    //
    game.debug.context.strokeStyle = 'rgb(0,255,255)';
    game.debug.context.beginPath();
    game.debug.context.moveTo(this.p1.x, this.p1.y);
    game.debug.context.lineTo(this.p2.x, this.p2.y);
    game.debug.context.lineTo(this.p3.x, this.p3.y);
    game.debug.context.lineTo(this.p4.x, this.p4.y);
    game.debug.context.stroke();
    game.debug.context.closePath();
    //
    game.debug.context.fillStyle = 'rgb(255,255,0)';
    game.debug.context.fillRect(this.p1.x, this.p1.y, 4, 4);
    //
    game.debug.context.fillStyle = 'rgb(255,0,0)';
    game.debug.context.fillRect(this.p2.x, this.p2.y, 4, 4);
    //
    game.debug.context.fillStyle = 'rgb(0,255,0)';
    game.debug.context.fillRect(this.p3.x, this.p3.y, 4, 4);
    //
    game.debug.context.fillStyle = 'rgb(255,0,255)';
    game.debug.context.fillRect(this.p4.x, this.p4.y, 4, 4);

  }
};