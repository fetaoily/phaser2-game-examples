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
      this.load.image('plane', '/assets/misc/boss1.png');
      this.load.image('sky', '/assets/tests/sky-2x.png');
    }

    create() {
      this.add.sprite(0, 0, 'sky');
      //
      let mx = this.game.width - this.cache.getImage('plane').width;
      let my = this.game.height - this.cache.getImage('plane').height;
      //
      for (let i = 0; i < 5; i++) {
        let sprite = this.add.sprite(
          this.game.rnd.integerInRange(0, mx),
          this.game.rnd.integerInRange(0, my),
          'plane'
        );
        sprite.inputEnabled = true;
        sprite.input.useHandCursor = true;
        sprite.events.onInputDown.add(this.destroySprite, this);
      }
    }

    update() {}

    render() {}

    destroySprite(sprite) {
      sprite.destroy();
    }
  }
})();
