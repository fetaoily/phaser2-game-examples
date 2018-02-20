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
    game.load.spritesheet('gameboy', '/assets/sprites/gameboy_seize_color_40x60.png', 40, 60);
    game.load.image('atari', '/assets/sprites/atari130xe.png');
  },
  create () {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.stage.backgroundColor = '#124184';

    this.sprite = game.add.sprite(300, 200, 'atari');
    this.sprite.name = 'atari';

    game.physics.enable(this.sprite, Phaser.Physics.ARCADE);

    this.sprite.body.collideWorldBounds = true;
    this.sprite.body.checkCollision.up = false;
    this.sprite.body.checkCollision.down = false;
    this.sprite.body.immovable = true;
    //
    this.sprite2 = game.add.sprite(350, 400, 'gameboy', 2);
    this.sprite2.name = 'gameboy';

    game.physics.enable(this.sprite2, Phaser.Physics.ARCADE);
    this.sprite2.body.collideWorldBounds = true;
    this.sprite2.body.bounce.setTo(1, 1);

    //
    this.sprite3 = game.add.sprite(0, 210, 'gameboy', 4);
    game.physics.enable(this.sprite3, Phaser.Physics.ARCADE);
    this.sprite3.name = 'gameboy2';

    this.sprite3.body.collideWorldBounds = true;
    this.sprite3.body.bounce.setTo(1, 1);

    this.sprite2.body.velocity.y = -200;
    this.sprite3.body.velocity.x = 200;
  },
  update () {
    game.physics.arcade.collide(this.sprite, this.sprite2);
    game.physics.arcade.collide(this.sprite, this.sprite3);
  },
  render () {
    game.debug.bodyInfo(this.sprite, 16, 24);

  }
};
