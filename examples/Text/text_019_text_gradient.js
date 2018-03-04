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
      //
      this.counter = 0;
      this.lastTime = 0;
      //
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.scale.pageAlignHorizontally = true;
      this.scale.pageAlignVertically = true;
    }

    create () {
      //
      this.stage.setBackgroundColor('#2d2d2d');
      //
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
      //
      this.text.stroke = 'rgba(255,0,0,0.5)';
      this.text.strokeThickness = 16;
      this.text.setShadow(30, 30, 'rgba(255,0,0,0.5)', 0, true, true);
    }

    update () {
      this.counter++;
      if (this.time.now > this.lastTime) {
        this.text.setShadow(30 * Math.sin(this.counter), 30 * Math.cos(this.counter), 'rgba(255,0,0,0.5)', 0, true, true);
        this.lastTime = this.time.now + 100;
      }
    }

    render () {
    }
  }
})();
