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
      this.arrow1 = null;
      this.arrow2 = null;
      this.arrow3 = null;
      this.arrow4 = null;
    }

    preload() {
      super.preload();
      //
      this.load.image('arrow', '/assets/sprites/arrow.png');
    }

    create() {
      this.stage.setBackgroundColor('#3e5f96');
      //
      this.arrow1 = this.add.sprite(200, 150, 'arrow');
      this.arrow1.pivot.x = 100;
      //
      this.arrow2 = this.add.sprite(600, 150, 'arrow');
      this.arrow2.pivot.y = 100;
      //
      this.arrow3 = this.add.sprite(200, 450, 'arrow');
      this.arrow3.pivot.x = 100;
      this.arrow3.pivot.y = 100;
      //
      this.arrow4 = this.add.sprite(600, 450, 'arrow');
      this.arrow4.pivot.x = 100;
      this.arrow4.anchor.set(0.5);
    }

    update() {
      this.arrow1.rotation += 0.05;
      this.arrow2.rotation += 0.05;
      this.arrow3.rotation += 0.05;
      this.arrow4.rotation += 0.05;
    }

    render() {
      this.game.debug.geom(
        new Phaser.Point(this.arrow1.x, this.arrow1.y),
        '#ffff00'
      );
      this.game.debug.geom(
        new Phaser.Point(this.arrow2.x, this.arrow2.y),
        '#ff0000'
      );
      this.game.debug.geom(
        new Phaser.Point(this.arrow3.x, this.arrow3.y),
        '#00ff00'
      );
      this.game.debug.geom(
        new Phaser.Point(this.arrow4.x, this.arrow4.y),
        '#0000ff'
      );
    }
  }
})();
