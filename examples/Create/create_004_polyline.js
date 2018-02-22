let game;

let keys;

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
    this.data = [];
    this.polyline = [];
    this.tracing = false;
    this.current = null;
    this.dropZone = null;
    this.bmd = null;
  },
  create () {
    game.stage.backgroundColor = 0x000000;

    this.bmd = game.make.bitmapData(800, 600);
    this.bmd.addToWorld();

    keys = this.keys = game.input.keyboard.addKeys({
      'close': Phaser.Keyboard.SPACEBAR,
      'save': Phaser.Keyboard.S
    });
    //
    this.keys.close.onDown.add(this.closeLine, this);
    this.keys.save.onDown.add(this.save, this);
    //
    game.input.onDown.add(this.onDown, this);
    game.input.onUp.add(this.onUp, this);
    game.input.addMoveCallback(this.trace, this);
  },
  update () {
  },
  render () {
    if (this.current) {
      if (this.dropZone.contains(this.current.end.x, this.current.end.y)) {
        game.debug.geom(this.current, '#ffff00');
      } else {
        game.debug.geom(this.current, '#00ff00');
      }
    }
  },
  save () {
    console.clear();

    let s = 'var data = [\n';
    for (let i = 0; i < this.polyline.length; i++) {
      s += '\t[ ' + this.polyline[i].start.x + ', ' + this.polyline[i].start.y + ',' + this.polyline[i].end.x + ', ' + this.polyline[i].end.y + ']';
      if (i === this.polyline.length - 1) {
        s += '\n';
      } else {
        s += ',\n';
      }
    }
    s += '];';
    console.log(s);
  },
  closeLine () {
    if (this.current) {
      this.current = null;
      this.tracing = false;
    }
  },
  onDown (pointer) {
    if (this.tracing) {
      let x = this.current.end.x;
      let y = this.current.end.y;
      this.polyline.push(this.current.clone());

      this.bmd.line(this.current.start.x, this.current.start.y, this.current.end.x, this.current.end.y, '#00ff00');

      if (x === this.dropZone.x && y === this.dropZone.y) {
        this.data.push(this.polyline.slice(0));
        this.polyline = [];
        this.current = null;
        this.tracing = false;
        this.redraw();
      } else {
        this.current = new Phaser.Line(x, y, pointer.x, pointer.y);
      }
    } else {
      this.current = new Phaser.Line(pointer.x, pointer.y, pointer.x, pointer.y);
      this.dropZone = new Phaser.Circle(pointer.x, pointer.y, 16);
      this.tracing = true;
    }
  },
  redraw () {
    //
    this.bmd.cls();
    this.bmd.ctx.fillStyle = '#00aa00';
    //
    for (let i = 0; i < this.data.length; i++) {
      let path = this.data[i];
      this.bmd.ctx.beginPath();
      this.bmd.ctx.moveTo(this.path[0].start.x, this.path[0].start.y);

      for (let n = 0; n < path.length; n++) {
        this.bmd.ctx.lineTo(path[n].end.x, this.path[n].end.y);
      }

      this.bmd.ctx.closePath();
      this.bmd.ctx.fill();
    }
  },
  onUp (pointer) {
  },
  trace (pointer) {
    if (this.current) {
      if (this.dropZone.contains(pointer.x, pointer.y) && this.polyline.length > 1) {
        this.current.end.setTo(this.dropZone.x, this.dropZone.y);
      } else {
        this.current.end.setTo(pointer.x, pointer.y);
      }
    }
  }
};