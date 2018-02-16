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
    game.load.image('atari', '/assets/sprites/atari130xe.png');
    game.load.image('mushroom', '/assets/sprites/mushroom2.png');
  },
  create () {
    game.stage.backgroundColor = '#2d2d2d';

    this.sprite1 = game.add.sprite(130, 200, 'atari');
    this.sprite1.name = 'atari';

    game.physics.arcade.enable(this.sprite1);
    this.sprite1.body.setSize(400, 50, -100, 20);
    this.sprite1.body.immovable = true;

    this.sprite2 = game.add.sprite(700, 269, 'mushroom');
    this.sprite2.name = 'mushroom';
    game.physics.arcade.enable(this.sprite2);
    this.sprite2.body.velocity.x = -100;
    this.sprite2.body.setCircle(this.sprite2.width/2);
  },
  update () {
    game.physics.arcade.collide(this.sprite1, this.sprite2, this.collisionHandler, null, this);
  },
  render () {
    game.debug.bodyInfo(this.sprite2, 32, 32);

    game.debug.body(this.sprite1);
    game.debug.body(this.sprite2);
  },
  collisionHandler (obj1, obj2) {
    game.stage.backgroundColor = '#992d2d';
  }
};
