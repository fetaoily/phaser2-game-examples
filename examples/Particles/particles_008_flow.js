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
    game.scale.pageAlignVertically = false;
    //
    game.load.image('sky', '/assets/skies/sky4.png');
    game.load.image('leaf', '/assets/particles/leaf1.png');
  },
  create () {
    game.add.image(0, 0, 'sky');
    //
    this.emitter = game.add.emitter(game.world.centerX, 0, 100);
    this.emitter.makeParticles('leaf');
    //
    this.emitter.minParticleSpeed.setTo(-300, 30);
    this.emitter.maxParticleSpeed.setTo(300, 100);
    this.emitter.minParticleScale = 0.1;
    this.emitter.maxParticleScale = 0.5;
    this.emitter.gravity = 250;
    //
    // this.emitter.flow(2000, 500, 5, -1);
    // this.emitter.flow(2000, 100, 1, 100);
    // this.emitter.start(false, 5000, 100)
  },
  update () {
  },
  render () {
  }
};