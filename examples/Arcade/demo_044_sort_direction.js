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
    game.load.image('phaser', '/assets/sprites/phaser-dude.png');
    game.load.spritesheet('veggies', '/assets/sprites/fruitnveg32wh37.png', 32, 32);
  },
  create () {
    game.world.setBounds(0, 0, 2000, 1200);
    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.stage.backgroundColor = '#2d2d2d';

    this.sprite = game.add.sprite(1960, 200, 'phaser');

    game.physics.arcade.sortDirection = Phaser.Physics.Arcade.RIGHT_LEFT;

    game.physics.arcade.enable(this.sprite);
    this.sprite.body.setCircle(this.sprite.width / 2, 0, this.sprite.height / 2 / 2);

    this.group = game.add.physicsGroup(Phaser.Physics.ARCADE);

    for (let i = 0; i < 500; i++) {
      let c = this.group.create(game.rnd.integerInRange(200, 1900), game.rnd.integerInRange(0, 1100), 'veggies', game.rnd.integerInRange(0, 35));
      c.name = 'veg' + i;
      c.body.immovable = true;
    }

    for (let i = 0; i < 20; i++) {
      let c = this.group.create(game.rnd.integerInRange(100, 770), game.rnd.integerInRange(0, 570), 'veggies', 17);
      c.body.immovable = true;
    }

    game.camera.follow(this.sprite);

    this.cursors = game.input.keyboard.createCursorKeys();
  },
  update () {
    game.physics.arcade.collide(this.sprite, this.group, this.collisionHandler, null, this);

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
    game.debug.body(this.sprite);
    game.debug.bodyInfo(this.sprite, 32, 32);
  },
  collisionHandler (player, veg) {
    if (veg.frame === 17) {
      veg.kill();
    }
  }
};