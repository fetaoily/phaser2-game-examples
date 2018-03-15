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
      this.ball = null;
    }

    preload () {
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.scale.pageAlignHorizontally = true;
      this.scale.pageAlignVertically = true;
      //
      this.load.image('ball', '/assets/sprites/yellow_ball.png');
    }

    create () {
      this.ball = this.game.add.sprite(300, 0, 'ball');
      //
      this.startBounceTween();
    }

    update () {
    }

    render () {
    }

    startBounceTween () {
      this.ball.y = 0;
      //
      let bounce = this.game.add.tween(this.ball);
      bounce.to(
          {y: this.game.world.height - this.ball.height},
          1000 + Math.random() * 3000,
          Phaser.Easing.Bounce.In
      );
      bounce.onComplete.add(this.startBounceTween, this);
      bounce.start();
    }
  }
})();
