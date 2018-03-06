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
      this.load.image('goldFont', '/assets/fonts/retroFonts/gold_font.png');
      this.load.image('bluePink', '/assets/fonts/retroFonts/bluepink_font.png');
      this.load.image('forgotten', '/assets/pics/forgotten_worlds.png');
    }

    create () {
      this.font1 = this.add.retroFont('goldFont', 16, 16, "!     :() ,?." + Phaser.RetroFont.TEXT_SET10, 20, 0, 0);
      this.font1.text = 'phaser brings you retro style bitmap fonts';
      //
      this.image1 = this.add.image(this.world.centerX, 48, this.font1);
      this.image1.anchor.set(0.5);
      //
      this.font2 = this.add.retroFont('bluePink', 32, 32, Phaser.RetroFont.TEXT_SET2, 10);
      this.font2.setText('phaser 2\nin the house', true, 0, 8, Phaser.RetroFont.ALIGN_CENTER);
      //
      this.image2 = this.add.image(this.world.centerX, 220, this.font2);
      this.image2.anchor.set(0.5);
      //
      this.add.image(0, this.game.height - 274, 'forgotten');
      game.time.events.loop(Phaser.Timer.SECOND * 2, this.change, this);
    }

    change () {
      this.image2.tint = Math.random() * 0xffffff;
    }

    update () {
      this.image2.rotation += (2 * game.time.physicsElapsed);
    }

    render () {
      game.debug.text(game.time.physicsElapsed, 32, 32);
    }
  }

})();