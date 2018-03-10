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
      this.boss = null;
      this.melon = null;
      this.button = null;
    }

    preload() {
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.scale.pageAlignHorizontally = true;
      this.scale.pageAlignVertically = true;
      //
      this.load.image("boss", "/assets/misc/boss1.png");
      this.load.image("melon", "/assets/sprites/melon.png");
      this.load.spritesheet(
        "button",
        "/assets/buttons/button_sprite_sheet.png",
        193,
        71
      );
    }

    create() {
      this.game.renderer.renderSession.roundPixels = true;
      this.boss = this.add.sprite(
        this.world.centerX,
        this.world.centerY,
        "boss"
      );
      this.boss.anchor.setTo(0.5, 0.5);
      this.boss.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
      this.button = this.add.button(
        32,
        32,
        "button",
        this.clickedIt,
        this,
        2,
        1,
        0
      );
    }

    update() {}

    render() {}

    clickedIt() {
      this.boss.scale.x += 0.5;
      this.boss.scale.y += 0.5;
    }
  }
})();
