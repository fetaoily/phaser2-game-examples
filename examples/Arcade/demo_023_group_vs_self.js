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
    game.load.spritesheet('spinner', '/assets/sprites/bluemetal_32x32x4.png', 32, 32);
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
  },
  create () {
    this.sprites = game.add.physicsGroup(Phaser.Physics.ARCADE);
    for (let i = 0; i < 100; i++) {
      let s = this.sprites.create(game.rnd.integerInRange(100, 700), game.rnd.integerInRange(32, 200), 'spinner');
      s.animations.add('spin', [0, 1, 2, 3]);
      s.play('spin', 20, true);
      s.body.velocity.set(game.rnd.integerInRange(-200, 200), game.rnd.integerInRange(-200, 200));
    }
    this.sprites.setAll('body.collideWorldBounds', true);
    this.sprites.setAll('body.bounce.x', 1);
    this.sprites.setAll('body.bounce.y', 1);
  },
  update () {
    game.physics.arcade.collide(this.sprites);
  },
  render () {
  }
};
