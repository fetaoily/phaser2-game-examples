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
    }

    preload () {
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.scale.pageAlignHorizontally = true;
      this.scale.pageAlignVertically = true;
      //
      this.load.image("ball", "/assets/sprites/pangball.png");
    }

    create () {
      this.physics.startSystem(Phaser.Physics.P2JS);
      //
      this.stage.setBackgroundColor("#124184");
      //
      this.physics.p2.gravity.y = 100;
      this.physics.p2.restitution = 1.0;
      //
      let group = this.add.physicsGroup(Phaser.Physics.P2JS);
      for (let i = 0; i < 32; i++) {
        let ball = group.create(
            this.world.randomX,
            this.rnd.between(0, 100),
            "ball"
        );
        ball.body.setCircle(16);
        ball.body.fixedRotation = true;
      }
    }

    update () {
    }

    render () {
    }
  }
})();
