let game;
let fireRate = 100;
let nextFire = 0;
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
    game.load.image('arrow', '/assets/sprites/arrow.png');
    game.load.image('bullet', '/assets/sprites/purple_ball.png');
  },
  create () {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.stage.backgroundColor = '#313131';

    this.bullets = game.add.group();
    this.bullets.enableBody = true;
    this.bullets.physicsBodyType = Phaser.Physics.ARCADE;

    this.bullets.createMultiple(50, 'bullet');
    this.bullets.setAll('checkWorldBounds', true);
    this.bullets.setAll('outOfBoundsKill', true);

    this.sprite = game.add.sprite(400, 300, 'arrow');
    this.sprite.anchor.set(0.5);

    game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
    this.sprite.body.allowRotation = false;
  },
  update () {
    this.sprite.rotation = game.physics.arcade.angleToPointer(this.sprite);
    if (game.input.activePointer.isDown) {
      this.fire();
    }
  },
  render () {
    game.debug.text('Active Bullets: ' + this.bullets.countLiving() + '/' + this.bullets.total, 32, 32);
    game.debug.spriteInfo(this.sprite, 32, 32 * 2);
  },
  fire () {
    if (game.time.now > nextFire && this.bullets.countDead() > 0) {
      nextFire = game.time.now + fireRate;
      let bullet = this.bullets.getFirstDead();
      bullet.reset(this.sprite.x - 8, this.sprite.y - 8);
      game.physics.arcade.moveToPointer(bullet, 300);
    }
  }
};