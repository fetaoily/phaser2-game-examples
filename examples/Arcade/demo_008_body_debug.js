let game;

window.onload = () => {
  game = new Phaser.Game(400, 400, Phaser.AUTO);
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
    game.load.image('atari', '/assets/sprites/atari130xe.png');
  },
  create () {
    game.stage.backgroundColor = '#2d2d2d';
    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.physics.arcade.gravity.y = 100;

    this.sprite = game.add.sprite(150, 100, 'atari');
    game.physics.arcade.enable(this.sprite);

    this.sprite.body.velocity.set(-100, -100);
    this.sprite.body.bounce.set(1);
    this.sprite.body.collideWorldBounds = true;

    game.input.onDown.add(this.toggle, this);
  },
  update () {
  },
  render () {
    if (this.showDebug) {
      game.debug.bodyInfo(this.sprite, 32, 32);
      game.debug.body(this.sprite);
    }
  },
  toggle () {
    this.showDebug = !this.showDebug;
    if (!this.showDebug) {
      game.debug.reset();
    }
  }
};