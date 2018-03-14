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
      this.sprite = null;
    }

    preload() {
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.scale.pageAlignHorizontally = true;
      this.scale.pageAlignVertically = true;
      //
      this.load.image("phaser", "/assets/sprites/phaser1.png");
    }

    create() {
      this.stage.setBackgroundColor("#2384e7");
      //
      this.sprite = this.add.sprite(
        this.world.centerX,
        this.world.centerY,
        "phaser"
      );
      this.sprite.anchor.set(0.5);
      //
      this.add
        .tween(this.sprite)
        .from(
          { y: -200 },
          2000,
          Phaser.Easing.Bounce.Out,
          true,
          100,
          Number.MAX_VALUE,
          true
        );
    }

    update() {}

    render() {}
  }
})();
