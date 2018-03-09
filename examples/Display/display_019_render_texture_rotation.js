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
      this.sprite = null;
      this.texture = null;
    }

    preload () {
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.scale.pageAlignHorizontally = true;
      this.scale.pageAlignVertically = true;
      //
      this.load.image("diver", "/assets/sprites/treasure_trap.png");
    }

    create () {
      this.texture = this.add.renderTexture(this.game.width, this.game.height);
      this.add.sprite(0, 0, this.texture);
      //
      this.sprite = this.add.sprite(127, 143, "diver");
      this.sprite.anchor.set(0.5);
      //
      this.add
          .tween(this.sprite.scale)
          .to({x: 0.2, y: 0.2}, 2000, "Sine.easeInOut", true, 500, -1, true);
      this.input.onDown.add(this.drawSprite, this);
      this.add.text(32, 32, "Click to draw Sprite", {
        font: "24px Arial",
        fill: "#ffffff"
      });
    }

    update () {
      this.sprite.rotation += 0.01;
      this.sprite.x = this.input.activePointer.x;
      this.sprite.y = this.input.activePointer.y;
    }

    render () {
    }

    drawSprite () {
      this.texture.render(this.sprite);
    }
  }
})();
