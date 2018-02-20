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
    game.load.image('backdrop', '/assets/pics/remember-me.jpg');
    game.load.image('ball', '/assets/sprites/shinyball.png');
  },
  create () {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.world.setBounds(0, 0, 1920, 1200);

    game.add.sprite(0, 0, 'backdrop');

    this.ball = game.add.sprite(game.world.randomX, 200, 'ball');

    game.physics.arcade.enable(this.ball);

    game.camera.follow(this.ball);

    game.input.onDown.add(this.moveBall, this);
  },
  update () {
  },
  render () {
    game.debug.text('distance: ' + game.physics.arcade.distanceToPointer(this.ball), 32, 32);
  },
  moveBall () {
    game.camera.follow();
    game.physics.arcade.moveToPointer(this.ball, 100);
  }
};
