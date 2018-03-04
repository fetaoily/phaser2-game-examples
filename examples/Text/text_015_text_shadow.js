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
      this.stage.setBackgroundColor(0xefefef);
      this.text = this.createText(100, 'shadow 5');
      this.text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
      this.text = this.createText(300, 'shadow 0');
      this.text.setShadow(5, 5, 'rgba(0,0,0,0.5)', 15);
      this.text = this.createText(500, 'shadow 10');
      this.text.setShadow(-5, 5, 'rgba(0,0,0,0.5)', 0);
    }

    update () {
    }

    render () {
    }

    createText (y, text) {
      this.text = this.add.text(this.world.centerX, y, text);
      this.text.anchor.set(0.5);
      this.text.align = 'center';
      this.text.font = 'Arial Black';
      this.text.fontSize = 50;
      this.text.fontWeight = 'bold';
      this.text.fill = '#ff00ff';
      return this.text;
    }
  }
})();
