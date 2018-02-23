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
    game.load.image('alien', '/assets/sprites/space-baddie.png');
  },
  create () {
    this.emitter = game.add.emitter(game.world.centerX, game.world.centerY, 250);
    this.emitter.makeParticles('alien');
    //
    this.emitter.minParticleSpeed.setTo(-300, -300);
    this.emitter.maxParticleSpeed.setTo(300, 300);
    //
    this.emitter.minRotation = 0;
    this.emitter.maxRotation = 0;
    //
    this.emitter.start(false, 4000, 15);
  },
  update () {
  },
  render () {
  }
};