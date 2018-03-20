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
      this.coins = null;
    }

    preload () {
      super.preload();
      //
      this.load.spritesheet('coin', '/assets/sprites/coin.png', 32, 32);
    }

    create () {
      //
      this.physics.startSystem(Phaser.Physics.ARCADE);
      //
      this.coins = this.add.group();
      //
      for (let i = 0; i < 50; i++) {
        let coin = this.coins.create(
            this.world.randomX,
            this.world.randomY,
            'coin',
            0
        );
        //
        coin.inputEnabled = true;
        coin.input.enableDrag();
        //
        this.physics.arcade.enable(coin);
        coin.body.velocity.x = this.math.between(-300, 300);
        coin.body.collideWorldBounds = true;
      }
      //
      this.coins.callAll(
          'animations.add',
          'animations',
          'spin',
          [0, 1, 2, 3, 4, 5],
          10,
          true
      );
      this.coins.callAll('animations.play', 'animations', 'spin');
    }

    update () {
      this.physics.arcade.collide(this.coins);
    }

    render () {
    }
  }
})();
