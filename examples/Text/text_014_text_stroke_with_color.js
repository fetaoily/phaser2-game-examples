(() => {
  let game;


  window.onload = () => {
    game = new NewGame();
  };

  class NewGame extends Phaser.Game {
    constructor () {
      super();
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
      this.stage.setBackgroundColor(0x2d2d2d);
      //
      this.text = game.add.text(this.world.centerX, this.world.centerY, '- phaser text stroke -');
      this.text.anchor.set(0.5);
      this.text.align = 'center';
      this.text.font = 'Arial Black';
      this.text.fontSize = 50;
      this.text.fontWeight = 'bold';
      this.text.stroke = '#000000';
      this.text.strokeThickness = 8;
      this.text.fill = '#43d637';
      //
      this.text.addColor('#ff00ff', 9);
      this.text.addColor('#43d637', 13);
      //
      this.text.addStrokeColor('#ff0000', 13);
      this.text.addStrokeColor('#000000', 20);
    }


    update () {
    }

    render () {
    }
  }
})();
