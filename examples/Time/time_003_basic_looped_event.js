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
      this.counter = 0;
      this.text = 0;
    }

    preload () {
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.scale.pageAlignHorizontally = true;
      this.scale.pageAlignVertically = true;
      //
      this.load.image('ball', '/assets/sprites/pangball.png');
    }

    create () {
      this.stage.setBackgroundColor('#6688ee');
      //
      this.text = this.add.text(this.world.centerX, this.world.centerY, 'Counter: 0', {
        font: '64px Arial', fill: '#ffffff'
      });
      this.text.anchor.setTo(0.5, 0.5);
      this.time.events.loop(Phaser.Timer.SECOND, this.updateCounter, this);
    }

    update () {
    }

    render () {
      this.game.debug.text('Time util event: ' + this.time.events.duration, 32, 32);
      this.game.debug.text('Next tick: ' + this.time.events.next, 32, 32 * 2);
    }

    updateCounter () {
      this.counter++;
      this.text.setText('Counter:' + this.counter);
    }
  }
})();