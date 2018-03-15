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
      this.arrowStart = null;
      this.arrowEnd = null;
      this.sprite = null;
    }

    preload () {
      this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.game.scale.pageAlignHorizontally = true;
      this.game.scale.pageAlignVertically = true;
      //
      this.game.load.image('phaser', '/assets/sprites/phaser1.png');
      this.game.load.spritesheet(
          'arrows',
          '/assets/sprites/arrows.png',
          23,
          31
      );
    }

    create () {
      this.game.stage.setBackgroundColor('#2384e7');
      //
      this.arrowStart = this.game.add.sprite(100, 100, 'arrows', 0);
      this.arrowEnd = this.game.add.sprite(400, 100, 'arrows', 1);
      this.sprite = this.game.add.sprite(100, 164, 'phaser');
      this.sprite.inputEnabled = true;
      this.sprite.events.onInputDown.add(this.move, this);
    }

    update () {
    }

    render () {
      if (this.sprite.x === 100 || this.sprite.x === 400) {
        this.game.debug.text('Click Sprite to tween', 32, 32);
      }
      this.game.debug.text(
          'x: ' + this.arrowStart.x,
          this.arrowStart.x,
          this.arrowStart.y - 4
      );
      this.game.debug.text(
          'x: ' + this.arrowEnd.x,
          this.arrowEnd.x,
          this.arrowEnd.y - 4
      );
    }

    move () {
      if (this.sprite.x === 100) {
        this.game.add
            .tween(this.sprite)
            .to({x: '+300'}, 2000, Phaser.Easing.Linear.None, true);
      } else if (this.sprite.x === 400) {
        this.game.add
            .tween(this.sprite)
            .to({x: '-300'}, 2000, Phaser.Easing.Linear.None, true);
      }
    }
  }
})();
