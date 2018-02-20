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
    game.load.image('atari', '/assets/sprites/atari130xe.png');
    game.load.spritesheet('bullets', '/assets/sprites/balls.png', 17, 17);

  },
  create () {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.stage.backgroundColor = '#2d2d2d';

    this.balls = game.add.group();

    this.balls.createMultiple(250, 'bullets', 0, false);

    this.atari = game.add.sprite(300, 450, 'atari');

    game.physics.arcade.gravity.y = 400;

    game.physics.arcade.enable(game.world, true);

    this.atari.body.allowGravity = 0;
    this.atari.body.immovable = true;

    this.cursors = game.input.keyboard.createCursorKeys();

    game.time.events.loop(150, this.fire, this);

    game.add.text(16, 16, 'Left / Right to move', { font: '18px Arial', fill: '#ffffff' });
  },
  update () {
    game.physics.arcade.collide(this.atari, this.balls, null, this.reflect, this);

    this.atari.body.velocity.x = 0;
    if (this.cursors.left.isDown) {
      this.atari.body.velocity.x = -200;
    } else if (this.cursors.right.isDown) {
      this.atari.body.velocity.x = +200;
    }

    this.balls.forEachAlive(this.checkBounds, this);
  },
  render () {
  },
  fire () {
    let ball = this.balls.getFirstExists(false);
    if (ball) {
      ball.frame = game.rnd.integerInRange(0, 6);
      ball.exists = true;
      ball.reset(game.world.randomX, 0);
      ball.body.bounce.y = 0.8;
    }
  },
  reflect (a, ball) {
    if (ball.y > (this.atari.y + 5)) {
      return true;
    } else {
      ball.body.velocity.x = this.atari.body.velocity.x;
      ball.body.velocity.y *= -(ball.body.bounce.y);
      return false;
    }
  },
  checkBounds (ball) {
    if (ball.y > 600) {
      ball.kill();
    }
  }
};
