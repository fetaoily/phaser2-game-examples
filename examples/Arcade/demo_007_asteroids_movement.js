'use strict';
let game;
let space;

window.onload = () => {
  game = new Phaser.Game(640, 480, Phaser.AUTO);
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
    game.load.image('space', '/assets/skies/deep-space.jpg');
    game.load.image('bullet', '/assets/asteroids/bullets.png');
    game.load.image('ship', '/assets/asteroids/ship.png');
    //
    this.bulletTime = 0;
  },
  create () {
    game.renderer.clearBeforeRender = false;
    game.renderer.roundPixels = true;

    game.physics.startSystem(Phaser.Physics.ARCADE);

    space = this.space = game.add.tileSprite(0, 0, game.width, game.height, 'space');

    this.space.autoScroll(0, 10)

    this.bullets = game.add.group();
    this.bullets.enableBody = true;
    this.bullets.physicsBodyType = Phaser.Physics.ARCADE;

    this.bullets.createMultiple(40, 'bullet');
    this.bullets.setAll('anchor.x', 0.5);
    this.bullets.setAll('anchor.y', 0.5);

    this.sprite = game.add.sprite(200, 200, 'ship');
    this.sprite.anchor.set(0.5);

    game.physics.enable(this.sprite, Phaser.Physics.ARCADE);

    this.sprite.body.drag.set(100);
    this.sprite.body.maxVelocity.set(200);

    this.cursors = game.input.keyboard.createCursorKeys();
    game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);
  },
  update () {
    if (this.cursors.up.isDown) {
      game.physics.arcade.accelerationFromRotation(this.sprite.rotation, 200, this.sprite.body.acceleration);
    } else {
      this.sprite.body.acceleration.set(0);
    }

    if (this.cursors.left.isDown) {
      this.sprite.body.angularVelocity = -300;
    } else if (this.cursors.right.isDown) {
      this.sprite.body.angularVelocity = +300;
    } else {
      this.sprite.body.angularVelocity = 0;
    }

    if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
      this.fireBullet();
    }
    this.screenWrap(this.sprite);
    this.bullets.forEachExists(this.screenWrap, this);
  },
  render () {
  },
  fireBullet () {
    if (game.time.now > this.bulletTime) {
      this.bullet = this.bullets.getFirstExists(false);
      if (this.bullet) {
        this.bullet.reset(this.sprite.body.x + 16, this.sprite.body.y + 16);
        this.bullet.lifespan = 2000;
        this.bullet.rotation = this.sprite.rotation;
        game.physics.arcade.velocityFromRotation(this.bullet.rotation, 400, this.bullet.body.velocity);
        this.bulletTime = game.time.now + 50;
      }
    }
  },
  screenWrap (sprite) {
    if (sprite.x < 0) {
      sprite.x = game.width;
    } else if (sprite.x > game.width) {
      sprite.x = 0;
    }

    if (sprite.y < 0) {
      sprite.y = game.height;
    } else if (sprite.y > game.height) {
      sprite.y = 0;
    }
  }
};