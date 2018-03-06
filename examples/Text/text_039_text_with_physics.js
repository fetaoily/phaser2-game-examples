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
      this.text1 = null;
      this.text2 = null;
    }

    preload () {
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.scale.pageAlignHorizontally = true;
      this.scale.pageAlignVertically = true;
    }

    create () {
      this.stage.setBackgroundColor(0xbdbdbd);
      this.physics.startSystem(Phaser.Physics.ARCADE);
      //
      this.text1 = this.add.text(20, 20, 'Text Objects', {font: '62px Arial Black', fill: '#c51b7d'});
      this.text1.stroke = '#de77ae';
      this.text1.strokeThickness = 16;
      this.text1.setShadow(2, 2, '#333333', 2, true, false);
      //
      this.text2 = this.add.text(200, 300, 'With physics', {font: '62px Arial Black', fill: '#c51b7d'});
      this.text2.stroke = '#de77ae';
      this.text2.strokeThickness = 16;
      this.text2.setShadow(2, 2, '#333333', 2, false, true);
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