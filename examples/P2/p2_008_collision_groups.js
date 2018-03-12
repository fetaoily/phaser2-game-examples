(() => {
  let game;

  window.onload = () => {
    game = new NewGame();
  };

  class NewGame extends Phaser.Game {
    constructor () {
      super(800, 600, Phaser.AUTO);
      this.state.add("PlayGame", PlayGame);
      this.state.start("PlayGame");
    }
  }

  class PlayGame extends Phaser.State {
    constructor () {
      super();
      this.ship = null;
      this.starfield = null;
      this.cursors = null;
    }

    preload () {
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.scale.pageAlignHorizontally = true;
      this.scale.pageAlignVertically = true;
      //
      this.load.image("stars", "/assets/misc/starfield.jpg");
      this.load.spritesheet("ship", "/assets/sprites/humstar.png", 32, 32);
      this.load.image("panda", "/assets/sprites/spinObj_01.png");
      this.load.image("sweet", "/assets/sprites/spinObj_06.png");
    }

    create () {
      this.physics.startSystem(Phaser.Physics.P2JS);
      //
      this.physics.p2.setImpactEvents(true);
      this.physics.p2.restitution = 0.8;
      //
      let playerCollisionGroup = this.physics.p2.createCollisionGroup();
      let pandaCollisionGroup = this.physics.p2.createCollisionGroup();
      //
      this.physics.p2.updateBoundsCollisionGroup();
      //
      this.starfield = this.add.tileSprite(0, 0, 800, 600, "stars");
      this.starfield.fixedToCamera = true;
      //
      let pandas = this.add.group();
      pandas.enableBody = true;
      pandas.physicsBodyType = Phaser.Physics.P2JS;
      //
      for (let i = 0; i < 4; i++) {
        let panda = pandas.create(
            this.world.randomX,
            this.world.randomY,
            "panda"
        );
        panda.body.setRectangle(40, 40);
        panda.body.setCollisionGroup(pandaCollisionGroup);
        panda.body.collides([pandaCollisionGroup, playerCollisionGroup]);
      }
      //
      this.ship = this.add.sprite(200, 200, "ship");
      this.ship.scale.set(2);
      this.ship.smoothed = false;
      this.ship.animations.add("fly", [0, 1, 2, 3, 4, 5], 10, true);
      this.ship.play("fly");
      //
      this.physics.p2.enable(this.ship, false);
      this.ship.body.setCircle(28);
      this.ship.body.fixedRotation = true;
      //
      this.ship.body.setCollisionGroup(playerCollisionGroup);
      this.ship.body.collides(pandaCollisionGroup, this.hitPanda, this);
      //
      this.camera.follow(this.ship);
      //
      this.cursors = this.input.keyboard.createCursorKeys();
    }

    update () {
      this.ship.body.setZeroVelocity();
      if (this.cursors.left.isDown) {
        this.ship.body.moveLeft(200);
      } else if (this.cursors.right.isDown) {
        this.ship.body.moveRight(200);
      }
      //
      if (this.cursors.up.isDown) {
        this.ship.body.moveUp(200);
      } else if (this.cursors.down.isDown) {
        this.ship.body.moveDown(200);
      }
      //
      if (!this.camera.atLimit.x) {
        this.starfield.tilePosition.x +=
            this.ship.body.velocity.x * 16 * this.time.physicsElapsed;
      }
      if (!this.camera.atLimit.y) {
        this.starfield.tilePosition.y +=
            this.ship.body.velocity.y * 16 * this.time.physicsElapsed;
      }
    }

    render () {
      this.game.debug.text("Collide width the Pandas!", 32, 32);
    }

    hitPanda (body1, body2) {
      body2.sprite.alpha -= 0.1;
    }
  }
})();
