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
      this.counters = [];
      this.text = [];
      this.timeEvents = [];
      this.i = 9;
    }

    preload () {
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.scale.pageAlignHorizontally = true;
      this.scale.pageAlignVertically = true;
    }

    create () {
      this.stage.setBackgroundColor('#6688ee');
      for (let i = 0; i < 10; i++) {
        this.counters[i] = 0;
        this.text[i] = this.add.text(this.world.centerX, 80 + (40 * i), 'Counter ' + i + ' = 0', {
          font: '32px Arial', fill: '#ffffff', align: 'center'
        });
        this.text[i].anchor.setTo(0.5, 0);
        this.timeEvents[i] = this.time.events.loop(this.rnd.integerInRange(250, 1000), this.updateCounter, this, i);
      }
      this.input.onDown.add(this.removeCounter, this);
    }

    update () {
    }

    render () {
      this.game.debug.text('Queued events: ' + this.game.time.events.length + ' - click to remove', 32, 32);
    }

    updateCounter (idx) {
      this.counters[idx]++;
      this.text[idx].setText('Counter ' + idx + ' = ' + this.counters[idx]);
    }

    removeCounter () {
      if (this.i >= 0) {
        this.game.time.events.remove(this.timeEvents[this.i]);
        this.text[this.i].style.fill = '#3344aa';
        this.text[this.i].setText('Counter ' + this.i + ' removed!');
        this.i--;
      }
    }
  }
})();