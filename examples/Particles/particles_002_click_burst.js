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
    game.load.image('diamond', '/assets/sprites/diamond.png');
  },
  create () {
    //
    game.physics.startSystem(Phaser.Physics.ARCADE);
    //
    game.stage.backgroundColor = 0x337799;
    //
    this.emitter = game.add.emitter(0, 0, 100);
    this.emitter.makeParticles('diamond');
    this.emitter.gravity = 200;
    //
    game.input.onDown.add(this.particleBurst, this);
  },
  update () {
  },
  render () {
  },
  particleBurst (pointer) {
    //
    this.emitter.x = pointer.x;
    this.emitter.y = pointer.y;
    //
    this.emitter.start(true, 2000, null, 10);
  }
};