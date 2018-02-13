'use strict';
let game;
let sprite;
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
    game.load.image('phaser', '/assets/sprites/phaser-dude.png');
    game.load.spritesheet('veggies', '/assets/sprites/fruitnveg32wh37.png', 32, 32);
  },
  create () {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.stage.backgroundColor = '#2d2d2d';

    this.group = game.add.group();
    for (let i = 0; i < 70; i++) {
      if (i < 50) {
        this.group.add(new Vegetable(game));
      } else {
        this.group.add(new Chilli(game));
      }
    }

    sprite = this.sprite = game.add.sprite(32, 200, 'phaser');
    game.physics.arcade.enable(this.sprite);
    this.sprite.body.collideWorldBounds = true;

    this.cursors = game.input.keyboard.createCursorKeys();
  },
  update () {
    game.physics.arcade.overlap(this.sprite, this.group, this.collisionHandler, null, this);
    this.sprite.body.velocity.x = 0;
    this.sprite.body.velocity.y = 0;
    if (this.cursors.left.isDown) {
      this.sprite.body.velocity.x = -200;
    } else if (this.cursors.right.isDown) {
      this.sprite.body.velocity.x = +200;
    }

    if (this.cursors.up.isDown) {
      this.sprite.body.velocity.y = -200;
    } else if (this.cursors.down.isDown) {
      this.sprite.body.velocity.y = +200;
    }
  },
  render () {
    game.debug.spriteInfo(this.sprite, 32, 32);
  },
  collisionHandler (player, chilli) {
    chilli.kill();
  }
};

let Vegetable = function (game) {
  let frame = game.rnd.between(0, 25);
  if (frame === 17) {
    frame = 1;
  }
  let x = game.rnd.between(100, 770);
  let y = game.rnd.between(0, 570);
  Phaser.Image.call(this, game, x, y, 'veggies', frame);
};
Vegetable.prototype = Object.create(Phaser.Image.prototype);
Vegetable.prototype.constructor = Vegetable;

let Chilli = function (game) {
  let x = game.rnd.between(100, 770);
  let y = game.rnd.between(0, 570);
  Phaser.Sprite.call(this, game, x, y, 'veggies', 17);
  game.physics.arcade.enable(this);
};
Chilli.prototype = Object.create(Phaser.Sprite.prototype);
Chilli.prototype.constructor = Chilli;
