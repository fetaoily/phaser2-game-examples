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
      this.timer = 0;
      this.total = 0;
    }

    preload() {
      super.preload();
      //
      this.load.spritesheet(
        'mummy',
        '/assets/sprites/metalslug_mummy37x45.png',
        37,
        45,
        18
      );
    }

    create() {
      this.releaseMummy();
    }

    update() {
      if (this.total < 200 && this.game.time.now > this.timer) {
        this.releaseMummy();
      }
    }

    render() {}

    releaseMummy() {
      let mummy = this.add.sprite(
        -(Math.random() * 800),
        this.world.randomY,
        'mummy'
      );
      mummy.scale.setTo(2, 2);
      mummy.angle = this.game.rnd.angle();
      //
      mummy.animations.add('walk');
      mummy.animations.play('walk', 20, true);
      //
      this.add
        .tween(mummy)
        .to(
          { x: this.game.width + (16000 + mummy.x) },
          20000,
          Phaser.Easing.Linear.None,
          true
        );
      //
      this.total++;
      this.timer = this.game.time.now + 100;
    }
  }
})();
