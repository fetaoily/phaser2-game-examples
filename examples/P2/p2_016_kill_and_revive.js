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
      //
      this.physics.p2.defaultRestitution = 0.8;
      //
      this.sprite = this.add.sprite(200, 200, "atari");
      //
      this.physics.p2.enable(this.sprite);
      //
      this.sprite.body.setZeroDamping();
      this.sprite.body.fixedRotation = true;
      //
      this.text = this.add.text(
          20,
          20,
          "move with arrow keys, click to kill and reset",
          {fill: "#ffffff"}
      );
      //
      this.input.onDown.add(this.deathToggle, this);
      //
      this.cursors = this.input.keyboard.createCursorKeys();
    }

    update () {
      this.sprite.body.setZeroVelocity();
      if (this.cursors.left.isDown) {
        this.sprite.body.moveLeft(400);
      } else if (this.cursors.right.isDown) {
        this.sprite.body.moveRight(400);
      }
      //
      if (this.cursors.up.isDown) {
        this.sprite.body.moveUp(400);
      } else if (this.cursors.down.isDown) {
        this.sprite.body.moveDown(400);
      }
    }

    render () {
    }

    deathToggle (pointer) {
      if (this.sprite.alive) {
        this.sprite.kill();
      } else {
        this.sprite.reset(pointer.x, pointer.y);
      }
    }
  }
})();
