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
    game.load.image('glass', '/assets/particles/glass.png');
    game.load.image('water', '/assets/demoscene/blue-raster-floor.png');
  },
  create () {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    //
    game.add.tileSprite(0, 344, 800, 256, 'water');
    //
    this.emitter = game.add.emitter(game.world.centerX, 200);
    this.emitter.makeParticles('glass');
    //
    this.emitter.setXSpeed(-200, 200);
    this.emitter.setYSpeed(-150, -250);
    //
    this.emitter.bringToTop = true;
    this.emitter.setAlpha(0.1, 1, 500);
    this.emitter.setScale(-2, 2, 1, 1, 3000, Phaser.Easing.Sinusoidal.InOut, true);
    this.emitter.gravity = 300;
    //
    this.emitter.start(false, 5000, 700, 50);
  },
  update () {
  },
  render () {
  }
};