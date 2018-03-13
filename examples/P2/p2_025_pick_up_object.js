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
      this.tetris1 = null;
      this.tetris2 = null;
      this.tetris3 = null;
      this.mouseBody = null;
      this.mouseConstraint = null;
    }

    preload () {
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.scale.pageAlignHorizontally = true;
      this.scale.pageAlignVertically = true;
      //
      this.load.image("tetrisblock1", "/assets/sprites/tetrisblock1.png");
      this.load.image("tetrisblock2", "/assets/sprites/tetrisblock2.png");
      this.load.image("tetrisblock3", "/assets/sprites/tetrisblock3.png");
      //
      this.load.physics("physicsData", "/assets/physics/sprites.json");
    }

    create () {
      this.physics.startSystem(Phaser.Physics.P2JS);
      this.physics.p2.gravity.y = 1000;
      //
      this.tetris1 = this.add.sprite(300, 100, "tetrisblock1");
      this.tetris2 = this.add.sprite(375, 200, "tetrisblock2");
      this.tetris3 = this.add.sprite(450, 300, "tetrisblock3");
      //
      let blockCollisionGroup = this.physics.p2.createCollisionGroup();
      //
      this.physics.p2.updateBoundsCollisionGroup();
      //
      this.physics.p2.enable([this.tetris1, this.tetris2, this.tetris3], false);
      //
      this.tetris1.body.clearShapes();
      this.tetris1.body.loadPolygon("physicsData", "tetrisblock1");
      this.tetris1.body.setCollisionGroup(blockCollisionGroup);
      this.tetris1.body.collides([blockCollisionGroup]);
      //
      this.tetris2.body.clearShapes();
      this.tetris2.body.loadPolygon("physicsData", "tetrisblock2");
      this.tetris2.body.setCollisionGroup(blockCollisionGroup);
      this.tetris2.body.collides([blockCollisionGroup]);
      //
      this.tetris3.body.clearShapes();
      this.tetris3.body.loadPolygon("physicsData", "tetrisblock3");
      this.tetris3.body.setCollisionGroup(blockCollisionGroup);
      this.tetris3.body.collides([blockCollisionGroup]);
      //
      this.mouseBody = new p2.Body();
      this.physics.p2.world.addBody(this.mouseBody);
      //
      this.input.onDown.add(this.click, this);
      this.input.onUp.add(this.release, this);
      this.input.addMoveCallback(this.move, this);
    }

    update () {
    }

    render () {
    }

    click (pointer) {
      let bodies = this.physics.p2.hitTest(pointer.position, [
        this.tetris1.body,
        this.tetris2.body,
        this.tetris3.body
      ]);
      //
      let physicsPos = [
        this.physics.p2.pxmi(pointer.position.x),
        this.physics.p2.pxmi(pointer.position.y)
      ];
      if (bodies.length) {
        let clickedBody = bodies[0];
        let localPointInBody = [0, 0];
        clickedBody.toLocalFrame(localPointInBody, physicsPos);
        //
        this.mouseConstraint = this.physics.p2.createRevoluteConstraint(
            this.mouseBody,
            [0, 0],
            clickedBody,
            [
              this.physics.p2.mpxi(localPointInBody[0]),
              this.physics.p2.pxmi(localPointInBody[1])
            ]
        );
      }
    }

    release () {
      this.physics.p2.removeConstraint(this.mouseConstraint);
    }

    move (pointer) {
      this.mouseBody.position[0] = this.physics.p2.pxmi(pointer.position.x);
      this.mouseBody.position[1] = this.physics.p2.pxmi(pointer.position.y);
    }
  }
})();
