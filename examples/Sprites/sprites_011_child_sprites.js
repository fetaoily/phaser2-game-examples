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
      this.load.image('mushroom', '/assets/sprites/mushroom2.png');
      this.load.spritesheet(
        'mummy',
        '/assets/sprites/metalslug_mummy37x45.png',
        37,
        45,
        18
      );
    }

    create() {
      this.parent = this.add.sprite(100, 100, 'mushroom');
      this.parent.addChild(this.make.sprite(-50, -50, 'mummy'));
      this.parent.addChild(this.make.sprite(100, 0, 'mummy'));
      this.parent.addChild(this.make.sprite(200, 200, 'mummy'));
      //
      this.child = this.parent.addChild(this.make.sprite(0, 100, 'mummy'));
    }

    update() {
      this.parent.x += 0.1;
      this.child.x += 0.1;
    }

    render() {
      this.game.debug.text(this.parent.width, 32, 32);
      this.game.debug.geom(this.parent.getBounds());
      //
      this.game.debug.spriteBounds(this.parent);
    }
  }
})();
