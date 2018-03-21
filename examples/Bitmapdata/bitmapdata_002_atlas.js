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
      this.bmd = null;
      this.jellyfish = null;
    }

    preload() {
      super.preload();
      //
      this.load.atlas(
        'seacreatures',
        '/assets/sprites/seacreatures_json.png',
        '/assets/sprites/seacreatures_json.json'
      );
    }

    create() {
      this.bmd = this.make.bitmapData(800, 600);
      //
      this.add.image(0, 0, this.bmd);
      //
      this.jellyfish = this.add.sprite(
        0,
        0,
        'seacreatures',
        'bulueJellyfish0010'
      );
      this.jellyfish.animations.add(
        'swim',
        Phaser.Animation.generateFrameNames('blueJellyfish', 0, 32, '', 4),
        30,
        true
      );
      this.jellyfish.animations.play('swim');
    }

    update() {
      if (this.input.activePointer.isDown) {
        this.bmd.draw(
          this.jellyfish,
          this.input.activePointer.position.x,
          this.input.activePointer.position.y
        );
      }
    }

    render() {}
  }
})();
