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
      this.scale.pageAlignHorizontally = true;
      this.scale.pageAlignVertically = true;
      //
      this.load.image(
          'pic',
          '/assets/pics/TheBrightestLightComesFromTheDarkestPlace_by_Slayer_Ghostown.png'
      );
    }

    create () {
      this.pic = this.add.image(
          this.game.world.centerX,
          this.game.world.centerY,
          'pic'
      );
      this.pic.anchor.set(0.5);
      this.pic.alpha = 0.1;
      //
      this.text = this.add.text(this.game.world.centerX, 100, '2000ms delay', {
        font: '32px Arial',
        fill: '#ff0044'
      });
      this.text.anchor.set(0.5);
      //
      let tween = this.add
          .tween(this.pic)
          .to({alpha: 1}, 2000, 'Linear', true, 2000);
      //
      tween.onStart.add(this.started, this);
      tween.onComplete.add(this.completed, this);
    }

    update () {
    }

    render () {
    }

    started () {
      this.text.text = 'tween started';
    }

    completed () {
      this.text.text = 'tween complete';
    }
  }
})();
