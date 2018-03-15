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
    }

    preload () {
      this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.game.scale.pageAlignHorizontally = true;
      this.game.scale.pageAlignVertically = true;
      //
      this.game.load.image('space', '/assets/misc/starfield.png', 138, 15);
      this.game.load.image('logo', '/assets/sprites/phaser2.png');
    }

    create () {
      this.game.add.tileSprite(0, 0, 800, 600, 'space');
      //
      this.sprite = this.game.add.sprite(
          this.game.world.centerX,
          this.game.world.centerY,
          'logo'
      );
      this.sprite.anchor.setTo(0.5, 0.5);
      this.sprite.alpha = 0;
      //
      this.game.add
          .tween(this.sprite)
          .to({alpha: 1}, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);
    }

    update () {
    }

    render () {
    }
  }
})();
