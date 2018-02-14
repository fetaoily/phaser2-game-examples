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
    game.load.image('ilkke', '/assets/sprites/atari800xl.png');
  },
  create () {
    game.stage.backgroundColor = '#2d2d2d';

    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.physics.arcade.gravity.y = 200;

    this.sprite = game.add.sprite(100, 96, 'ilkke');
    this.sprite.anchor.set(0.5);

    game.physics.arcade.enable(this.sprite);

    this.sprite.body.collideWorldBounds = true;
    this.sprite.body.velocity.x = 200;
    this.sprite.body.angularVelocity = 10;
    this.sprite.body.bounce.set(0.9);

    this.sprite.inputEnabled = true;
    this.sprite.input.enableDrag();

    this.sprite.events.onDragStart.add(this.startDrag, this);
    this.sprite.events.onDragStop.add(this.stopDrag, this);

  },
  update () {
  },
  render () {
    game.debug.spriteInfo(this.sprite, 32, 32);
    game.debug.body(this.sprite);
  },
  startDrag () {
    this.sprite.body.moves = false;
  },
  stopDrag () {
    this.sprite.body.moves = true;
  }
};
