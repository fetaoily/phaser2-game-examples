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
    game.load.image('sky', '/assets/skies/sky4.png');
    game.load.spritesheet('veggies', '/assets/sprites/fruitnveg32wh37.png', 32, 32);
  },
  create () {
    game.add.image(0, 0, 'sky');
    //
    this.emitter = game.add.emitter(game.world.centerX, game.world.centerY, 250);
    this.emitter.makeParticles('veggies', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20], 200, true, true);
    //
    this.emitter.minParticleSpeed.setTo(-200, -200);
    this.emitter.maxParticleSpeed.setTo(200, -400);
    //
    this.emitter.gravity = 150;
    this.emitter.bounce.setTo(0.5, 0.5);
    this.emitter.angularDrag = 30;
    //
    this.emitter.start(false, 8000, 400);
  },
  update () {
    game.physics.arcade.collide(this.emitter);
  },
  render () {
  }
};