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
      this.vu1 = null;
      this.cursors = null;
    }

    preload () {
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.scale.pageAlignHorizontally = true;
      this.scale.pageAlignVertically = true;
      //
      this.load.image("atari", "/assets/sprites/atari800xl.png");
      this.load.image("lift", "/assets/sprites/flectrum.png");
      this.load.image("sky", "/assets/skies/cavern2.png");
    }

    create () {
      this.add.image(0, 0, "sky");
      //
      this.physics.startSystem(Phaser.Physics.P2JS);
      //
      this.sprite = this.add.sprite(200, 400, "atari");
      //
      this.vu1 = this.add.sprite(400, 400, "lift");
      //
      this.physics.p2.enable([this.sprite, this.vu1]);
      //
      this.sprite.body.fixedRotation = true;
      this.vu1.body.fixedRotation = true;
      //
      let constraint = this.physics.p2.createPrismaticConstraint(
          this.sprite,
          this.vu1,
          false,
          [150, 0],
          [-15, 0],
          [0, 1]
      );
      constraint.upperLimitEnabled = true;
      constraint.upperLimit = this.physics.p2.pxm(0.5);
      constraint.lowerLimitEnabled = true;
      constraint.lowerLimit = this.physics.p2.pxm(-0.5);
      //
      this.text = this.add.text(20, 20, "move with arrow keys", {
        fill: "#ffffff"
      });
      this.cursors = this.input.keyboard.createCursorKeys();
    }

    update () {
      this.sprite.body.setZeroVelocity();
      this.vu1.body.setZeroVelocity();
      //
      if (this.cursors.left.isDown) {
        this.sprite.body.moveLeft(200);
      } else if (this.cursors.right.isDown) {
        this.sprite.body.moveRight(200);
      }
      //
      if (this.cursors.up.isDown) {
        this.vu1.body.moveUp(200);
      } else if (this.cursors.down.isDown) {
        this.vu1.body.moveDown(200);
      }
    }

    render () {
    }
  }
})();
