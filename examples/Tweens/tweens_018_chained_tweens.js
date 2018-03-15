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
      this.text = null;
      this.tweenA = null;
      this.tweenB = null;
    }

    preload () {
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.scale.pageAlignHorizontally = true;
      this.scale.pageAlignVertically = true;
      //
      this.game.load.image('kirito', '/assets/sprites/kirito_by_vali233.png');
      this.game.load.image('asuna', '/assets/sprites/asuna_by_vali233.png');
    }

    create () {
      this.game.stage.setBackgroundColor('#124184');
      //
      this.game.add.text(16, 16, 'Tween Chain Demo', {
        font: '16px Arial',
        fill: '#ffffff'
      });
      this.text = this.game.add.text(680, 16, 'Click to Start', {
        font: '16px Arial',
        fill: '#ffffff'
      });
      //
      this.spriteA = this.game.add.sprite(64, 100, 'kirito');
      this.spriteB = this.game.add.sprite(64, 300, 'asuna');
      //
      this.tweenA = this.game.add
          .tween(this.spriteA)
          .to({x: 600}, 2000, 'Quart.easeOut');
      this.tweenB = this.game.add
          .tween(this.spriteB)
          .to({x: 600}, 2000, 'Quart.easeOut');
      //
      this.tweenA.chain(this.tweenB);
      //
      this.game.input.onDown.addOnce(this.start, this);
    }

    update () {
    }

    render () {
    }

    start () {
      this.tweenA.start();
      this.text.visible = false;
    }
  }
})();
