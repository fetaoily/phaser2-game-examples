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
      this.ufo = null;
      this.Keys = Phaser.Keyboard;
      this.speed = 4;
      this.style = 'default';
      this.cursors = null;
    }

    preload () {
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.scale.pageAlignHorizontally = true;
      this.scale.pageAlignVertically = true;
      //
      this.load.image('ground', 'assets/tests/ground-2x.png');
      this.load.image('river', 'assets/tests/river-2x.png');
      this.load.image('sky', 'assets/tests/sky-2x.png');
      this.load.image('cloud0', 'assets/tests/cloud-big-2x.png');
      this.load.image('cloud1', 'assets/tests/cloud-narrow-2x.png');
      this.load.image('cloud2', 'assets/tests/cloud-small-2x.png');
      this.load.image('ufo', 'assets/sprites/ufo.png');
      this.load.image('baddie', 'assets/sprites/space-baddie.png');
      this.load.spritesheet(
          'button',
          'assets/buttons/follow-style-button.png',
          224,
          70
      );
    }

    create () {
      this.world.setBounds(0, 0, 1400, 1400);
      for (let i = 0; i < 10; i++) {
        this.add.sprite(this.world.randomX, this.world.randomY, 'baddie');
      }
      //
      this.add.tileSprite(0, 0, 1400, 600, 'sky');
      this.add.sprite(0, 360, 'ground');
      this.add.sprite(0, 400, 'river');
      this.add.sprite(200, 120, 'cloud0');
      this.add.sprite(-60, 120, 'cloud1');
      this.add.sprite(900, 170, 'cloud2');
      //
      this.ufo = this.add.sprite(300, 240, 'ufo');
      this.ufo.anchor.setTo(0.5, 0.5);
      //
      this.camera.follow(this.ufo);
      //
      this.btn0 = this.add.button(
          6,
          40,
          'button',
          this.lockonFollow,
          this,
          0,
          0,
          0
      );
      this.btn1 = this.add.button(
          6,
          120,
          'button',
          this.platformerFollow,
          this,
          1,
          1,
          1
      );
      this.btn2 = this.add.button(
          6,
          200,
          'button',
          this.topdownFollow,
          this,
          2,
          2,
          2
      );
      this.btn3 = this.add.button(
          6,
          280,
          'button',
          this.topdownTightFollow,
          this,
          3,
          3,
          3
      );
      //
      this.cursors = this.input.keyboard.createCursorKeys();
    }

    update () {
      if (this.cursors.left.isDown) {
        this.ufo.x -= this.speed;
        this.ufo.angle = -15;
      } else if (this.cursors.right.isDown) {
        this.ufo.x += this.speed;
        this.ufo.angle = 15;
      } else if (this.cursors.up.isDown) {
        this.ufo.y -= this.speed;
      } else if (this.cursors.down.isDown) {
        this.ufo.y += this.speed;
      } else {
        this.ufo.angle = 0;
      }
    }

    render () {
      this.game.debug.text('Click buttons to switch follow styles', 32, 32);
      this.game.debug.text('Current style: ' + this.style, 32, 64);
    }

    lockonFollow () {
      this.camera.follow(this.ufo, Phaser.Camera.FOLLOW_LOCKON);
      this.style = 'STYLE_LOCKON';
    }

    platformerFollow () {
      this.camera.follow(this.ufo, Phaser.Camera.FOLLOW_PLATFORMER);
      this.style = 'STYLE_PLATFORMER';
    }

    topdownFollow () {
      this.camera.follow(this.ufo, Phaser.Camera.FOLLOW_TOPDOWN);
      this.style = 'STYLE_TOPDOWN';
    }

    topdownTightFollow () {
      this.camera.follow(this.ufo, Phaser.Camera.FOLLOW_TOPDOWN_TIGHT);
      this.style = 'STYLE_TOPDOWN_TIGHT';
    }
  }
})();
