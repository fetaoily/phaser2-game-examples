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
    game.load.image('ship', '/assets/sprites/xenon2_ship.png');
    game.load.image('baddie', '/assets/sprites/space-baddie.png');
  },
  create () {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.physics.arcade.skipQuadTree = false;
    //
    this.aliens = game.add.group();
    this.aliens.enableBody = true;
    //
    for (let i = 0; i < 50; i++) {
      let s = this.aliens.create(game.world.randomX, game.world.randomY, 'baddie');
      s.body.collideWorldBounds = true;
      s.body.bounce.set(1);
      s.body.velocity.setTo(10 + Math.random() * 40, 10 + Math.random() * 400);
    }
    //
    this.ship = game.add.sprite(400, 400, 'ship');
    game.physics.enable(this.ship, Phaser.Physics.ARCADE);
    this.ship.body.collideWorldBounds = true;
    this.ship.body.bounce.set(1);

    this.cursors = game.input.keyboard.createCursorKeys();
  },
  update () {
    game.physics.arcade.collide(this.ship, this.aliens);
    game.physics.arcade.collide(this.aliens);
    //
    if (this.cursors.left.isDown) {
      this.ship.body.velocity.x -= 4;
    } else if (this.cursors.right.isDown) {
      this.ship.body.velocity.x += 4;
    }
    if (this.cursors.up.isDown) {
      this.ship.body.velocity.y -= 4;
    } else if (this.cursors.down.isDown) {
      this.ship.body.velocity.y += 4;
    }
  },
  render () {
    game.debug.quadTree(game.physics.arcade.quadTree);
  }
};
