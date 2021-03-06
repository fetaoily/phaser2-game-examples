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
    //
    game.load.spritesheet('balls', '/assets/sprites/balls.png', 17, 17);
  },
  create () {
    //
    game.stage.backgroundColor = '#124184';
    //
    this.handle1 = game.add.sprite(100, 200, 'balls', 0);
    this.handle1.anchor.set(0.5);
    this.handle1.inputEnabled = true;
    this.handle1.input.enableDrag(true);
    //
    this.handle2 = game.add.sprite(400, 300, 'balls', 0);
    this.handle2.anchor.set(0.5);
    this.handle2.inputEnabled = true;
    this.handle2.input.enableDrag(true);
    //
    this.line1 = new Phaser.Line(this.handle1.x, this.handle1.y, this.handle2.x, this.handle2.y);
  },
  update () {
    this.line1.fromSprite(this.handle1, this.handle2, false);
  },
  render () {
    game.debug.geom(this.line1);
    game.debug.lineInfo(this.line1, 32, 32);
    game.debug.text('Drag the handles', 32, 550);
    game.debug.text(this.line1.start.x + ':' + this.line1.start.y, this.line1.start.x + 10, this.line1.start.y - 10);
    game.debug.text(this.line1.end.x + ':' + this.line1.end.y, this.line1.end.x + 10, this.line1.end.y - 10);
  }
};