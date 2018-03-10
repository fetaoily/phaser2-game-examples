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
      this.mushroom = null;
      this.texture = null;
    }

    preload () {
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.scale.pageAlignHorizontally = true;
      this.scale.pageAlignVertically = true;
      //
      this.load.image("mushroom", "/assets/sprites/mushroom2.png");
    }

    create () {
      this.texture = this.add.renderTexture(800, 600, "mousetrail");
      this.mushroom = this.make.sprite(0, 0, "mushroom");
      this.mushroom.anchor.set(0.5);
      this.add.sprite(0, 0, this.texture);
    }

    update () {
      if (!this.input.activePointer.position.isZero()) {
        this.texture.renderXY(
            this.mushroom,
            this.input.activePointer.x,
            this.input.activePointer.y
        );
      }
    }

    render () {
    }
  }
})();
