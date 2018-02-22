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
    game.load.image('starfield', '/assets/misc/starfield.jpg');
    game.load.image('ball', '/assets/sprites/pangball.png');
  },
  create () {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.physics.arcade.gravity.y = 200;

    this.ball = game.add.sprite(400, 0, 'ball');
    this.tileSprite = game.add.tileSprite(300, 450, 200, 100, 'starfield');

    game.physics.enable([this.ball, this.tileSprite], Phaser.Physics.ARCADE);

    this.ball.body.collideWorldBounds = true;
    this.ball.body.bounce.set(1);
    //
    this.tileSprite.body.collideWorldBounds = true;
    this.tileSprite.body.immovable = true;
    this.tileSprite.body.allowGravity = false;
    //
    this.cursors = game.input.keyboard.createCursorKeys();

  },
  update () {
    game.physics.arcade.collide(this.ball, this.tileSprite);
    if (this.cursors.left.isDown) {
      this.tileSprite.body.x -= 8;
      this.tileSprite.tilePosition.x -= 8;
    } else if (this.cursors.right.isDown) {
      this.tileSprite.body.x += 8;
      this.tileSprite.tilePosition.x += 8;
    }
    //
    if (this.cursors.up.isDown) {
      this.tileSprite.tilePosition.y += 8;
    } else if (this.cursors.down.isDown) {
      this.tileSprite.tilePosition.y -= 8;
    }
  },
  render () {
  }
};
