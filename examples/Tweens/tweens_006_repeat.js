(() => {
  'use strict';
  let game;

  window.onload = () => {
    game = new NewGame();
  };

  class NewGame extends Phaser.Game {
    constructor() {
      super(800, 600, Phaser.AUTO);
      this.state.add('PlayGame', PlayGame);
      this.state.start('PlayGame');
    }
  }

  class PlayGame extends Phaser.State {
    constructor() {
      super();
    }

    preload() {
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.scale.pageAlignHorizontally = true;
      this.scale.pageAlignVertically = true;
      //
      this.load.image('space', '/assets/misc/starfield.jpg');
      this.load.image('logo', '/assets/sprites/phaser2.png');
    }

    create() {
      this.game.add.tileSprite(0, 0, 800, 600, 'space');
      //
      this.sprite = this.game.add.sprite(
        this.world.centerX,
        this.world.centerY,
        'logo'
      );
      this.sprite.anchor.setTo(0.5, 0.5);
      this.sprite.alpha = 0;
      //
      this.tweens = this.game.add
        .tween(this.sprite)
        .to({ alpha: 1 }, 2000, 'Linear', true);
      this.tweens.repeat(10, 1000);
    }

    update() {}

    render() {}
  }
})();
