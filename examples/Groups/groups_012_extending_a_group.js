(() => {
  'use strict';

  let game;

  window.onload = () => {
    game = new NewGame();
  };

  class NewGame extends ErtaoGame {
    constructor () {
      super(800, 600, Phaser.AUTO);
      this.state.add('PlayGame', PlayGame);
      this.state.start('PlayGame');
    }
  }

  class PlayGame extends ErtaoGameState {
    constructor () {
      super();
    }

    preload () {
      super.preload();
      //
      this.load.image('ufo', '/assets/sprites/ufo.png');
      this.load.image('baddie', '/assets/sprites/space-baddie.png');
    }

    create () {
      this.customGroup1 = new MonsterGroup(this.game, 'ufo', 'bounce');
      this.customGroup2 = new MonsterGroup(this.game, 'baddie', 'slide');
    }

    update () {
    }

    render () {
    }
  }

  class MonsterGroup extends Phaser.Group {
    constructor (game, image, action) {
      super(game);
      this.image = image;
      this.action = action;
      this.init();
    }

    init () {
      for (let i = 0; i < 30; i++) {
        let sprite = this.create(
            this.game.world.randomX,
            this.game.world.randomY,
            this.image
        );
        if (this.action === 'bounce') {
          this.game.add
              .tween(sprite)
              .to(
                  {x: sprite.y - 100},
                  2000,
                  Phaser.Easing.Elastic.Out,
                  true,
                  0,
                  1000,
                  true
              );
        } else if (this.action === 'slide') {
          this.game.add
              .tween(sprite)
              .to(
                  {x: sprite.x + 200},
                  4000,
                  Phaser.Easing.Elastic.Out,
                  true,
                  0,
                  1000,
                  true
              );
        }
      }
    }
  }
})();
