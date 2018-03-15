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
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.scale.pageAlignhorizontally = true;
      this.scale.pageAlignVertically = true;
      //
      this.game.load.spritesheet(
          'shadow',
          '/assets/tests/tween/shadow.png',
          138,
          15
      );
      this.game.load.spritesheet(
          'phaser',
          '/assets/tests/tween/phaser.png',
          70,
          90
      );
    }

    create () {
      let item;
      let shadow;
      let tween;
      this.game.stage.setBackgroundColor('#ffffff');
      for (let i = 0; i < 6; i++) {
        shadow = this.game.add.sprite(190 + 69 * i, 284, 'shadow');
        shadow.scale.setTo(0.0, 0.0);
        shadow.anchor.setTo(0.5, 0.5);
        //
        this.game.add
            .tween(shadow.scale)
            .to({x: 1.0, y: 1.0}, 2400, Phaser.Easing.Bounce.Out, true);
        //
        item = this.game.add.sprite(190 + 69 * i, -50, 'phaser', i);
        item.anchor.setTo(0.5, 0.5);
        //
        tween = this.game.add
            .tween(item)
            .to({y: 245}, 2400, Phaser.Easing.Bounce.Out, true);
      }
    }

    update () {
    }

    render () {
    }
  }
})();
