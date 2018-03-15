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
      this.sprite = null;
      this.tween = null;
    }

    preload () {
      this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.game.scale.pageAlignHorizontally = true;
      this.game.scale.pageAlignVertically = true;
      //
      this.game.load.image('bikkurman', '/assets/sprites/bikkuriman.png');
    }

    create () {
      this.game.stage.setBackgroundColor('#2348e7');
      //
      this.sprite = this.game.add.sprite(400, 100, 'bikkurman');
      //
      this.tween = this.game.add
          .tween(this.sprite)
          .to({y: 500}, 2000, 'Linear', true);
      //
      this.tween.onComplete.addOnce(this.tween2, this);
    }

    update () {
    }

    render () {
    }

    tween2 () {
      this.tween.to({alpha: 0.5}, 2000, 'Linear', true);
      this.tween.onComplete.addOnce(this.tween3, this);
    }

    tween3 () {
      this.tween.to({x: 2, y: 2}, 2000, 'Linear', true);
      this.tween.onComplete.addOnce(this.tween4, this);
    }

    tween4 () {
      this.tween.to({y: 500, alpha: 1}, 2000, 'Linear', true);
      this.tween.onComplete.addOnce(this.tween5, this);
    }

    tween5 () {
      this.tween.to({x: 400, y: 100, alpha: 1}, 2000, 'Linear', true);
      this.tween.onComplete.addOnce(this.tween2, this);
    }
  }
})();
