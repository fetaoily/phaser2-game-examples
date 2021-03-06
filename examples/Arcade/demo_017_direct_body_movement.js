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

    this.sprite1 = game.add.sprite(300, 50, 'atari');
    this.sprite2 = game.add.sprite(400, 450, 'mushroom');
    this.sprite2.anchor.set(0.5);

    game.physics.arcade.enable([this.sprite1, this.sprite2]);

    game.add.tween(this.sprite1.body).to({ y: 400 }, 3000, Phaser.Easing.Linear.None, true);
    game.add.tween(this.sprite2.body).to({ rotation: 180, y: 200 }, 3000, Phaser.Easing.Linear.None, true, 0, -1, true);

  },
  update () {
    game.physics.arcade.overlap(this.sprite1, this.sprite2, this.overlapHandler, null, this);
  },
  render () {
    game.debug.body(this.sprite1);
    game.debug.body(this.sprite2);
    game.debug.spriteInfo(this.sprite1, 32, 32);
    game.debug.spriteInfo(this.sprite2, 32, 32 * 4);
  },
  overlapHandler (obj1, obj2) {
    game.stage.backgroundColor = '#992d2d';
  }
};
