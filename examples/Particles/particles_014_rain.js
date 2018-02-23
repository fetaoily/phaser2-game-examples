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
    game.load.image('sky', '/assets/skies/underwater2.png');
    game.load.spritesheet('rain', '/assets/sprites/rain.png');
  },
  create () {
    game.add.image(0, 0, 'sky');
    //
    this.emitter = game.add.emitter(game.world.centerX, 0, 400);
    this.emitter.width = game.world.width;
    // this.emitter.angle = 30;
    //
    this.emitter.makeParticles('rain');
    //
    this.emitter.minParticleScale = 0.1;
    this.emitter.maxParticleScale = 2;
    //
    this.emitter.setXSpeed(-5, 5);
    this.emitter.setYSpeed(300, 500);
    //
    this.emitter.minRotation = 0;
    this.emitter.maxRotation = 0;
    //
    this.emitter.start(false, 1600, 5, 0);
  },
  update () {
  },
  render () {
  }
};