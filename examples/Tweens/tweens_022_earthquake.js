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
    }

    preload () {
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.scale.pageAlignHorizontally = true;
      this.scale.pageAlignVertically = true;
      //
      this.game.load.image('tile', '/assets/sprites/p2.jpeg');
      this.game.load.spritesheet(
          'monster',
          '/assets/sprites/pixi_monsters.png',
          154,
          170
      );
    }

    create () {
      let margin = 50;
      let x = -margin;
      let y = -margin;
      let w = this.game.world.width + margin * 2;
      let h = this.game.world.height + margin * 2;
      //
      this.game.world.setBounds(x, y, w, h);
      //
      this.game.world.camera.position.set(0);
      //
      this.game.add.tileSprite(x, y, w, h, 'tile');
      this.game.add.sprite(100, 100, 'monster', 0);
      this.game.add.sprite(500, 100, 'monster', 0);
      this.game.add.sprite(100, 400, 'monster', 0);
      this.game.add.sprite(500, 400, 'monster', 0);
      //
      this.addQuake();
    }

    update () {
    }

    render () {
    }

    addQuake () {
      let rumbleOffset = 10;
      let properties = {x: this.game.camera.x - rumbleOffset};
      let duration = 100;
      let repeat = 4;
      let ease = Phaser.Easing.Bounce.InOut;
      let autoStart = false;
      let delay = 1000;
      let yoyo = true;
      let quake = this.game.add
          .tween(this.game.camera)
          .to(properties, duration, ease, autoStart, delay, repeat, yoyo);
      quake.onComplete.addOnce(this.addQuake, this);
      quake.start();
    }
  }
})();
