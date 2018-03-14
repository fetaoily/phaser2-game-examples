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
      this.sprite = null;
      this.cursors = null;
    }

    preload() {
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.scale.pageAlignHorizontally = true;
      this.scale.pageAlignVertically = true;
      //
      this.load.image("sky", "/assets/skies/sky4.png");
      this.load.image("starfield", "/assets/misc/starfield.jpg");
      this.load.spritesheet(
        "veggies",
        "/assets/sprites/fruitnveg32wh37.png",
        32,
        32
      );
    }

    create() {
      this.add.image(0, 0, "sky");
      //
      this.physics.startSystem(Phaser.Physics.P2JS);
      //
      this.physics.p2.defaultRestitution = 0.8;
      //
      this.sprite = this.add.tileSprite(300, 450, 200, 50, "starfield");
      //
      this.physics.p2.enable(this.sprite);
      //
      this.veggies = this.add.group();
      this.veggies.enableBody = true;
      this.veggies.physicsBodyType = Phaser.Physics.P2JS;
      //
      let vegFrames = [1, 3, 4, 8];
      for (let i = 0; i < 10; i++) {
        let veg = this.veggies.create(
          this.world.randomX,
          this.world.randomY,
          "veggies",
          this.rnd.pick(vegFrames)
        );
        veg.body.setCircle(26);
      }
      //
      this.text = this.add.text(20, 20, "move with arrow keys", {
        fill: "#ffffff"
      });
      this.cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
      this.sprite.body.setZeroVelocity();
      if (this.cursors.left.isDown) {
        this.sprite.body.moveLeft(400);
        this.sprite.tilePosition.x -= 8;
      } else if (this.cursors.right.isDown) {
        this.sprite.body.moveRight(400);
        this.sprite.tilePosition.x += 8;
      }
      //
      if (this.cursors.up.isDown) {
        this.sprite.body.moveUp(400);
        this.sprite.tilePosition.y -= 8;
      } else if (this.cursors.down.isDown) {
        this.sprite.body.moveDown(400);
        this.sprite.tilePosition.y += 8;
      }
    }

    render() {}
  }
})();
