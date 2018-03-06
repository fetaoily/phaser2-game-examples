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
      this.load.bitmapFont('desyrel', '/assets/fonts/bitmapFonts/desyrel.png', '/assets/fonts/bitmapFonts/desyrel.xml');
      this.load.bitmapFont('stack', '/assets/fonts/bitmapFonts/shortStack.png', '/assets/fonts/bitmapFonts/shortStack.xml');
    }

    create () {
      this.physics.startSystem(Phaser.Physics.ARCADE);
      //
      this.text1 = this.add.bitmapText(200, 100, 'desyrel', 'BitmapText', 64);
      this.text2 = this.add.bitmapText(400, 400, 'stack', 'with Physics', 32);
      //
      this.physics.arcade.enable([this.text1, this.text2]);
      //
      this.text1.body.velocity.setTo(200, 200);
      this.text1.body.collideWorldBounds = true;
      this.text1.body.bounce.set(1);
      //
      this.text2.body.velocity.setTo(-100, -100);
      this.text2.body.collideWorldBounds = true;
      this.text2.body.bounce.set(1);
    }

    update () {
      this.physics.arcade.collide(this.text1, this.text2);
    }

    render () {
    }
  }
})();