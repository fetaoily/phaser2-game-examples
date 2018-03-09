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
      this.ball = null;
      this.texture = null;
    }

    preload() {
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.scale.pageAlignHorizontally = true;
      this.scale.pageAlignVertically = true;
      //
      this.load.image("ball", "/assets/sprites/pangball.png");
    }

    create() {
      this.texture = this.add.renderTexture(800, 600, "mousetrail");
      this.ball = this.make.sprite(0, 0, "ball");
      this.ball.anchor.set(0.5);
      this.add.sprite(0, 0, this.texture);
    }

    update() {
      if (!this.input.activePointer.position.isZero()) {
        this.texture.renderXY(
          this.ball,
          this.input.activePointer.x,
          this.input.activePointer.y,
          true
        );
        this.texture.renderXY(
          this.ball,
          this.input.activePointer.x,
          600 - this.input.activePointer.y,
          false
        );
      }
    }

    render() {}
  }
})();
