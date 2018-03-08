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
      this.load.image('dragon', '/assets/pics/cougra_dragonsun.png');
      this.load.image('star', '/assets/pics/monika_krawinkel-amberstart_title.png');
      this.load.image('nanoha', '/assets/pics/nanoha_taiken_pink.png');
    }

    create () {
      this.i = this.add.image(this.world.centerX, this.world.centerY, 'nanoha');
      this.i.anchor.set(0.5);
      //
      this.stage.setBackgroundColor('#4d4d4d');
      // this.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
      // this.scale.fullScreenScaleMode = Phaser.ScaleManager.NO_SCALE;
      this.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
      //
      this.input.onDown.add(this.goFull, this);
    }

    update () {
    }

    render () {
      this.game.debug.inputInfo(32, 32);
      this.game.debug.text('Click / Tap to fullscreen', 270, 16);
      this.game.debug.text('Click / Tap to fullscreen', 0, 16);
      this.game.debug.pointer(this.input.activePointer);
    }

    goFull () {
      if (this.scale.isFullScreen) {
        this.scale.stopFullScreen();
      } else {
        this.scale.startFullScreen();
      }
    }
  }
})();