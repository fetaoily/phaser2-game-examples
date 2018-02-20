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
    //
    this.sprite1 = game.add.sprite(0, 200, 'atari');
    this.sprite2 = game.add.sprite(750, 220, 'mushroom');

    game.physics.enable([this.sprite1, this.sprite2], Phaser.Physics.ARCADE);

    this.sprite1.body.velocity.x = 50 + Math.random() * 100;
    this.sprite2.body.velocity.x = -(50 + Math.random() * 100);

  },
  update () {
    game.physics.arcade.collide(this.sprite1, this.sprite2, this.collisionCallback, this.processCallback, this);
  },
  render () {
    game.debug.text('The processCallback will only collide if sprite1 is going fastest.', 32, 32);
    game.debug.text('Sprite 1 speed: ' + this.sprite1.body.speed, 32, 32 * 2);
    game.debug.text('Sprite 2 speed: ' + this.sprite2.body.speed, 32, 32 * 3);
  },
  processCallback (obj1, obj2) {
    if (obj1.body.speed > obj2.body.speed) {
      return true;
    } else {
      return false;
    }
  },
  collisionCallback () {
    game.stage.backgroundColor = '#992d2d';
  }
};
