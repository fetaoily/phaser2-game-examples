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
    game.load.spritesheet('balls', '/assets/sprites/balls.png', 17, 17);
  },
  create () {
    //
    this.emitter = game.add.emitter(game.world.centerX, game.world.centerY, 250);
    //
    this.emitter.makeParticles('balls', [0, 1, 2, 3, 4, 5]);
    //
    this.emitter.minParticleSpeed.setTo(-400, -400);
    this.emitter.maxParticleSpeed.setTo(400, 400);
    //
    this.emitter.gravity = 0;
    // this.emitter.gravity = 1000;
    //
    this.emitter.start(false, 4000, 15);
  },
  update () {
  },
  render () {
  }
};