(() => {
  let game;

  window.onload = () => {
    game = new NewGame();
  };

  class NewGame extends Phaser.Game {
    constructor () {
      super(800, 600, Phaser.AUTO);
      this.state.add('PlayGame', PlayGame);
      this.state.start('PlayGame');
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
      this.load.text('html', 'index.html');
    }

    create () {
      this.stage.setBackgroundColor('#0072bc');
      //
      let html = this.cache.getText('html');
      this.text = html.split('\n');
    }

    update () {
    }

    render () {
      for (let i = 0; i < 30; i++) {
        this.game.debug.text(this.text[i], 32, i * 20);
      }
    }
  }
})();