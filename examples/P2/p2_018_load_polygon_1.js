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
      this.start = false;
    }

    preload() {
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.scale.pageAlignHorizontally = true;
      this.scale.pageAlignVertically = true;
      //
      this.load.image("contra2", "/assets/pics/contra2.png");
      this.load.physics("physicsData", "/assets/physics/sprites.json");
    }

    create() {
      this.physics.startSystem(Phaser.Physics.P2JS);
      //
      this.contra = this.add.sprite(400, 300, "contra2");
      //
      this.physics.p2.enable(this.contra, true);
      //
      this.contra.body.clearShapes();
      this.contra.body.loadPolygon("physicsData", "contra2");
      //
      this.input.onDown.add(() => {
        this.start = true;
      }, this);
    }

    update() {
      if (this.start) {
        this.contra.body.rotateLeft(5);
      }
    }

    render() {}
  }
})();
