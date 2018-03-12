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
      this.block = null;
      this.wizball = null;
      this.tetris1 = null;
      this.tetris2 = null;
      this.tetris3 = null;
      this.cursors = null;
      this.result = "Move with the cursors";
    }

    preload() {
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.scale.pageAlignHorizontally = true;
      this.scale.pageAlignVertically = true;
      //
      this.load.image("contra2", "/assets/pics/contra2.png");
      this.load.image("block", "/assets/sprites/block.png");
      this.load.image("wizball", "/assets/sprites/wizball.png");
      this.load.image("tetrisblock1", "/assets/sprites/tetrisblock1.png");
      this.load.image("tetrisblock2", "/assets/sprites/tetrisblock2.png");
      this.load.image("tetrisblock3", "/assets/sprites/tetrisblock3.png");
      //
      this.load.physics("physicsData", "/assets/physics/sprites.json");
    }

    create() {
      this.physics.startSystem(Phaser.Physics.P2JS);
      this.physics.p2.restitution = 0.9;
      //
      this.contra = this.add.sprite(200, 200, "contra2");
      this.block = this.add.sprite(500, 200, "block");
      this.wizball = this.add.sprite(500, 500, "wizball");
      this.tetris1 = this.add.sprite(100, 450, "tetrisblock1");
      this.tetris2 = this.add.sprite(300, 450, "tetrisblock2");
      this.tetris3 = this.add.sprite(650, 350, "tetrisblock3");
      //
      this.physics.p2.enable(
        [
          this.contra,
          this.block,
          this.wizball,
          this.tetris1,
          this.tetris2,
          this.tetris3
        ],
        true
      );
      //
      this.contra.body.clearShapes();
      this.contra.body.loadPolygon("physicsData", "contra2");
      //
      this.wizball.body.setCircle(45);
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
      this.cursors = this.input.keyboard.createCursorKeys();
      //
      this.block.body.onBeginContact.add(this.blockHit, this);
    }

    update() {
      this.block.body.setZeroVelocity();
      //
      if (this.cursors.left.isDown) {
        this.block.body.moveLeft(200);
      } else if (this.cursors.right.isDown) {
        this.block.body.moveRight(200);
      }
      //
      if (this.cursors.up.isDown) {
        this.block.body.moveUp(200);
      } else if (this.cursors.down.isDown) {
        this.block.body.moveDown(200);
      }
    }

    render() {
      this.game.debug.text(this.result, 32, 32);
    }

    blockHit(body, bodyB, shapeA, shapeB, equation) {
      if (body) {
        this.result = "You last hit:" + body.sprite.key;
      } else {
        this.result = "You last hit: The wall :)";
      }
    }
  }
})();
