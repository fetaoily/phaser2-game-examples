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
      this.tween = null;
      this.bounces = 10;
    }

    preload () {
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.scale.pageAlignHorizontally = true;
      this.scale.pageAlignVertically = true;
      //
      this.load.spritesheet('balls', '/assets/sprites/balls.png', 17, 17);
    }

    create () {
      this.ball = this.add.sprite(400, 0, 'balls', 0);
      //
      this.tween = this.add
          .tween(this.ball)
          .to(
              {y: this.game.world.height - this.ball.height},
              1500,
              Phaser.Easing.Bounce.Out,
              true,
              2500,
              10
          );
      this.tween.onStart.add(this.onStart, this);
      this.tween.onLoop.add(this.onLoop, this);
      this.tween.onComplete.add(this.onComplete, this);
    }

    update () {
    }

    render () {
      this.game.debug.text('Bounces: ' + this.bounces, 32, 32);
    }

    onStart () {
      this.tween.delay(0);
    }

    onLoop () {
      this.bounces--;
      if (this.ball.frame === 5) {
        this.ball.frame = 0;
      } else {
        this.ball.frame++;
      }
    }

    onComplete () {
      this.tween = this.game.add
          .tween(this.ball)
          .to(
              {x: this.world.width - this.ball.width},
              2000,
              Phaser.Easing.Exponential.Out,
              true
          );
    }
  }
})();
