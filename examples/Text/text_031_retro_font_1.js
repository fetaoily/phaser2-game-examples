(() => {
  'use strict';
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
      //
      this.font = null;
      //
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.scale.pageAlignHorizontally = true;
      this.scale.pageAlignVertically = true;
      //
      this.load.image('knightHawks', '/assets/fonts/retroFonts/KNIGHT3.png');
    }

    create () {
      this.font = this.add.retroFont('knightHawks', 31, 25, Phaser.RetroFont.TEXT_SET6, 10, 1, 1);
      for (let c = 1; c < 19; c++) {
        let i = this.add.image(this.world.centerX, 6 + c * 32, this.font);
        i.tint = Math.random() * 0xffffff;
        i.anchor.set(0.5, 1);
      }
    }

    update () {
      this.font.text = 'Phaser x: ' + this.input.x + ' y:' + this.input.y;
    }

    render () {
    }
  }
})();