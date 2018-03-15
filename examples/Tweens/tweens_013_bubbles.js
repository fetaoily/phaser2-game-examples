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
      this.bg = null;
    }

    preload () {
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.scale.pageAlignHorizontally = true;
      this.scale.pageAlignVertically = true;
      //
      this.load.image('space', '/assets/pics/thalion-rain.png');
      this.load.image('ball', '/assets/particles/bubble.png');
    }

    create () {
      this.bg = this.game.add.tileSprite(0, 0, 800, 600, 'space');
      let delay = 0;
      for (let i = 0; i < 40; i++) {
        let sprite = this.game.add.sprite(
            -100 + this.game.world.randomX,
            600,
            'ball'
        );
        sprite.scale.set(this.game.rnd.realInRange(0.1, 0.6));
        let speed = this.game.rnd.between(4000, 6000);
        this.game.add
            .tween(sprite)
            .to(
                {y: -256},
                speed,
                Phaser.Easing.Sinusoidal.InOut,
                true,
                delay,
                1000,
                false
            );
        delay += 200;
      }
    }

    update () {
      this.bg.tilePosition.y += 0.4;
    }

    render () {
    }
  }
})();
