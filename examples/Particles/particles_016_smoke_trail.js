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
    //
    game.load.image('smoke', '/assets/particles/smoke-puff.png');
  },
  create () {
    game.stage.backgroundColor = '#03273e';
    //
    this.emitter = game.add.emitter(game.world.centerX, 500, 400);
    //
    this.emitter.makeParticles('smoke');
    //
    this.emitter.setXSpeed(0, 0);
    this.emitter.setYSpeed(0, 0);
    //
    this.emitter.setRotation(0, 0);
    this.emitter.setAlpha(0.1, 1, 3000);
    this.emitter.setScale(0.4, 2, 0.4, 2, 6000, Phaser.Easing.Quintic.Out);
    this.emitter.gravity = -100;
    //
    this.emitter.start(false, 4000, 20);
    //
    this.emitter.emitX = 64;
    this.emitter.emitY = 500;
    //
    game.add.tween(this.emitter).to({emitX: 800 - 64}, 1000, Phaser.Easing.Sinusoidal.InOut, true, 0, Number.MAX_VALUE, true);
    game.add.tween(this.emitter).to({emitY: 200}, 4000, Phaser.Easing.Sinusoidal.InOut, true, 0, Number.MAX_VALUE, true);
  },
  update () {
    this.emitter.customSort(this.scaleSort, this);
  },
  render () {
    game.debug.text(this.emitter.total, 32, 32);
  },
  scaleSort (a, b) {
    if (a.scale.x < b.scale.x) {
      return -1;
    } else if (a.scale.x > b.scale.x) {
      return 1;
    } else {
      return 0;
    }
  }
};