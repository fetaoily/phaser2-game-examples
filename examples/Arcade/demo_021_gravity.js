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
    game.load.image('ilkke', '/assets/sprites/ilkke.png');
  },
  create () {
    game.stage.backgroundColor = '#2d2d2d';

    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.physics.arcade.gravity.y = 100;

    this.sprite1 = game.add.sprite(100, 96, 'ilkke');
    this.sprite2 = game.add.sprite(300, 96, 'ilkke');
    this.sprite3 = game.add.sprite(500, 96, 'ilkke');
    this.sprite4 = game.add.sprite(700, 96, 'ilkke');

    game.physics.arcade.enable([this.sprite1, this.sprite2, this.sprite3, this.sprite4]);

    this.sprite1.body.collideWorldBounds = true;
    this.sprite2.body.collideWorldBounds = true;
    this.sprite3.body.collideWorldBounds = true;
    this.sprite4.body.collideWorldBounds = true;
    //
    this.sprite1.body.bounce.y = 0.8;
    this.sprite2.body.bounce.y = 0.8;
    this.sprite3.body.bounce.y = 0.8;
    this.sprite4.body.bounce.y = 0.8;
    //
    this.sprite2.body.gravity.y = 200;
    this.sprite3.body.gravity.y = 50;
    this.sprite4.body.allowGravity = false;

  },
  update () {
  },
  render () {
    game.debug.text('world gravity', this.sprite1.x - 32, 64);
    game.debug.text('local gravity', this.sprite2.x - 32, 64);
    game.debug.text('local /2', this.sprite3.x - 32, 64);
    game.debug.text('no gravity', this.sprite4.x - 32, 64);
  }
};
