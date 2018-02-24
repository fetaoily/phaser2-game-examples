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
    this.line = new Phaser.Line(64, 64, 200, 300);
    game.input.onDown.add(this.click, this);
  },
  update () {
    if (this.setting) {
      if (game.input.activePointer.isDown) {
        this.line.end.set(game.input.activePointer.x, game.input.activePointer.y);
      } else {
        this.setting = false;
      }
    }
  },
  render () {
    game.debug.geom(this.line);
    game.debug.rectangle(this.line);
  },
  click (pointer) {
    this.setting = true;
    this.line.start.set(pointer.x, pointer.y);
  }
};