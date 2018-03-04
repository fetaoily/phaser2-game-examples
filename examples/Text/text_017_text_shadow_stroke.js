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
      this.load.image('lulu', '/assets/pics/shocktroopers_lulu2.png');
    }

    create () {
      this.stage.setBackgroundColor(0xbdbdbd);
      this.add.image(660, 412, 'lulu');
      //
      this.text1 = this.add.text(20, 20, 'Shadow Stroke', { font: '74px Arial Black', fill: '#c51b7d' });
      this.text1.stroke = '#de77ae';
      this.text1.strokeThickness = 16;
      this.text1.setShadow(2, 2, '#333333', 2, true, false);
      //
      this.text2 = this.add.text(20, 180, 'Shadow Fill', { font: '74px Arial Black', fill: '#c51b7d' });
      this.text2.stroke = '#de77ae';
      this.text2.strokeThickness = 16;
      this.text2.setShadow(2, 2, '#333333', 2, false, true);
      //
      this.text3 = this.add.text(20, 310, 'Shadow Both', { font: '74px Arial Black', fill: '#c51b7d' });
      this.text3.stroke = '#de77ae';
      this.text3.strokeThickness = 16;
      this.text3.setShadow(2, 2, '#333333', 2, true, true);
      //
      this.text4 = this.add.text(20,440,'Shadow None',{font:'74px Arial Black',fill:'#c51b7d'});
      this.text4.stroke = '#de77ae';
      this.text4.strokeThickness = 16;
      this.text4.setShadow(2,2,'#333333',2,false,false);
    }

    update () {
    }

    render () {
    }
  }
})();
