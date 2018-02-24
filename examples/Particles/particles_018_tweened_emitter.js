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
    game.load.image('bubble', '/assets/particles/bubble.png');
    game.load.image('water', '/assets/demoscene/blue-raster-floor.png');
  },
  create () {
    game.add.tileSprite(0, 344, 800, 256, 'water');
    //
    this.emitter = game.add.emitter(game.world.centerX, 32, 250);
    this.emitter.makeParticles('bubble');
    this.emitter.setXSpeed(0, 0);
    this.emitter.setYSpeed(200, 200);
    //
    this.emitter.bringToTop = true;
    this.emitter.setRotation(0, 0);
    //
    this.emitter.setAlpha(0.1, 1, 2000);
    this.emitter.setScale(0.1, 2, 0.1, 2, 4000);
    this.emitter.gravity = 100;
    //
    this.emitter.start(false, 5000, 50);
    //
    this.emitter.emitX = 200;
    //
    game.add.tween(this.emitter).to({emitX: 600}, 2000, Phaser.Easing.Back.InOut, true, 0, Number.MAX_VALUE, true);
  },
  update () {
  },
  render () {
  }
};