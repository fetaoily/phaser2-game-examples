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
      this.load.image("sonic", "/assets/sprites/sonic_havok_sanity.png");
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
      let sonic1 = this.add.sprite(200, 400, "sonic");
      let sonic2 = this.add.sprite(600, 400, "sonic");
      //
      this.physics.p2.enable([this.sprite, sonic1, sonic2]);
      //
      let constraint1 = this.physics.p2.createGearConstraint(
          this.sprite,
          sonic1,
          0,
          1
      );
      //
      let constraint2 = this.physics.p2.createGearConstraint(
          this.sprite,
          sonic2,
          0,
          0.5
      );
      //
      this.text = this.add.text(20, 20, "rotate with arrow keys", {
        fill: "#ffffff"
      });
      //
      this.cursors = this.input.keyboard.createCursorKeys();
    }

    update () {
      if (this.cursors.left.isDown) {
        this.sprite.body.rotateLeft(50);
      } else if (this.cursors.right.isDown) {
        this.sprite.body.rotateRight(50);
      }
    }

    render () {
    }
  }
})();
