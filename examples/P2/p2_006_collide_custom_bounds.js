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
      this.ship = null;
      this.cursors = null;
      this.customBounds = null;
    }

    preload () {
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.scale.pageAlignHorizontally = true;
      this.scale.pageAlignVertically = true;
      //
      this.load.spritesheet("ship", "/assets/sprites/humstar.png", 32, 32);
      this.load.image("ball", "/assets/sprites/shinyball.png");
    }

    create () {
      this.bounds = new Phaser.Rectangle(100, 100, 400, 400);
      //
      this.physics.startSystem(Phaser.Physics.P2JS);
      this.physics.p2.restitution = 0.9;
      //
      this.balls = this.add.physicsGroup(Phaser.Physics.P2JS);
      //
      for (let i = 0; i < 20; i++) {
        let ball = this.balls.create(
            this.bounds.randomX,
            this.bounds.randomY,
            "ball"
        );
        ball.body.setCircle(16);
      }
      //
      this.ship = this.add.sprite(
          this.bounds.centerX,
          this.bounds.centerY,
          "ship"
      );
      this.ship.scale.set(2);
      this.ship.smoothed = false;
      this.ship.animations.add("flay", [0, 1, 2, 3, 4, 5], 10, true);
      this.ship.animations.play("flay");
      //
      this.physics.p2.enable(this.ship);
      //
      this.ship.body.setCircle(28);
      //
      this.customBounds = {left: null, right: null, top: null, bottom: null};
      this.createPreviewBounds(
          this.bounds.x,
          this.bounds.y,
          this.bounds.width,
          this.bounds.height
      );
      //
      let graphics = this.add.graphics(this.bounds.x, this.bounds.y);
      graphics.lineStyle(4, 0xffd900, 1);
      graphics.drawRect(0, 0, this.bounds.width, this.bounds.height);
      //
      this.cursors = this.input.keyboard.createCursorKeys();
    }

    update () {
      this.ship.body.setZeroVelocity();
      if (this.cursors.left.isDown) {
        this.ship.body.moveLeft(200);
      } else if (this.cursors.right.isDown) {
        this.ship.body.moveRight(200);
      }
      //
      if (this.cursors.up.isDown) {
        this.ship.body.moveUp(200);
      } else if (this.cursors.down.isDown) {
        this.ship.body.moveDown(200);
      }
    }

    render () {
    }

    createPreviewBounds (x, y, w, h) {
      let sim = this.physics.p2;
      let mask = sim.boundsCollisionGroup.mask;
      //
      this.customBounds.left = new p2.Body({
        mass: 0,
        position: [sim.pxmi(x), sim.pxmi(y)],
        angle: Math.PI / 2
      });
      this.customBounds.left.addShape(new p2.Plane());
      //
      this.customBounds.right = new p2.Body({
        mass: 0,
        position: [sim.pxmi(x + w), sim.pxmi(y)],
        angle: -Math.PI / 2
      });
      this.customBounds.right.addShape(new p2.Plane());
      //
      this.customBounds.top = new p2.Body({
        mass: 0,
        position: [sim.pxmi(x), sim.pxmi(y)],
        angle: -Math.PI
      });
      this.customBounds.top.addShape(new p2.Plane());
      //
      this.customBounds.bottom = new p2.Body({
        mass: 0,
        position: [sim.pxmi(x), sim.pxmi(y + h)]
      });
      this.customBounds.bottom.addShape(new p2.Plane());
      //
      sim.world.addBody(this.customBounds.left);
      sim.world.addBody(this.customBounds.right);
      sim.world.addBody(this.customBounds.top);
      sim.world.addBody(this.customBounds.bottom);
    }
  }
})();
