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
    }

    create () {
      this.stage.setBackgroundColor("#440e62");
    }

    update () {
    }

    render () {
      let x = 32;
      let y = 0;
      let yi = 32;
      //
      this.game.debug.text("Viewport", x, (y += yi));
      this.game.debug.text(
          "Viewport Width: " + this.game.scale.viewportWidth,
          x,
          (y += yi)
      );
      this.game.debug.text(
          "window.innerWidth:" + window.innerWidth,
          x,
          (y += yi)
      );
      this.game.debug.text(
          "window.outerWidth:" + window.outerWidth,
          x,
          (y += yi)
      );
      //
      this.game.debug.text(
          "Viewport Height: " + this.game.scale.viewportHeight,
          x,
          (y += yi)
      );
      this.game.debug.text(
          "window.innerHeight: " + window.innerHeight,
          x,
          (y += yi)
      );
      this.game.debug.text(
          "window.outerHeight: " + window.outerHeight,
          x,
          (y += yi)
      );
      //
      this.game.debug.text("Document", x, (y += yi * 2));
      this.game.debug.text(
          "Document Width: " + this.game.scale.documentWidth,
          x,
          (y += yi)
      );
      this.game.debug.text(
          "Document Height: " + this.game.scale.documentHeight,
          x,
          (y += yi)
      );
      //
      x = 350;
      y = 0;
      //
      this.game.debug.text("Device", x, (y += yi));
      this.game.debug.text(
          "window.screen.width: " + window.screen.width,
          x,
          (y += yi)
      );
      this.game.debug.text(
          "window.screen.availWidth: " + window.screen.availWidth,
          x,
          (y += yi)
      );
      this.game.debug.text(
          "window.screen.height: " + window.screen.height,
          x,
          (y += yi)
      );
      this.game.debug.text(
          "window.screen.avaliHeight: " + window.screen.availHeight,
          x,
          (y += yi)
      );
    }
  }
})();
