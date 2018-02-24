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
    this.c = 'rgb(255,255,255)';
    this.p = new Phaser.Point();
    //
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    //
    game.load.spritesheet('balls', '/assets/sprites/balls.png', 17, 17);
    game.load.image('arrow', '/assets/sprites/asteroids_ship.png');
  },
  create () {
    game.stage.backgroundColor = '#124184';
    //
    this.handle1 = game.add.sprite(235, 220, 'balls', 0);
    this.handle1.anchor.set(0.5);
    this.handle1.inputEnabled = true;
    this.handle1.input.enableDrag(true);
    //
    this.handle2 = game.add.sprite(377, 437, 'balls', 0);
    this.handle2.anchor.set(0.5);
    this.handle2.inputEnabled = true;
    this.handle2.input.enableDrag(true);
    //
    this.handle3 = game.add.sprite(160, 300, 'balls', 1);
    this.handle3.anchor.set(0.5);
    this.handle3.inputEnabled = true;
    this.handle3.input.enableDrag(true);
    //
    this.handle4 = game.add.sprite(450, 350, 'balls', 1);
    this.handle4.anchor.set(0.5);
    this.handle4.inputEnabled = true;
    this.handle4.input.enableDrag(true);
    //
    this.line1 = new Phaser.Line(this.handle1.x, this.handle1.y, this.handle2.x, this.handle2.y);
    this.line2 = new Phaser.Line(this.handle3.x, this.handle3.y, this.handle4.x, this.handle4.y);
    //
    this.arrow = game.add.sprite(0, 0, 'arrow');
    this.arrow.anchor.set(0.5);
    //
    this.normal = new Phaser.Line(0, 0, 0, 0);
    this.reflection = new Phaser.Line(0, 0, 0, 0);
  },
  update () {
    this.line1.fromSprite(this.handle1, this.handle2, false);
    this.line2.fromSprite(this.handle3, this.handle4, false);
    //
    this.p = this.line1.intersects(this.line2, true);
    if (this.p) {
      this.c = 'rgb(0,255,0)';
      this.normal.fromAngle(this.p.x, this.p.y, this.line2.normalAngle, 100);
      //
      let outgoing = this.line1.reflect(this.line2);
      this.reflection.fromAngle(this.p.x, this.p.y, outgoing, 200);
      //
      this.arrow.x = this.reflection.end.x;
      this.arrow.y = this.reflection.end.y;
      //
      this.arrow.rotation = this.reflection.angle;
      this.arrow.visible = true;
    } else {
      this.arrow.visible = false;
      this.c = 'rgb(255,255,255)';
    }
  },
  render () {
    game.debug.geom(this.line1, '#ff0000');
    game.debug.geom(this.line2, '#9999ff');
    //
    game.debug.lineInfo(this.line1, 32, 32);
    game.debug.lineInfo(this.line2, 32, 100);
    //
    if (this.p) {
      game.debug.geom(this.normal, '#ffffff');
      game.debug.geom(this.reflection, '#00ff00');
      //
      // game.context.fillStyle = 'rgb(255,0,255)';
      // game.context.fillRect(this.p.x - 2, this.p.y - 2, 5, 5);
    }
    //
    game.debug.text('Drag the handles', 32, 550);
  }
};