(() => {
  'use strict';

  let game;

  window.onload = () => {
    game = new NewGame();
  };

  class NewGame extends ErtaoGame {
    constructor () {
      super(800, 600, Phaser.AUTO);
      this.state.add('PlayGame', PlayGame);
      this.state.start('PlayGame');
    }
  }

  class PlayGame extends ErtaoGameState {
    constructor () {
      super();
    }

    preload () {
      super.preload();
      //
      this.world.setBounds(0, 0, 1280, 800);
      //
      this.load.image('ground', '/assets/tests/ground-2x.png');
      this.load.image('river', '/assets/tests/river-2x.png');
      this.load.image('sky', '/assets/tests/sky-2x.png');
      this.load.image('cloud0', '/assets/tests/cloud-big-2x.png');
      this.load.image('cloud1', '/assets/tests/cloud-narrow-2x.png');
      this.load.image('cloud2', '/assets/tests/cloud-small-2x.png');
      //
      this.load.spritesheet('ufo', '/assets/sprites/ufo.png', 24, 21);
    }

    create () {
      this.skyLayer = this.add.group();
      this.skyLayer.z = 0;
      //
      this.cloudLayer = this.add.group();
      this.cloudLayer.z = 1;
      //
      this.groundLayer = this.add.group();
      this.groundLayer.z = 2;
      //
      this.spriteLayer = this.add.group();
      this.spriteLayer.z = 3;
      //
      this.riverLayer = this.add.group();
      this.riverLayer.z = 4;
      //
      this.sky = new Phaser.Sprite(this.game, 0, 0, 'sky');
      this.skyLayer.add(this.sky);
      //
      this.cloud0 = new Phaser.Sprite(this.game, 200, 120, 'cloud0');
      this.cloud1 = new Phaser.Sprite(this.game, -60, 120, 'cloud1');
      this.cloud2 = new Phaser.Sprite(this.game, 900, 170, 'cloud2');
      //
      this.cloudLayer.add(this.cloud0);
      this.cloudLayer.add(this.cloud1);
      this.cloudLayer.add(this.cloud2);
      //
      this.ground = new Phaser.Sprite(this.game, 0, 360, 'ground');
      this.groundLayer.add(this.ground);
      //
      this.river = new Phaser.Sprite(this.game, 0, 400, 'river');
      this.riverLayer.add(this.river);
      //
      this.ufo = new Phaser.Sprite(this.game, 360, 240, 'ufo');
      this.ufo.anchor.setTo(0.5, 0.5);
      this.spriteLayer.add(this.ufo);
    }

    update () {
    }

    render () {
      this.game.debug.text('sky layer:      z = 0', 16, 20);
      this.game.debug.text('cloud layer:    z = 1', 16, 36);
      this.game.debug.text('ground layer:   z = 2', 16, 52);
      this.game.debug.text('sprite layer:   z = 3', 16, 68);
      this.game.debug.text('river layer:    z = 4', 16, 84);
    }
  }
})();
