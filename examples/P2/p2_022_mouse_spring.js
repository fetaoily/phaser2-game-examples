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
      this.cow = null;
      this.line = null;
      this.mouseBody = null;
      this.mouseSpring = null;
      this.drawLine = false;
    }

    preload () {
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.scale.pageAlignHorizontally = true;
      this.scale.pageAlignVertically = true;
      //
      this.load.image("gummi", "wip/gummi.png");
      this.load.image("cow", "wip/cow48.png");
      this.load.image("cursor", "/assets/sprites/enemy-bullet.png");
    }

    create () {
      this.stage.setBackgroundColor("#304871");
      //
      this.physics.startSystem(Phaser.Physics.P2JS);
      this.physics.p2.gravity.y = 100;
      this.physics.p2.restitution = 0.8;
      //
      this.cow = this.add.sprite(200, 200, "cow");
      this.physics.p2.enable(this.cow, true);
      this.cow.body.setCircle(20);
      //
      this.mouseBody = this.add.sprite(100, 100, "cursor");
      this.physics.p2.enable(this.mouseBody, true);
      this.mouseBody.body.static = true;
      this.mouseBody.body.setCircle(10);
      this.mouseBody.body.data.shapes[0].sensor = true;
      //
      this.line = new Phaser.Line(
          this.cow.x,
          this.cow.y,
          this.mouseBody.x,
          this.mouseBody.y
      );
      //
      this.input.onDown.add(this.click, this);
      this.input.onUp.add(this.release, this);
      this.input.addMoveCallback(this.move, this);
    }

    update () {
    }

    render () {
      if (this.drawLine) {
        this.game.debug.geom(this.line);
      }
    }

    preRender () {
      if (this.line) {
        this.line.setTo(
            this.cow.x,
            this.cow.y,
            this.mouseBody.x,
            this.mouseBody.y
        );
      }
    }

    click (pointer) {
      let bodies = this.physics.p2.hitTest(pointer.position, [this.cow.body]);
      if (bodies.length) {
        this.mouseSpring = this.physics.p2.createSpring(
            this.mouseBody,
            bodies[0],
            0,
            30,
            1
        );
        this.line.setTo(
            this.cow.x,
            this.cow.y,
            this.mouseBody.x,
            this.mouseBody.y
        );
        this.drawLine = true;
      }
    }

    release () {
      this.physics.p2.removeSpring(this.mouseSpring);
      this.drawLine = false;
    }

    move (pointer, x, y, isDown) {
      this.mouseBody.body.x = x;
      this.mouseBody.body.y = y;
      this.line.setTo(
          this.cow.x,
          this.cow.y,
          this.mouseBody.x,
          this.mouseBody.y
      );
    }
  }
})();
