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
      this.text = game.add.text(this.world.centerX, this.world.centerY, '- phaser gradient text -');
      this.text.anchor.set(0.5);
      this.text.align = 'center';
      this.text.font = 'Arial';
      this.text.fontWeight = 'bold';
      this.text.fontSize = 70;
      //
      this.grd = this.text.context.createLinearGradient(0, 0, 0, this.text.height);
      this.grd.addColorStop(0, '#8ed6ff');
      this.grd.addColorStop(1, '#004cb3');
      this.text.fill = this.grd;

    }

    update () {
    }

    render () {
    }
  }
})();
