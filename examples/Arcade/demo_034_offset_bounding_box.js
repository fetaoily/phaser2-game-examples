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
    game.load.image('mushroom', '/assets/sprites/mushroom2.png');
  },
  create () {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.stage.backgroundColor = '#2d2d2d';

    this.sprite1 = game.add.sprite(150, 200, 'atari');
    this.sprite1.name = 'atari';

    this.sprite2 = game.add.sprite(700, 220, 'mushroom');
    this.sprite2.name = 'mushroom';

    game.physics.enable([this.sprite1, this.sprite2], Phaser.Physics.ARCADE);

    this.sprite1.body.setSize(100, 50, 50, 25);
    this.sprite1.body.immovable = true;

    this.sprite2.body.velocity.x = -100;
  },
  update () {
    game.physics.arcade.collide(this.sprite1, this.sprite2, this.collisionHandler, null, this);
  },
  render () {
    game.debug.bodyInfo(this.sprite1, 32, 32);
    game.debug.body(this.sprite1);
    game.debug.body(this.sprite2);
  },
  collisionHandler () {
      game.stage.backgroundColor = '#ff0000';
  }
};
