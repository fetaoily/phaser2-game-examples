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
      this.load.spritesheet(
          "veggies",
          "/assets/sprites/fruitnveg32wh37.png",
          32,
          32
      );
    }

    create () {
      this.world.setBounds(0, 0, 1600, 1200);
      //
      this.physics.startSystem(Phaser.Physics.P2JS);
      this.physics.p2.restitution = 0.9;
      //
      this.starfield = this.add.tileSprite(0, 0, 800, 600, "stars");
      this.starfield.fixedToCamera = true;
      //
      this.veggies = this.add.group();
      this.veggies.enableBody = true;
      this.veggies.physicsBodyType = Phaser.Physics.P2JS;
      //
      let vegFrames = [1, 3, 4, 8];
      //
      for (let i = 0; i < 25; i++) {
        let veg = this.veggies.create(
            this.world.randomX,
            this.world.randomY,
            "veggies",
            this.game.rnd.pick(vegFrames)
        );
        veg.body.setCircle(26);
      }
      //
      this.ship = this.add.sprite(200, 200, "ship");
      this.ship.name = "ship";
      this.ship.scale.set(2);
      this.ship.smoothed = false;
      this.ship.animations.add("fly", [0, 1, 2, 3, 4, 5], 10, true);
      this.ship.play();
      //
      this.physics.p2.enable(this.ship, false);
      this.ship.body.setCircle(28);
      this.ship.body.fixedRotation = true;
      //
      this.camera.follow(this.ship);
      this.physics.p2.setPostBroadphaseCallback(this.checkVeg, this);
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
        this.starfield.tilePosition.x -=
            this.ship.body.velocity.x * this.game.time.physicsElapsed;
      }
      //
      if (!this.camera.atLimit.y) {
        this.starfield.tilePosition.y +=
            this.ship.body.velocity.y * this.game.time.physicsElapsed;
      }
    }

    render () {
      this.game.debug.text("World bodies:" + this.physics.p2.total, 32, 32);
    }

    checkVeg (body1, body2) {
      if (
          (body1.sprite.name === "ship" && body2.sprite.frame === 4) ||
          (body2.sprite.name === "ship" && body1.sprite.frame === 4)
      ) {
        return false;
      }
      return true;
    }
  }
})();
