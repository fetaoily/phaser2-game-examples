(() => {
  'use strict';
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
      this.sprite = null;
      this.tween = null;
    }

    preload () {
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.scale.pageAlignHorizontally = true;
      this.scale.pageAlignVertically = true;
      //
      this.game.load.image('ball', '/assets/sprites/pangball.png');
    }

    create () {
      this.game.stage.setBackgroundColor('#2384e7');
      //
      this.sprite = this.game.add.sprite(100, 250, 'ball');
      this.tween = this.game.add.tween(this.sprite);
      this.tween.to(
          {x: [500, 500, 100, 100], y: [250, 150, 150, 250]},
          3000,
          'Linear'
      );
      this.tween.start();
      //
      this.game.input.onDown.add(this.again, this);
    }

    update () {
    }

    render () {
    }

    again () {
      if (!this.tween.isRunning) {
        this.sprite.position.setTo(100, 250);
        this.tween.start();
      }
    }
  }
})();
