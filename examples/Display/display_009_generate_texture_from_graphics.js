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
      this.graphics = this.add.graphics(0, 0);
      this.graphics.beginFill(0xFF3300);
      this.graphics.lineStyle(10, 0xffd900, 1);
      //
      this.graphics.moveTo(50, 50);
      this.graphics.lineTo(250, 50);
      this.graphics.lineTo(100, 100);
      this.graphics.lineTo(250, 220);
      this.graphics.lineTo(50, 220);
      this.graphics.lineTo(50, 50);
      this.graphics.endFill();
      //
      this.graphics.lineStyle(10, 0xff0000, 0.8);
      this.graphics.beginFill(0xff7008, 1);
      //
      this.graphics.moveTo(210, 300);
      this.graphics.lineTo(450, 320);
      this.graphics.lineTo(570, 350);
      this.graphics.quadraticCurveTo(600, 0, 480, 100);
      this.graphics.lineTo(330, 120);
      this.graphics.lineTo(410, 200);
      this.graphics.lineTo(210, 330);
      this.graphics.endFill();
      //
      this.graphics.lineStyle(2, 0x0000ff, 1);
      this.graphics.drawRect(50, 250, 100, 100);
      //
      this.graphics.lineStyle(20, 0x33ff00);
      this.graphics.moveTo(30, 30);
      this.graphics.lineTo(600, 300);
      //
      this.sprite = this.add.sprite(400, 300, this.graphics.generateTexture());
      this.sprite.anchor.set(0.5);
      //
      this.graphics.destroy();
    }

    update () {
      this.sprite.rotation += 0.01;
    }

    render () {
    }
  }
})();