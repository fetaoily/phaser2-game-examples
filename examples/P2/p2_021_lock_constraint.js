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
      this.load.image("vu", "/assets/sprites/vu.png");
      this.load.image("ball", "/assets/sprites/arrow.png");
      this.load.image("sky", "/assets/skies/cavern2.png");
    }

    create () {
      this.add.image(0, 0, "sky");
      //
      this.physics.startSystem(Phaser.Physics.P2JS);
      //
      this.sprite = this.add.sprite(400, 200, "ball");
      //
      let vu1 = this.add.sprite(400, 300, "vu");
      this.physics.p2.enable([this.sprite, vu1], true);
      //
      let constraint = this.physics.p2.createLockConstraint(
          this.sprite,
          vu1,
          [0, 80],
          0
      );
      //
      this.text = this.add.text(20, 20, "move with arrow keys", {
        fill: "#ffffff"
      });
      //
      this.cursors = this.input.keyboard.createCursorKeys();
    }

    update () {
      if (this.cursors.left.isDown) {
        this.sprite.body.moveLeft(100);
      } else if (this.cursors.right.isDown) {
        this.sprite.body.moveRight(100);
      }
      //
      if (this.cursors.up.isDown) {
        this.sprite.body.moveUp(100);
      } else if (this.cursors.down.isDown) {
        this.sprite.body.moveDown(100);
      }
    }

    render () {
    }
  }
})();
