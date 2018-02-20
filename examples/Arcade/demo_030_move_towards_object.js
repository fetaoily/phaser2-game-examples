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
    game.load.image('ball', '/assets/sprites/shinyball.png');
  },
  create () {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    this.balls = game.add.group();
    this.balls.enableBody = true;

    for (let i = 0; i < 100; i++) {
      let ball = this.balls.create(game.world.randomX, game.world.randomY, 'ball');
      ball.body.bounce.set(0.5);
      ball.body.collideWorldBounds = true;
      ball.body.setCircle(ball.height / 2);
    }
  },
  update () {
    game.physics.arcade.collide(this.balls, this.balls);
    if (game.input.mousePointer.isDown) {
      // this.balls.forEach(game.physics.arcade.moveToPointer, game.physics.arcade, false, 200);
      this.balls.forEach((ball) => {
        let distance = game.physics.arcade.distanceToPointer(ball);
        game.physics.arcade.moveToPointer(ball, distance);
      }, game.physics.arcade, false);
    } else {
      // this.balls.setAll('body.velocity.x', 0);
      // this.balls.setAll('body.velocity.y', 0);
    }
  },
  render () {
    this.balls.forEach((ball) => {
      game.debug.body(ball);
    });
  }
};
