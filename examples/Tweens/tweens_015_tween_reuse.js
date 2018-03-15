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
      this.sprites = null;
      this.tween = null;
    }

    preload () {
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.scale.pageAlignHorizontally = true;
      this.scale.pageAlignVertically = true;
      //
      this.game.load.image('beball', '/assets/sprites/beball1.png');
      this.game.load.image('bikkuriman', '/assets/sprites/bikkuriman.png');
      this.game.load.image(
          'darkwing_crazy',
          '/assets/sprites/darkwing_crazy.png'
      );
    }

    create () {
      this.game.stage.setBackgroundColor('#2384e7');
      //
      this.sprites = this.game.add.group();
      this.sprites.create(100, 100, 'beball');
      this.sprites.create(200, 100, 'bikkuriman');
      this.sprites.create(300, 100, 'darkwing_crazy');
      this.sprites.create(400, 100, 'beball');
      this.sprites.create(500, 100, 'bikkuriman');
      this.sprites.create(600, 100, 'darkwing_crazy');
      //
      this.tween = this.game.add
          .tween(this.sprites.cursor)
          .to({y: 500}, 2000, Phaser.Easing.Bounce.Out, true);
      this.tween.onComplete.add(this.tween2, this);
    }

    update () {
    }

    render () {
    }

    tween2 () {
      this.sprites.next();
      this.tween = this.game.add
          .tween(this.sprites.cursor)
          .to({alpha: 0}, 2000, Phaser.Easing.Bounce.Out, true);
      this.tween.onComplete.add(this.tween3, this);
    }

    tween3 () {
      this.sprites.next();
      this.tween = this.game.add.tween(this.sprites.cursor.scale).to(
          {
            x: 2,
            y: 2
          },
          2000,
          Phaser.Easing.Bounce.Out,
          true
      );
      this.tween.onComplete.add(this.tween4, this);
    }

    tween4 () {
      this.sprites.next();
      this.tween = this.game.add
          .tween(this.sprites.cursor)
          .to({x: 500, alpha: 0.2}, 2000, Phaser.Easing.Bounce.Out, true);
      this.tween.onComplete.add(this.tween5, this);
    }

    tween5 () {
      this.sprites.next();
      this.tween = this.game.add
          .tween(this.sprites.cursor)
          .to({x: 100}, 200, Phaser.Easing.Bounce.Out, true);
      this.tween.onComplete.add(this.tween6, this);
    }

    tween6 () {
      this.sprites.next();
      this.tween = this.game.add
          .tween(this.sprites.cursor)
          .to({x: 300, y: 400}, 2000, Phaser.Easing.Bounce.Out, true);
    }
  }
})();
