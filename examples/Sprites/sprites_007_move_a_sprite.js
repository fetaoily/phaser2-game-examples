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
      this.s = null;
    }

    preload() {
      super.preload();
      //
      this.load.atlasJSONHash(
        'bot',
        '/assets/sprites/running_bot.png',
        '/assets/sprites/running_bot.json'
      );
    }

    create() {
      this.s = this.add.sprite(this.world.centerX, this.world.centerY, 'bot');
      this.s.anchor.setTo(0.5, 0.5);
      this.s.scale.setTo(2, 2);
      //
      this.s.animations.add('run');
      this.s.animations.play('run', 10, true);
    }

    update() {
      if (this.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
        this.s.x -= 4;
      } else if (this.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
        this.s.x += 4;
      }
      //
      if (this.input.keyboard.isDown(Phaser.Keyboard.UP)) {
        this.s.y -= 4;
      } else if (this.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
        this.s.y += 4;
      }
    }

    render() {
      this.game.debug.spriteInfo(this.s, 20, 32);
    }
  }
})();
