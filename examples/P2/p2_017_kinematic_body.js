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
      this.static1 = null;
      this.static2 = null;
      this.sprite = null;
      this.cursors = null;
    }

    preload () {
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.scale.pageAlignHorizontally = true;
      this.scale.pageAlignVertically = true;
      //
      this.load.image("wizball", "/assets/sprites/wizball.png");
      this.load.image("atari", "/assets/sprites/atari130xe.png");
      this.load.image("sky", "/assets/skies/sunset.png");
    }

    create () {
      this.world.setBounds(0, 0, 1600, 1200);
      //
      this.add.image(0, 0, "sky");
      //
      this.physics.startSystem(Phaser.Physics.P2JS);
      //
      this.physics.p2.restitution = 0.8;
      //
      this.sprite = this.add.sprite(400, 300, "wizball");
      this.physics.p2.enable(this.sprite, true);
      this.sprite.body.setCircle(this.sprite.width);
      //
      this.kinematic1 = this.add.sprite(200, 200, "atari");
      this.kinematic2 = this.add.sprite(500, 500, "atari");
      //
      this.physics.p2.enable([this.kinematic1, this.kinematic2]);
      //
      this.kinematic1.body.kinematic = true;
      this.kinematic2.body.kinematic = true;
      //
      this.kinematic1.body.velocity.x = 10;
      this.kinematic2.body.velocity.x = -10;
      //
      this.text = this.add.text(20, 20, "move with arrow keys", {
        fill: "#ffffff"
      });
      //
      this.cursors = this.input.keyboard.createCursorKeys();
      //
      this.game.time.events.loop(
          Phaser.Timer.SECOND * 20,
          this.switchDirections,
          this
      );
    }

    update () {
      if (this.cursors.left.isDown) {
        this.sprite.body.rotateLeft(80);
      } else if (this.cursors.right.isDown) {
        this.sprite.body.rotateRight(80);
      } else {
        this.sprite.body.setZeroRotation();
      }
      //
      if (this.cursors.up.isDown) {
        this.sprite.body.thrust(400);
      } else if (this.cursors.down.isDown) {
        this.sprite.body.reverse(400);
      }
    }

    render () {
    }

    switchDirections () {
      this.kinematic1.body.velocity.x =
          this.physics.p2.mpxi(this.kinematic1.body.velocity.x) * -1;
      this.kinematic2.body.velocity.x =
          this.physics.p2.mpxi(this.kinematic2.body.velocity.x) * -1;
    }
  }
})();
