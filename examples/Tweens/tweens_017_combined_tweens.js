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
      this.mushroom = null;
      this.pig = null;
      this.pigArrives = null;
      this.s = null;
      this.e = null;
    }

    preload () {
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.scale.pageAlignHorizontally = true;
      this.scale.pageAlignVertically = true;
      //
      this.game.load.spritesheet(
          'pig',
          '/assets/sprites/invaderpig.png',
          124,
          104
      );
      this.game.load.image('starfield', '/assets/misc/starfield.jpg');
      this.game.load.image('mushroom', '/assets/sprites/mushroom2.png');
    }

    create () {
      this.game.add.tileSprite(0, 0, 800, 600, 'starfield');
      //
      this.pig = this.game.add.sprite(-50, 200, 'pig', 1);
      this.pig.scale.setTo(0.5, 0.5);
      //
      this.mushroom = this.game.add.sprite(380, 200, 'mushroom');
      this.mushroom.anchor.setTo(0.5, 0.5);
      //
      this.pigArrives = this.game.add.tween(this.pig);
      this.pigArrives.to({x: 150}, 1000, Phaser.Easing.Bounce.Out);
      this.pigArrives.onComplete.add(this.firstTween, this);
      this.pigArrives.start();
    }

    update () {
    }

    render () {
    }

    firstTween () {
      this.s = this.game.add.tween(this.mushroom.scale);
      this.s.to({x: 2, y: 2}, 1000, Phaser.Easing.Linear.None);
      this.s.onComplete.addOnce(this.theEnd, this);
      this.s.start();
    }

    theEnd () {
      this.e = this.game.add.tween(this.pig);
      this.e.to({x: -150}, 1000, Phaser.Easing.Bounce.Out);
      this.e.start();
    }
  }
})();
