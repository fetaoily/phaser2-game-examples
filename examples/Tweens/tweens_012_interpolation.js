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
      this.logo = null;
      this.text = null;
      this.tween = null;
      this.method = 0;
    }

    preload () {
      this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.game.scale.pageAlignHorizontally = true;
      this.game.scale.pageAlignVertically = true;
      //
      this.load.image('logo', '/assets/sprites/phaser2.png');
    }

    create () {
      this.logo = this.game.add.sprite(0, 0, 'logo');
      this.logo.scale.set(0.5);
      //
      this.style = {font: '48px Arial', fill: '#ff0044', align: 'center'};
      this.text = this.game.add.text(
          this.game.world.centerX,
          this.game.world.centerY,
          'Linear Interpolation',
          this.style
      );
      this.text.anchor.set(0.5);
      //
      let w = this.game.width - this.logo.width;
      let h = this.game.height - this.logo.height;
      //
      this.tween = this.game.add
          .tween(this.logo)
          .to(
              {x: [w, w, 0, 0], y: [0, h, h, 0]},
              4000,
              'Sine.easeInOut',
              true,
              0,
              -1,
              false
          );
      this.tween.onLoop.add(this.changeMethod, this);
    }

    update () {
    }

    render () {
    }

    changeMethod () {
      this.method++;
      if (this.method === 1) {
        this.tween.interpolation(Phaser.Math.bezierInterpolation);
        this.text.text = 'Bezier Interpolation';
      } else if (this.method === 2) {
        this.tween.interpolation(Phaser.Math.catmullRomInterpolation);
        this.text.text = 'CatumllRom Interpolation';
      } else if (this.method === 3) {
        this.method = 0;
        this.tween.interpolation(Phaser.Math.linearInterpolation);
        this.text.text = 'Linear Interpolation';
      }
    }
  }
})();
