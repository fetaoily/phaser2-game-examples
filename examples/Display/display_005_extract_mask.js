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
      this.load.image('font', '/assets/demoscene/knighthawks.png');
    }

    create () {
      this.font = this.make.bitmapData(320, 150);
      this.mask = this.make.bitmapData(320, 150);
      this.mask.fill(50, 50, 50);
      this.font.draw('font');
      this.font.update();
      //
      this.add.sprite(0, 0, this.font);
      this.add.sprite(0, 150, this.mask);
      this.input.onDown.addOnce(this.getMask, this);
    }

    update () {
    }

    render () {
    }

    getMask () {
      this.font.extract(this.mask, 237, 0, 140);
    }
  }
})();