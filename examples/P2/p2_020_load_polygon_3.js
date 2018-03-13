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
    }

    preload() {
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.scale.pageAlignHorizontally = true;
      this.scale.pageAlignVertically = true;
      //
      this.load.image("contra2", "/assets/pics/contra2.png");
    }

    create() {
      this.physics.startSystem(Phaser.Physics.P2JS);
      //
      this.contra = this.add.sprite(
        this.world.centerX,
        this.world.centerY - 200,
        "contra2"
      );
      //
      this.physics.p2.enable(this.contra, true);
      //
      this.contra.body.clearShapes();
      //
      this.contra.body.addPolygon({}, 10, 191, 26, 158, 25, 186, 13, 204);
      this.contra.body.addPolygon({}, [10, 191, 26, 158, 25, 186, 13, 204]);
      this.contra.body.addPolygon({}, [
        [10, 191],
        [26, 158],
        [25, 186],
        [13, 204]
      ]);
    }

    update() {}

    render() {}
  }
})();
