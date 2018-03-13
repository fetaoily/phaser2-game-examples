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
      this.physics.p2.restitution = 0.9;
      //
      this.starfield = this.add.tileSprite(0, 0, 800, 600, "stars");
      this.starfield.fixedToCamera = true;
      //
      this.panda = this.add.sprite(
          this.world.randomX,
          this.world.randomY,
          "panda"
      );
      this.physics.p2.enable(this.panda, false);
      this.panda.body.setRectangle(40, 40, 0, 0);
      //
      this.sweet = this.add.sprite(
          this.world.randomX,
          this.world.randomY,
          "sweet"
      );
      this.physics.p2.enable(this.sweet, false);
      this.sweet.body.setRectangle(40, 40, 0, 0);
      //
      this.ship = this.add.sprite(200, 200, "ship");
      this.ship.scale.set(2);
      this.ship.smoothed = false;
      this.ship.animations.add("fly", [0, 1, 2, 3, 4, 5], 10, true);
      this.ship.animations.play("fly");
      // this.ship.play('fly');
      //
      this.physics.p2.enable(this.ship, false);
      //
      this.ship.body.createBodyCallback(this.panda, this.hitPanda, this);
      //
      this.physics.p2.setImpactEvents(true);
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
            this.ship.body.velocity.x * 16 * this.game.time.physicsElapsed;
      }
      if (!this.camera.atLimit.y) {
        this.starfield.tilePosition.y +=
            this.ship.body.velocity.y * 16 * this.game.time.physicsElapsed;
      }
    }

    render () {
      this.game.debug.text("Collide with the Panda!", 32, 32);
    }

    hitPanda (body1, body2) {
      body2.sprite.alpha -= 0.1;
    }
  }
})();
