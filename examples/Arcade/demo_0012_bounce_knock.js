let game;

window.onload = () => {
  game = new Phaser.Game(600, 400, Phaser.ARCADE);
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
    game.load.image('dude', '/assets/sprites/phaser-dude.png');
    game.load.image('ball', '/assets/sprites/pangball.png');
  },
  create () {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    this.cursors = game.input.keyboard.createCursorKeys();

    this.ball = game.add.sprite(400, 200, 'ball');
    this.knocker = game.add.sprite(400, 200, 'dude');

    game.physics.enable([this.ball, this.knocker], Phaser.Physics.ARCADE);

    this.knocker.body.immovable = true;
    this.knocker.body.collideWorldBounds = true;

    this.ball.body.velocity.setTo(200, 200);
    this.ball.body.collideWorldBounds = true;

    this.ball.body.bounce.setTo(1, 1);
  },
  update () {
    game.physics.arcade.collide(this.knocker, this.ball);

    if (this.cursors.up.isDown) {
      this.knocker.body.velocity.y = -300;
    } else if (this.cursors.down.isDown) {
      this.knocker.body.velocity.y = +300;
    } else if (this.cursors.left.isDown) {
      this.knocker.body.velocity.x = -300;
    } else if (this.cursors.right.isDown) {
      this.knocker.body.velocity.x = +300;
    } else {
      this.knocker.body.velocity.setTo(0, 0);
    }
  },
  render () {
    game.debug.body(this.ball);
    game.debug.body(this.knocker);
    game.debug.spriteInfo(this.ball, 32, 32);
  }
};