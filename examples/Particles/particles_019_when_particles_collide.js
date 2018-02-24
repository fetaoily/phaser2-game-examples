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
    game.load.image('sky', '/assets/skies/cavern2.png');
    game.load.spritesheet('balls', '/assets/sprites/balls.png', 17, 17);
  },
  create () {
    game.add.image(0, 0, 'sky');
    //
    game.physics.startSystem(Phaser.Physics.ARCADE);
    //
    this.leftEmitter = game.add.emitter(50, game.world.centerY - 200);
    this.leftEmitter.bounce.setTo(0.5, 0.5);
    this.leftEmitter.setXSpeed(100, 200);
    this.leftEmitter.setYSpeed(-50, 50);
    this.leftEmitter.makeParticles('balls', 0, 250, true, true);
    //
    this.rightEmitter = game.add.emitter(game.world.width - 50, game.world.centerY - 200);
    this.rightEmitter.bounce.setTo(0.5, 0.5);
    this.rightEmitter.setXSpeed(-100, -200);
    this.rightEmitter.setYSpeed(-50, 50);
    this.rightEmitter.makeParticles('balls', 1, 250, true, true);
    //
    this.leftEmitter.start(false, 5000, 20);
    this.rightEmitter.start(false, 5000, 20);
  },
  update () {
    game.physics.arcade.collide(this.leftEmitter, this.rightEmitter, this.change, null, this);
  },
  render () {
  },
  change (a, b) {
    a.frame = game.rnd.integerInRange(0, 5);
    b.frame = game.rnd.integerInRange(0, 5);
  }
};