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
    }

    create () {
      //
      this.stage.setBackgroundColor('#0c9fc7');
      //
      let out = [];
      let bmd = this.add.bitmapData(800, 600);
      bmd.addToWorld();

      let y = 0;
      for (let i = 0; i < 30; i++) {
        let c = Phaser.Color.interpolateColor(0x66d973, 0x40b54d, 30, i);
        bmd.rect(0, y, 800, y + 2, Phaser.Color.getWebRGB(c));
        out.push(Phaser.Color.getWebRGB(c));
        y += 2;
      }

      for (let i = 0; i < 60; i++) {
        let c = Phaser.Color.interpolateColor(0x40b54d, 0x1d962b, 60, i);
        bmd.rect(0, y, 800, y + 2, Phaser.Color.getWebRGB(c));
        out.push(Phaser.Color.getWebRGB(c));
        y += 2;
      }
    }

    update () {
    }

    render () {
    }
  }
})();