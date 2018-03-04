(() => {
  let game;

  window.onload = () => {
    game = new NewGame();
  };

  class NewGame extends Phaser.Game {
    constructor () {
      super();
      this.loadStates();
    }

    loadStates () {
      this.state.add('PlayGame', PlayGame);
      this.state.start('PlayGame');
    }
  }

  class PlayGame extends Phaser.State {
    constructor () {
      super();
      this.counter = 0;
      this.lastScaleTime = 0;
    }

    preload () {
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.scale.pageAlignHorizontally = true;
      this.scale.pageAlignVertically = true;
    }

    create () {
      this.stage.setBackgroundColor(0x2d2d2d);
      //
      this.text = this.add.text(this.world.centerX, this.world.centerY, '- phaser text stroke -');
      this.text.anchor.set(0.5);
      this.text.align = 'center';
      this.text.font = 'Arial Black';
      this.text.fontSize = 50;
      this.text.fontWeight = 'bold';
      //
      this.text.stroke = '#000000';
      this.text.strokeThickness = 30;
      this.text.fill = '#43d637';
    }

    update () {
      this.counter++;
      if (this.time.now > this.lastScaleTime) {
        this.text.angle += this.counter;
        this.text.scale.set(2 * Math.sin(this.counter));
        this.lastScaleTime = this.time.now + 200;
      }
    }

    render () {
    }
  }
})();
