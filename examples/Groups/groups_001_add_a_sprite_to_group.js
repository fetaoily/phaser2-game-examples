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
      this.friendAndFoe = null;
      this.enemies = null;
    }

    preload () {
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.scale.pageAlignHorizontally = true;
      this.scale.pageAlignVertically = true;
      //
      this.load.image('ufo', '/assets/sprites/ufo.png');
      this.load.image('baddie', '/assets/sprites/space-baddie.png');
    }

    create () {
      this.friendAndFoe = this.add.group();
      //
      this.enemies = this.add.group();
      //
      for (let i = 0; i < 16; i++) {
        this.enemies.create(
            360 + Math.random() * 200,
            120 + Math.random() * 200,
            'baddie'
        );
      }
      //
      this.ufo = this.add.sprite(200, 240, 'ufo');
      //
      this.friendAndFoe.add(this.ufo);
    }

    update () {
    }

    render () {
    }
  }
})();
