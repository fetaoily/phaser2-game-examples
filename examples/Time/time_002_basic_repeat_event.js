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
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    //
    game.load.image('ball', '/assets/sprites/pangball.png');
  },
  create () {
    game.stage.backgroundColor = '#6688ee';
    //
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.gravity.y = 150;
    //
    game.time.events.repeat(Phaser.Timer.SECOND * 2, 10, this.createBall, this);
    this.createBall();
  },
  update () {
  },
  render () {
    game.debug.text('Time until event: ' + game.time.events.duration.toFixed(0), 32, 32);
    game.debug.text('Next tick: ' + game.time.events.next.toFixed(0), 32, 32 * 2)
  },
  createBall () {
    this.ball = game.add.sprite(game.world.randomX, 0, 'ball');
    game.physics.enable(this.ball, Phaser.Physics.ARCADE);
    this.ball.body.bounce.y = 0.9;
    this.ball.body.collideWorldBounds = true;
  }
};