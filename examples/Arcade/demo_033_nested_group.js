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
    game.load.spritesheet('spinner', '/assets/sprites/bluemetal_32x32x4.png', 32, 32);
    game.load.image('phaser', '/assets/sprites/phaser.png');
  },
  create () {
    this.sprites = game.add.group();
    for (let i = 0; i < 30; i++) {
      let s = this.sprites.create(game.rnd.integerInRange(100, 700), game.rnd.integerInRange(32, 200), 'spinner');
      s.animations.add('spin', [0, 1, 2, 3]);
      s.play('spin', 20, true);

      game.physics.enable(s, Phaser.Physics.ARCADE);
      s.body.velocity.x = game.rnd.integerInRange(-200, 200);
      s.body.velocity.y = game.rnd.integerInRange(-200, 200);
    }

    let groupB = game.make.group();
    groupB.create(16, 16, 'phaser');

    this.sprites.add(groupB);

    this.sprites.setAll('body.collideWorldBounds', true);
    this.sprites.setAll('body.bounce.x', 1);
    this.sprites.setAll('body.bounce.y', 1);
    this.sprites.setAll('body.minBounceVelocity', 0);
  },
  update () {
    game.physics.arcade.collide(this.sprites);
  },
  render () {
  }
};
