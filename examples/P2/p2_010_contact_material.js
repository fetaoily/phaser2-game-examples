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
      this.sprite = null;
      this.cursors = null;
    }

    preload () {
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.scale.pageAlignHorizontally = true;
      this.scale.pageAlignVertically = true;
      //
      this.load.image("atari", "/assets/sprites/atari130xe.png");
      this.load.image("sky", "/assets/skies/sunset.png");
    }

    create () {
      this.add.image(0, 0, "sky");
      //
      this.physics.startSystem(Phaser.Physics.P2JS);
      this.physics.p2.gravity.y = 100;
      //
      this.sprite = this.add.sprite(200, 200, "atari");
      //
      this.physics.p2.enable(this.sprite);
      //
      let spriteMaterial = this.physics.p2.createMaterial(
          "spriteMaterial",
          this.sprite.body
      );
      let worldMaterial = this.physics.p2.createMaterial("worldMaterial");
      //
      this.physics.p2.setWorldMaterial(worldMaterial, true, true, true, true);
      //
      let contactMaterial = this.physics.p2.createContactMaterial(
          spriteMaterial,
          worldMaterial
      );
      contactMaterial.friction = 0.3;
      contactMaterial.restitution = 1.0;
      contactMaterial.stiffness = 1e7;
      contactMaterial.relaxation = 3;
      contactMaterial.frictionStiffness = 1e7;
      contactMaterial.frictionRelaxation = 3;
      contactMaterial.surfaceVelocity = 0;
      //
      this.text = this.add.text(20, 20, "move with arrow keys", {
        fill: "#ffffff"
      });
      //
      this.cursors = this.input.keyboard.createCursorKeys();
    }

    update () {
      if (this.cursors.left.isDown) {
        this.sprite.body.moveLeft(200);
      } else if (this.cursors.right.isDown) {
        this.sprite.body.moveRight(200);
      }
      //
      if (this.cursors.up.isDown) {
        this.sprite.body.moveUp(200);
      } else if (this.cursors.down.isDown) {
        this.sprite.body.moveDown(200);
      }
    }

    render () {
    }
  }
})();
