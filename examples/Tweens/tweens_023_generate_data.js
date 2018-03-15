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
      this.bugs = null;
      this.index = 0;
      this.data = null;
      this.pos = [];
    }

    preload () {
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.scale.pageAlignHorizontally = true;
      this.scale.pageAlignVertically = true;
      //
      this.game.load.image('wasp', '/assets/sprites/wasp.png');
      this.game.load.image('sky', '/assets/skies/cavern1.png');
    }

    create () {
      this.game.add.image(0, 0, 'sky');
      //
      let tweenData = {x: 0, y: 0};
      //
      this.tween = this.game.make
          .tween(tweenData)
          .to({x: 100, y: 400}, 2000, 'Sine.easeInOut');
      this.tween.yoyo(true);
      //
      this.data = this.tween.generateData(60);
      //
      this.bugs = this.game.add.group();
      //
      this.pos.push(new Phaser.Point(32, 0));
      this.pos.push(new Phaser.Point(300, 100));
      this.pos.push(new Phaser.Point(600, 70));
      //
      this.bugs.create(this.pos[0].x, this.pos[0].y, 'wasp');
      this.bugs.create(this.pos[1].x, this.pos[1].y, 'wasp');
      this.bugs.create(this.pos[2].x, this.pos[2].y, 'wasp');
    }

    update () {
      this.bugs.getAt(0).x = this.pos[0].x + this.data[this.index].x;
      this.bugs.getAt(0).y = this.pos[0].y + this.data[this.index].y;
      //
      this.bugs.getAt(1).x = this.pos[1].x + this.data[this.index].x / 2;
      this.bugs.getAt(1).y = this.pos[1].y + this.data[this.index].y;
      //
      this.bugs.getAt(2).x = this.pos[2].x - this.data[this.index].x;
      this.bugs.getAt(2).y = this.pos[2].y + this.data[this.index].y;
      //
      this.index++;
      if (this.index === this.data.length) {
        this.index = 0;
      }
    }

    render () {
    }
  }
})();
