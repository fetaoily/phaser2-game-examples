(() => {
  let game;

  window.onload = () => {
    game = new NewGame();
  };

  class NewGame extends Phaser.Game {
    constructor() {
      super(800, 600, Phaser.AUTO);
      this.state.add("PlayGame", PlayGame);
      this.state.start("PlayGame");
    }
  }

  class PlayGame extends Phaser.State {
    constructor() {
      super();
      this.ship = null;
      this.starfield = null;
      this.cursors = null;
    }

    preload() {
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.scale.pageAlignHorizontally = true;
      this.scale.pageAlignVertically = true;
      //
      this.load.image("stars", "/assets/misc/starfield.jpg");
      this.load.image("ship", "/assets/sprites/thrust_ship2.png");
    }

    create() {
      this.world.setBounds(0, 0, 1920, 1200);
      //
      this.physics.startSystem(Phaser.Physics.P2JS);
      this.physics.p2.defaultRestitution = 0.8;
      //
      this.starfield = this.add.tileSprite(0, 0, 800, 600, "stars");
      this.starfield.fixedToCamera = true;
      //
      this.ship = this.add.sprite(200, 200, "ship");
      //
      this.physics.p2.enable(this.ship);
      //
      this.camera.follow(this.ship);
      //
      this.cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
      if (this.cursors.left.isDown) {
        this.ship.body.rotateLeft(100);
      } else if (this.cursors.right.isDown) {
        this.ship.body.rotateRight(100);
      } else {
        this.ship.body.setZeroRotation();
      }
      //
      if (this.cursors.up.isDown) {
        this.ship.body.thrust(400);
      } else if (this.cursors.down.isDown) {
        this.ship.body.reverse(400);
      }
      //
      if (!this.camera.atLimit.x) {
        this.starfield.tilePosition.x -=
          this.ship.body.velocity.x * this.game.time.physicsElapsed;
      }
      //
      if (!this.camera.atLimit.y) {
        this.starfield.tilePosition.y -=
          this.ship.body.velocity.y * this.game.time.physicsElapsed;
      }
    }
  }
})();
