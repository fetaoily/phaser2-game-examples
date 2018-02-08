let game;

window.onload = () => {
  game = new Phaser.Game(400, 400, Phaser.AUTO);
  game.state.add('PlayGame', PlayGame);
  game.state.start('PlayGame');
};

let PlayGame = function () {
};

PlayGame.prototype = {
  preload () {
    game.load.image('arrow', '/assets/sprites/arrow.png');
  },
  create () {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    sprite = this.sprite = game.add.sprite(game.world.centerX, game.world.centerY, 'arrow');
    this.sprite.anchor.set(0.5);
    game.physics.arcade.enable(this.sprite);

    this.sprite.body.collideWorldBounds = true;
  },
  update () {
    this.sprite.body.velocity.x = 0;
    this.sprite.body.velocity.y = 0;
    this.sprite.body.angularVelocity = 0;
    if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
      sprite.body.angularVelocity = -200;
    } else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
      sprite.body.angularVelocity = +200;
    }

    if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
      game.physics.arcade.velocityFromAngle(this.sprite.angle, 300, sprite.body.velocity);
    }
  },
  render () {
    game.debug.spriteInfo(this.sprite, 32, 32);
    game.debug.text('angularVelocity: ' + this.sprite.body.angularVelocity, 32, 200);
    game.debug.text('angularAcceleration: ' + this.sprite.body.angularAcceleration, 32, 232);
    game.debug.text('angularDrag: ' + this.sprite.body.angularDrag, 32, 264);
    game.debug.text('deltaZ: ' + this.sprite.body.deltaZ(), 32, 296);

  }
};
