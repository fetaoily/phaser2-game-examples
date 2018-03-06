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
      this.video = null;
      this.sprite = null;
    }

    preload () {
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.scale.pageAlignHorizontally = true;
      this.scale.pageAlignVertically = true;
      //
      this.load.video('chrome', '/assets/video/chrome.webm');
    }

    create () {
      this.stage.setBackgroundColor('#232323');
      this.video = this.add.video('chrome');
      this.sprite = this.video.addToWorld(this.world.centerX, this.world.centerY, 0.5, 0.5, 2, 2);
      this.video.play(true);
      this.game.input.onDown.add(this.pause, this);
    }

    update () {
    }

    render () {
      game.debug.text("Video Time: " + this.video.currentTime, 32, 20);
      game.debug.text("Video Duration: " + this.video.duration, 550, 20);
      game.debug.text("Video Progress: " + Math.round(this.video.progress * 100) + "%", 32, 590);
      game.debug.text("Video Playing: " + this.video.playing, 550, 590);
    }

    pause () {
      this.video.paused = !this.video.paused;
    }


  }
})();