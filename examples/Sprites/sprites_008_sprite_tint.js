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
      this.sprite = null;
    }

    preload() {
      super.preload();
      //
      this.load.atlas(
        'atlas',
        '/assets/sprites/seacreatures_json.png',
        '/assets/sprites/seacreatures_json.json'
      );
    }

    create() {
      this.sprite = this.add.sprite(
        this.world.centerX,
        this.world.centerY,
        'atlas',
        'greenJellyfish0000'
      );
      this.sprite.anchor.set(0.5);
      this.sprite.tint = Math.random() * 0xffffff;
      //
      this.input.onDown.add(this.changeTint, this);
    }

    update() {
      this.sprite.rotation += 0.02;
    }

    render() {}

    changeTint() {
      this.sprite.tint = Math.random() * 0xffffff;
    }
  }
})();
