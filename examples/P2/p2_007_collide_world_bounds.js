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
      this.load.spritesheet("ship", "/assets/sprites/humstar.png", 32, 32);
    }

    create() {
      this.starfield = this.add.tileSprite(0, 0, 800, 600, "stars");
      //
      this.physics.startSystem(Phaser.Physics.P2JS);
      this.physics.p2.restitution = 0.8;
      //
      this.ship = this.add.sprite(200, 200, "ship");
      this.ship.scale.set(2);
      this.ship.smoothed = false;
      this.ship.animations.add("fly", [0, 1, 2, 3, 4, 5], 10, true);
      this.ship.play("fly");
      //
      this.physics.p2.enable(this.ship);
      //
      this.ship.body.setCircle(28);
      this.ship.body.collideWorldBounds = true;
      //
      this.cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
      this.ship.body.setZeroVelocity();
      //
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
    }

    render() {}
  }
})();
