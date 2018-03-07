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
      this.timer = null;
      this.total = 0;
    }

    preload () {
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.scale.pageAlignHorizontally = true;
      this.scale.pageAlignVertically = true;
    }

    create () {
      this.stage.setBackgroundColor('#000');
      //
      this.timer = this.time.create(false);
      this.timer.loop(2000, this.updateCounter, this);
      this.timer.start();
    }

    update () {
    }

    render () {
      this.game.debug.text('Time util event:' + this.timer.duration.toFixed(0), 32, 32);
      this.game.debug.text('Loop Count: ' + this.total, 32, 32 * 2);
    }

    updateCounter () {
      this.total++;
    }
  }
})();