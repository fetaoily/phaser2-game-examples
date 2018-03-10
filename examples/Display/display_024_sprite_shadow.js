(() => {
  'use strict';
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
      this.shadow = null;
      this.offset = new Phaser.Point(10, 8);
    }

    preload () {
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.scale.pageAlignHorizontally = true;
      this.scale.pageAlignVertically = true;
      //
      this.load.image("hotdog", "/assets/sprites/hotdog.png");
    }

    create () {
      this.stage.setBackgroundColor("#0c9fc7");
      //
      this.shadow = this.add.sprite(
          this.world.centerX,
          this.world.centerY,
          "hotdog"
      );
      this.shadow.anchor.set(0.5);
      this.shadow.tint = 0x000000;
      this.shadow.alpha = 0.6;
      //
      this.sprite = this.add.sprite(
          this.world.centerX,
          this.world.centerY,
          "hotdog"
      );
      this.sprite.anchor.set(0.5);
      //
      this.input.addMoveCallback(this.move, this);
    }

    update () {
    }

    render () {
    }

    move (pointer, x, y) {
      this.sprite.x = x;
      this.sprite.y = y;
      //
      this.shadow.x = this.sprite.x + this.offset.x;
      this.shadow.y = this.sprite.y + this.offset.y;
    }
  }
})();
