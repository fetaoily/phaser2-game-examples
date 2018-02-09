let game;
let sprite;
let sprite2;

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
    //
    game.load.spritesheet('gameboy', '/assets/sprites/gameboy_seize_color_40x60.png', 40, 60);
  },
  create () {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.stage.backgroundColor = '#124184';
    sprite = this.sprite = game.add.sprite(200, 0, 'gameboy', 2);
    sprite2 = this.sprite2 = game.add.sprite(200, 200, 'gameboy', 3);

    this.sprite.animations.add('play');
    this.sprite.animations.play('play', 2, true);

    this.sprite2.animations.add('play', [0, 1, 2, 3, 4], 60);
    this.sprite2.animations.play('play', 24, true);

    game.physics.arcade.enable([this.sprite, this.sprite2]);

    game.physics.arcade.gravity.y = 200;

    this.sprite.body.bounce.y = 0.95;
    this.sprite.body.collideWorldBounds = true;

    this.sprite2.body.allowGravity = false;
    this.sprite2.body.immovable = true;

    game.input.onDown.add(this.toggleBody, this);
  },
  update () {
    game.physics.arcade.collide(this.sprite, this.sprite2);
  },
  render () {
    game.debug.text('Click to disable body1', 32, 32);
    if (this.sprite2.body.enable) {
      game.debug.body(this.sprite2);
    }
  },
  toggleBody () {
    this.sprite2.body.enable = !this.sprite2.body.enable;
  }
};