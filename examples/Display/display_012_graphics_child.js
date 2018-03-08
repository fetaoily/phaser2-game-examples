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
      this.scale.pageAlignVertically = true
      //
      this.load.image('atari', '/assets/demoscene/atari.png');
    }

    create () {
      this.graphics = this.add.graphics(260, 260);
      this.graphics.beginFill(0x027a71);
      this.graphics.lineStyle(4, 0x02fdeb, 1);
      this.graphics.moveTo(0, 0);
      this.graphics.lineTo(250, 0);
      this.graphics.lineTo(250, 200);
      this.graphics.lineTo(125, 100);
      this.graphics.lineTo(0, 200);
      this.graphics.lineTo(0, 0);
      this.graphics.endFill();
      //
      this.sprite = this.make.sprite(32, -48, 'atari');
      this.graphics.addChild(this.sprite);
    }

    update () {
    }

    render () {
    }
  }
})();