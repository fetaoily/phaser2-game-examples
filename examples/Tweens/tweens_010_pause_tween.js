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
      this.p = null;
      this.tween = null;
      this.button = null;
      this.flag = true;
    }

    preload () {
      this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.game.scale.pageAlignHorizontally = true;
      this.game.scale.pageAlignVertically = true;
      //
      this.game.load.image('diamond', '/assets/sprites/diamond.png');
      this.game.load.spritesheet(
          'button',
          '/assets/buttons/button_sprite_sheet.png',
          193,
          71
      );
    }

    create () {
      this.game.stage.setBackgroundColor(0x2d2d2d);
      //
      this.p = this.game.add.sprite(100, 100, 'diamond');
      //
      this.tween = this.game.add
          .tween(this.p)
          .to({x: 600}, 4000, Phaser.Easing.Linear.None, true, 0, 1000, true);
      //
      this.button = this.game.add.button(
          this.game.world.centerX,
          400,
          'button',
          this.actionOnClick,
          this,
          2,
          1,
          0
      );
    }

    update () {
    }

    render () {
    }

    actionOnClick () {
      if (this.flag) {
        this.tween.pause();
      } else {
        this.tween.resume();
      }
      this.flag = !this.flag;
    }
  }
})();
