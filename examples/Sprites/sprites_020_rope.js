(() => {
  'use strict';
  let game;

  window.onload = () => {
    game = new NewGame();
  };

  class NewGame extends ErtaoGame {
    constructor() {
      super(800, 600, Phaser.AUTO);
      this.state.add('PlayGame', PlayGame);
      this.state.start('PlayGame');
    }
  }

  class PlayGame extends ErtaoGameState {
    constructor() {
      super();
      this.rope = null;
      this.debugKey = null;
      this.shouldDebug = false;
      //
      this.count = 0;
      this.length = 918 / 20;
      this.points = [];
    }

    preload() {
      super.preload();
      //
      this.load.image('snake', '/assets/sprites/snake.png');
    }

    create() {
      //
      for (let i = 0; i < 20; i++) {
        this.points.push(new Phaser.Point(i * this.length, 0));
      }
      //
      this.rope = this.add.rope(
        32,
        this.game.world.centerY,
        'snake',
        null,
        this.points
      );
      this.rope.scale.set(0.8);
      //
      this.rope.updateAnimation = () => {
        this.count += 0.1;
        for (let i = 0; i < this.points.length; i++) {
          this.points[i].y = Math.sin(i * 0.5 + this.count) * 20;
        }
      };
      //
      this.debugKey = this.input.keyboard.addKey(Phaser.Keyboard.D);
      this.debugKey.onDown.add(this.toggleDebug, this);
    }

    update() {}

    render() {
      if (this.shouldDebug) {
        this.game.debug.ropeSegments(this.rope);
      }
      this.game.debug.text('(D) to show debug', 20, 32);
    }

    toggleDebug() {
      this.shouldDebug = !this.shouldDebug;
    }
  }
})();
