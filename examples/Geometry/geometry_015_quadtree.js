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
    this.markers = null;
    this.quadTree = null;
    this.rects = [];
    //
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
  },
  create () {
    this.quadTree = new Phaser.QuadTree(0, 0, 800, 600, 10, 4, 0);

    for (let i = 0; i < 48; i++) {
      let x = game.world.randomX;
      let y = game.world.randomY;
      //
      if (x > 760) {
        x = 760;
      }
      if (y > 560) {
        y = 560;
      }
      //
      let rect = new Phaser.Rectangle(x, y, 32, 32);
      rect.id = i;
      rect.flagged = false;
      this.rects.push(rect);
      this.quadTree.insert(rect);
    }
    this.marker = new Phaser.Rectangle(0, 0, 128, 128);
    game.input.onDown.add(this.retrieve, this);
  },
  update () {
    this.marker.x = game.input.x;
    this.marker.y = game.input.y;
  },
  render () {
    //
    game.debug.quadTree(this.quadTree);
    //
    for (let i = 0; i < this.rects.length; i++) {
      if (this.rects[i].flagged) {
        game.debug.geom(this.rects[i], '#ff0000');
      } else {
        game.debug.geom(this.rects[i]);
      }
      game.debug.text(this.rects[i].id, this.rects[i].x + 4, this.rects[i].y + 16);
    }
    //
    game.debug.geom(this.marker, '#00bff3', false);
  },
  retrieve () {
    for (let i = 0; i < this.rects.length; i++) {
      this.rects[i].flagged = false;
    }
    let found = this.quadTree.retrieve(this.marker);
    for (let i = 0; i < found.length; i++) {
      found[i].flagged = true;
    }
  }
};