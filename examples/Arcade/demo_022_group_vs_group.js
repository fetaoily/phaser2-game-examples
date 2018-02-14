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
    game.load.image('space', '/assets/skies/deep-space.jpg');
    game.load.image('phaser', '/assets/sprites/phaser-dude.png');
    game.load.image('bullet', '/assets/misc/bullet0.png');
    game.load.spritesheet('veggies', '/assets/sprites/fruitnveg32wh37.png', 32, 32);
  },
  create () {
    game.stage.backgroundColor = '#2d2d2d';

    this.bulletTime = 0;

    this.space = game.add.tileSprite(0, 0, 800, 600, 'space');
    this.space.autoScroll(0, 10);

    this.veggies = game.add.group();
    this.veggies.enableBody = true;
    this.veggies.physicsBodyType = Phaser.Physics.ARCADE;

    for (let i = 0; i < 50; i++) {
      let c = this.veggies.create(game.world.randomX, Math.random() * 500, 'veggies', game.rnd.integerInRange(0, 36));
      let d = this.veggies.create(game.world.randomX, Math.random() * 500, 'veggies', game.rnd.integerInRange(0, 36));
      c.name = 'veg' + i;
      c.body.immovable = true;
    }

    this.bullets = game.add.group();
    this.bullets.enableBody = true;
    this.bullets.physicsBodyType = Phaser.Physics.ARCADE;

    for (let i = 0; i < 20; i++) {
      let b = this.bullets.create(0, 0, 'bullet');
      b.name = 'bullet' + i;
      b.exists = false;
      b.visible = false;
      b.checkWorldBounds = true;
      b.events.onOutOfBounds.add(this.resetBullet, this);
    }

    this.sprite = game.add.sprite(400, 550, 'phaser');

    game.physics.arcade.enable(this.sprite);
    this.sprite.body.collideWorldBounds = true;

    this.sprite.inputEnabled = true;
    this.sprite.input.enableDrag();

    this.cursors = game.input.keyboard.createCursorKeys();

    game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);

  },
  update () {
    game.physics.arcade.overlap(this.bullets, this.veggies, this.collisionHandler, null, this);

    this.sprite.body.velocity.x = 0;
    this.sprite.body.velocity.y = 0;

    if (this.cursors.left.isDown) {
      this.sprite.body.velocity.x = -300;
    } else if (this.cursors.right.isDown) {
      this.sprite.body.velocity.x = +300;
    }

    if (this.cursors.up.isDown) {
      this.sprite.body.velocity.y = -300;
    } else if (this.cursors.down.isDown) {
      this.sprite.body.velocity.y = +300;
    }

    if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
      this.fireBullet();
    }
  },
  render () {
  },
  fireBullet () {
    if (game.time.now > this.bulletTime || 0) {
      this.bullet = this.bullets.getFirstExists(false);
      if (this.bullet) {
        this.bullet.reset(this.sprite.x + 6, this.sprite.y - 8);
        this.bullet.body.velocity.y = -300;
        this.bulletTime = game.time.now + 150;
      }
    }
  },
  resetBullet (bullet) {
    bullet.kill();
  },
  collisionHandler (bullet, veg) {
    bullet.kill();
    veg.kill();
  }
};
