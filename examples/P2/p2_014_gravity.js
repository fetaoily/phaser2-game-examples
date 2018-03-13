(() => {
  let game;

  window.onload = () => {
    game = new NewGame();
  };

  class NewGame extends Phaser.Game {
    constructor () {
      super(800, 600, Phaser.CANVAS);
      this.state.add("PlayGame", PlayGame);
      this.state.start("PlayGame");
    }
  }

  class PlayGame extends Phaser.State {
    constructor () {
      super();
      this.sprite = null;
      this.bmd = null;
    }

    preload () {
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.scale.pageAlignHorizontally = true;
      this.scale.pageAlignVertically = true;
      //
      this.load.image("arrow", "/assets/sprites/xenon2_ship.png");
    }

    create () {
      this.physics.startSystem(Phaser.Physics.P2JS);
      //
      this.stage.setBackgroundColor("#124184");
      //
      this.bmd = this.add.bitmapData(800, 600);
      this.bmd.context.fillStyle = "#ffffff";
      //
      this.add.sprite(0, 0, this.bmd);
      //
      this.physics.p2.gravity.y = 100;
      this.physics.p2.restitution = 0.8;
      //
      this.sprite = this.add.sprite(32, 450, "arrow");
      //
      this.physics.p2.enable(this.sprite);
      //
      this.sprite.body.fixedRotation = true;
      //
      this.text = this.add.text(
          20,
          20,
          "click to the left / right of the ship",
          {fill: "#ffffff", font: "14pt Arial"}
      );
      //
      this.input.onDown.add(this.launch, this);
    }

    update () {
      this.bmd.context.fillStyle = "#ffff00";
      this.bmd.context.fillRect(this.sprite.x, this.sprite.y, 2, 2);
    }

    render () {
    }

    launch () {
      if (this.game.input.x < this.sprite.x) {
        this.sprite.body.velocity.x = -200;
        this.sprite.body.velocity.y = -200;
      } else {
        this.sprite.body.velocity.x = 200;
        this.sprite.body.velocity.y = -200;
      }
    }
  }
})();
