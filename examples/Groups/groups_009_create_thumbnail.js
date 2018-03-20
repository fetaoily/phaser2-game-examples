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
      this.stage_1 = null;
      this.thumbnail = null;
      //
      this.text1 = null;
      this.text2 = null;
    }

    preload () {
      super.preload();
      //
      this.load.image('sky', '/assets/skies/sky1.png');
      this.load.image('sonic', '/assets/sprites/sonic_havok_sanity.png');
      this.load.image('clown', '/assets/sprites/clown.png');
      this.load.image('leaf', '/assets/particles/leaf1.png');
      this.load.image('mushroom', '/assets/sprites/mushroom2.png');
      //
      this.load.spritesheet('coin', '/assets/sprites/coin.png', 32, 32);
      this.load.bitmapFont(
          'desyrel',
          '/assets/fonts/bitmapFonts/desyrel.png',
          '/assets/fonts/bitmapFonts/desyrel.xml'
      );
      this.load.bitmapFont(
          'stack',
          '/assets/fonts/bitmapFonts/shortstack.png',
          '/assets/fonts/bitmapFonts/shortStack.xml'
      );
    }

    create () {
      this.stage_1 = this.make.bitmapData(800, 600);
      //
      this.thumbnail = this.make.bitmapData(204, 154);
      //
      let thumbContainer = this.make.sprite(590, 10, this.thumbnail);
      //
      this.stage.addChild(thumbContainer);
      //
      this.add.image(0, 0, 'sky');
      //
      this.graphics = this.add.graphics(100, 100);
      //
      this.graphics.beginFill(0xff3300);
      this.graphics.lineStyle(10, 0xffd900, 1);
      this.graphics.lineTo(250, 50);
      this.graphics.lineTo(100, 100);
      this.graphics.lineTo(250, 220);
      this.graphics.lineTo(50, 220);
      this.graphics.lineTo(50, 50);
      this.graphics.endFill();
      //
      this.graphics.lineStyle(10, 0xff0000, 0.8);
      this.graphics.beginFill(0xff700b, 1);
      this.graphics.moveTo(450, 320);
      this.graphics.lineTo(570, 350);
      this.graphics.quadraticCurveTo(600, 0, 480, 100);
      this.graphics.lineTo(330, 120);
      this.graphics.lineTo(410, 200);
      this.graphics.lineTo(210, 300);
      this.graphics.endFill();
      //
      this.coins = this.add.group();
      //
      for (let i = 0; i < 20; i++) {
        this.coins.create(this.world.randomX, this.world.randomY, 'coin', 0);
      }
      //
      this.coins.callAll(
          'animations.add',
          'animations',
          'spin',
          [0, 1, 2, 3, 4, 5],
          10,
          true
      );
      this.coins.callAll('animations.play', 'animations', 'spin');
      //
      this.emitter = this.add.emitter(this.world.centerX, 0, 100);
      this.emitter.makeParticles('leaf');
      this.emitter.minParticleSpeed.setTo(-300, 30);
      this.emitter.maxParticleSpeed.setTo(300, 100);
      this.emitter.minParticleScale = 0.1;
      this.emitter.maxParticleScale = 0.5;
      this.emitter.gravity = 250;
      this.emitter.flow(2000, 500, 5, -1);
      //
      this.text1 = this.add.bitmapText(200, 100, 'desyrel', 'BitmapText', 64);
      this.text2 = this.add.bitmapText(400, 400, 'stack', 'drawFull', 32);
      //
      this.physics.arcade.enable([this.text1, this.text2]);
      //
      this.text1.body.velocity.setTo(200, 200);
      this.text1.body.collideWorldBounds = true;
      this.text1.body.bounce.set(1);
      //
      this.text2.body.velocity.setTo(-100, -100);
      this.text2.body.collideWorldBounds = true;
      this.text2.body.bounce.set(1);
      //
      this.sonic = this.add.sprite(50, 280, 'sonic');
      this.sonic.addChild(this.make.sprite(80, 130, 'clown'));
      this.sonic.addChild(this.make.sprite(110, 130, 'clown'));
      //
      this.clown3 = this.sonic.addChild(this.make.sprite(140, 130, 'clown'));
      this.clown3.scale.set(2);
      this.clown3.anchor.set(1, 1);
      //
      this.mushroom = this.add.sprite(500, 400, 'mushroom');
      this.mushroom.scale.set(2);
      this.mushroom.angle = 24;
      //
      this.sonic2 = this.add.sprite(400, 200, 'sonic');
      this.sonic2.scale.setTo(2);
      //
      this.subsonic = this.sonic2.addChild(this.make.sprite(100, 0, 'sonic'));
      this.subsonic.scale.x = -1;
      //
      this.add.text(440, 530, 'Click to capture', {
        font: '48px Arial',
        fill: '#ff0044'
      });
      //
      this.input.onDown.add(this.makeThumbnail, this);
    }

    update () {
      this.physics.arcade.collide(this.text1, this.text2);
    }

    render () {
    }

    makeThumbnail () {
      this.stage_1.drawFull(this.world);
      //
      this.thumbnail.rect(0, 0, 204, 154, '#000');
      //
      this.thumbnail.copy(this.stage_1, 0, 0, 800, 600, 2, 2, 200, 150);
    }
  }
})();
