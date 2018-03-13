(() => {
  let game;

  window.onload = () => {
    game = new NewGame();
  };

  class NewGame extends Phaser.Game {
    constructor() {
      super(800, 600, Phaser.AUTO);
      this.state.add("PlayGame", PlayGame);
      this.state.start("PlayGame");
    }
  }

  class PlayGame extends Phaser.State {
    constructor() {
      super();
      this.contra = null;
      this.bunny = null;
      this.tetris1 = null;
      this.tetris2 = null;
      this.tetris3 = null;
      this.start = false;
    }

    preload() {
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.scale.pageAlignHorizontally = true;
      this.scale.pageAlignVertically = true;
      //
      this.load.image("contra2", "/assets/pics/contra2.png");
      this.load.image("bunny", "/assets/sprites/bunny.png");
      this.load.image("tetrisblock1", "/assets/sprites/tetrisblock1.png");
      this.load.image("tetrisblock2", "/assets/sprites/tetrisblock2.png");
      this.load.image("tetrisblock3", "/assets/sprites/tetrisblock3.png");
      //
      this.load.physics("physicsData", "/assets/physics/sprites.json");
    }

    create() {
      this.physics.startSystem(Phaser.Physics.P2JS);
      //
      this.physics.p2.defaultRestitution = 0.8;
      //
      this.contra = this.add.sprite(100, 200, "contra2");
      this.bunny = this.add.sprite(500, 250, "bunny");
      this.tetris1 = this.add.sprite(100, 400, "tetrisblock1");
      this.tetris2 = this.add.sprite(300, 450, "tetrisblock2");
      this.tetris3 = this.add.sprite(600, 450, "tetrisblock3");
      //
      this.physics.p2.enable(
        [this.contra, this.bunny, this.tetris1, this.tetris2, this.tetris3],
        true
      );
      //
      this.contra.body.clearShapes();
      this.contra.body.loadPolygon("physicsData", "contra2");
      //
      this.bunny.body.clearShapes();
      this.bunny.body.loadPolygon("physicsData", "bunny");
      //
      this.tetris1.body.clearShapes();
      this.tetris1.body.loadPolygon("physicsData", "tetrisblock1");
      //
      this.tetris2.body.clearShapes();
      this.tetris2.body.loadPolygon("physicsData", "tetrisblock2");
      //
      this.tetris3.body.clearShapes();
      this.tetris3.body.loadPolygon("physicsData", "tetrisblock3");
      //
      this.input.onDown.add(this.boom, this);
    }

    update() {}

    render() {}

    boom() {
      if (this.input.activePointer.x > this.tetris1.x) {
        this.tetris1.body.rotateLeft(200);
      } else {
        this.tetris1.body.rotateRight(200);
      }
      //
      if (this.input.activePointer.y < this.tetris1.y) {
        this.tetris1.body.moveForward(400);
      } else {
        this.tetris1.body.moveBackward(400);
      }
    }
  }
})();
