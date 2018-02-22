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
    game.physics.startSystem(Phaser.Physics, Phaser.Physics.ARCADE);

    game.stage.backgroundColor = '#2d2d2d';

    this.sprite = game.add.sprite(32, 200, 'phaser');

    game.physics.arcade.enable(this.sprite);

    this.group = game.add.physicsGroup();

    for (let i = 0; i < 50; i++) {
      let c = this.group.create(game.rnd.between(100, 770), game.rnd.between(0, 570), 'veggies', game.rnd.between(0, 35));
      c.body.mass = -100;
    }

    for (let i = 0; i < 20; i++) {
      let c = this.group.create(game.rnd.between(100, 770), game.rnd.between(0, 570), 'veggies', 17);
    }

    this.cursors = game.input.keyboard.createCursorKeys();
  },
  update () {
    if (game.physics.arcade.collide(this.sprite, this.group, this.collisionHandler, this.processHandler, this)) {
      console.log('boom');
    }

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
  },
  processHandler () {
    return true;
  },
  collisionHandler (player, veg) {
    if (veg.frame === 17) {
      veg.kill();
    }
  }
};