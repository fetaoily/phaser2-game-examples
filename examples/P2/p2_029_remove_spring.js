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
      this.spring = null;
    }

    preload () {
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.scale.pageAlignHorizontally = true;
      this.scale.pageAlignVertically = true;
      //
      this.load.image("atari", "/assets/sprites/atari130xe.png");
      this.load.image("ball", "/assets/sprites/red_ball.png");
      this.load.image("sky", "/assets/skies/cavern2.png");
    }

    create () {
      this.add.image(0, 0, "sky");
      //
      this.physics.startSystem(Phaser.Physics.P2JS);
      //
      this.sprite1 = this.add.sprite(400, 300, "ball");
      this.sprite2 = this.add.sprite(400, 400, "atari");
      //
      this.physics.p2.enable([this.sprite1, this.sprite2]);
      //
      this.sprite1.body.collideWorldBounds = true;
      this.sprite2.body.collideWorldBounds = true;
      //
      this.spring = this.physics.p2.createSpring(
          this.sprite1,
          this.sprite2,
          20,
          10,
          1
      );
      //
      this.text = this.add.text(
          20,
          20,
          "move with arrow keys, click to remove spring",
          {fill: "#ffffff"}
      );
      this.cursors = this.input.keyboard.createCursorKeys();
      //
      this.input.onDown.add(this.removeSpring, this);
    }

    update () {
      this.sprite2.body.setZeroVelocity();
      if (this.cursors.left.isDown) {
        this.sprite2.body.moveLeft(400);
      } else if (this.cursors.right.isDown) {
        this.sprite2.body.moveRight(400);
      }
      //
      if (this.cursors.up.isDown) {
        this.sprite2.body.moveUp(400);
      } else if (this.cursors.down.isDown) {
        this.sprite2.body.moveDown(400);
      }
    }

    render () {
    }

    removeSpring () {
      this.physics.p2.removeSpring(this.spring);
    }
  }
})();
