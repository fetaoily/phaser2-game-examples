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
      this.stage.setBackgroundColor('#0072bc');
      this.style = {
        font: 'bold 60pt Arial', fill: 'white', align: 'left', wordWrap: true
      };
      this.text = this.add.text(this.world.centerX, this.world.centerY, 'phaser with a spinkle of pixi dust', this.style);
      this.text.anchor.set(0.5);
    }

    update () {
    }

    render () {
    }
  }
})();
