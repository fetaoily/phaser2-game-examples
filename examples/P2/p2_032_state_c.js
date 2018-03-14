class StateC extends Phaser.State {
  constructor () {
    super();
    this.contra = null;
    this.block = null;
    this.tetris1 = null;
    this.changeTimer = null;
    this.cursors = null;
    this.result = "Move with cursors. Hit an object to change State";
  }

  preload () {
  }

  create () {
    this.stage.setBackgroundColor("#004a80");
    //
    this.physics.startSystem(Phaser.Physics.P2JS);
    this.physics.p2.restitution = 0.5;
    //
    this.contra = this.add.sprite(500, 300, "contra2");
    this.block = this.add.sprite(100, 200, "block");
    this.tetris1 = this.add.sprite(200, 150, "tetrisblock1");
    //
    this.physics.p2.enable([this.contra, this.block, this.tetris1], true);
    //
    this.contra.body.clearShapes();
    this.contra.body.loadPolygon("physicsData", "contra2");
    //
    this.tetris1.body.clearShapes();
    this.tetris1.body.loadPolygon("physicsData", "tetrisblock1");
    //
    this.cursors = this.input.keyboard.createCursorKeys();
    //
    this.block.body.onBeginContact.add(this.blockHit, this);
  }

  update () {
    this.block.body.setZeroVelocity();
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

  render () {
  }

  blockHit (body, shapeA, shapeB, equation) {
    if (body === null) {
      return;
    }
    if (body.sprite.key === "contra2") {
      this.changeTimer = this.game.time.events.add(3000, this.gotoStateA, this);
    } else if (body.sprite.key === "tetrisblock1") {
      this.changeTimer = this.game.time.events.add(3000, this.gotoStateB, this);
    }
  }

  gotoStateA () {
    this.state.start("StateA");
  }

  gotoStateB () {
    this.state.start("StateB");
  }
}
