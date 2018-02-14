let game;

window.onload = () => {
  game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO);
  game.state.add('PlayGame', PlayGame);
  game.state.start('PlayGame');
};

let PlayGame = function () {
};

PlayGame.prototype = {
  preload () {
    game.load.image('backdrop', '/assets/pics/remember-me.jpg');
    game.load.image('ball', '/assets/sprites/shinyball.png');
  },
  create () {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.world.setBounds(0, 0, 1920, 1200);

    game.add.sprite(0, 0, 'backdrop');

    this.ball = game.add.sprite(game.world.randomX, 200, 'ball');

    game.physics.arcade.enable(this.ball);
    this.ball.body.collideWorldBounds = true;

    game.camera.follow(this.ball);

    this.cursors = game.input.keyboard.createCursorKeys();

  },
  update () {
    this.ball.body.velocity.x = 0;
    this.ball.body.velocity.y = 0;
    if (this.cursors.left.isDown) {
      this.ball.body.velocity.x = -200;
    } else if (this.cursors.right.isDown) {
      this.ball.body.velocity.x = +200;
    }

    if (this.cursors.up.isDown) {
      this.ball.body.velocity.y = -200;
    } else if (this.cursors.down.isDown) {
      this.ball.body.velocity.y = +200;
    }
  },
  render () {
    game.debug.text('Distance to pointer:' + game.physics.arcade.distanceToPointer(this.ball), 32, 32);
  }
};
