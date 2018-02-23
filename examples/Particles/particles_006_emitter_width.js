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
    game.load.image('water', '/assets/skies/sunset.png');
  },
  create () {
    game.add.image(0, 0, 'water');
    //
    this.emitter = game.add.emitter(game.world.centerX, 200, 200);
    this.emitter.width = 800;
    this.emitter.makeParticles('bubble');
    //
    this.emitter.minParticleSpeed.set(0, 300);
    this.emitter.maxParticleSpeed.set(0, 400);
    //
    this.emitter.setRotation(0, 0);
    this.emitter.setAlpha(0.3, 0.8);
    // this.emitter.setScale(0.5, 0.5, 1, 1);
    this.emitter.setScale(2, 2, 2, 2);
    //
    this.emitter.gravity = -200;
    //
    this.emitter.start(false, 5000, 100);

  },
  update () {
  },
  render () {
    game.debug.text(this.emitter.total, 32, 32);
  }
};