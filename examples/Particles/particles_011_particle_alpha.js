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
    game.load.image('corona', '/assets/particles/blue.png');
  },
  create () {
    game.stage.backgroundColor = '#000000';
    //
    this.emitter = game.add.emitter(game.world.centerX, 500, 200);
    this.emitter.makeParticles('corona');
    //
    this.emitter.setRotation(0, 0);
    this.emitter.setAlpha(0.3, 0.8);
    this.emitter.setScale(0.5, 1);
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