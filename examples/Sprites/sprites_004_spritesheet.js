(() => {
  'use strict';
  let game;

  window.onload = () => {
    game = new NewGame();
  };

  class NewGame extends ErtaoGame {
    constructor() {
      super(800, 600, Phaser.AUTO);
      this.state.add('PlayGame', PlayGame);
      this.state.start('PlayGame');
    }
  }

  class PlayGame extends ErtaoGameState {
    constructor() {
      super();
    }

    preload() {
      super.preload();
      //
      this.load.spritesheet(
        'ms',
        '/assets/sprites/metalslug_mummy37x45.png',
        37,
        45,
        18
      );
    }

    create() {
      this.sprite = this.add.sprite(40, 100, 'ms');
      this.sprite.animations.add('walk');
      this.sprite.animations.play('walk', 50, true);
      //
      this.add
        .tween(this.sprite)
        .to({ x: this.game.width }, 10000, Phaser.Easing.Linear.None, true);
    }

    update() {
      if (this.sprite.x >= 300) {
        this.sprite.scale.x += 0.01;
        this.sprite.scale.y += 0.01;
      }
    }

    render() {}
  }
})();
