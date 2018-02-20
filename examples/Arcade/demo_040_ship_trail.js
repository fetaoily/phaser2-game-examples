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
    game.load.image('chuck', '/assets/sprites/chunk.png');
    game.load.image('arrow', '/assets/sprites/asteroids_ship.png');
  },
  create () {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //
    game.stage.backgroundColor = '#124184';

    //
    this.bmd = game.add.bitmapData(800, 600);
    this.bmd.context.fillStyle = '#FFFFFF';

    //
    this.bg = game.add.sprite(0, 0, this.bmd);

    game.physics.arcade.gravity.y = 100;

    this.sprite = game.add.sprite(32, 450, 'arrow');
    this.sprite.anchor.set(0.5);

    game.physics.enable(this.sprite, Phaser.Physics.ARCADE);

    this.sprite.body.collideWorldBounds = true;
    this.sprite.body.bounce.set(0.8);

    game.input.onDown.add(this.launch, this);
  },
  update () {
    this.sprite.rotation = this.sprite.body.angle;
    this.bmd.context.fillRect(this.sprite.x, this.sprite.y, 2, 2);
    this.bmd.dirty = true;
  },
  render () {
    game.debug.bodyInfo(this.sprite, 32, 32);
  },
  launch () {
    if (game.input.x < this.sprite.x) {
      this.sprite.body.velocity.setTo(-200, -200);
    } else {
      this.sprite.body.velocity.setTo(200, -200);
    }
  }
};
