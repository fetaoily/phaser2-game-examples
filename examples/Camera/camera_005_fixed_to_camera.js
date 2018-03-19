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
      this.cursors = null;
      this.logo1 = null;
      this.logo2 = null;
    }

    preload () {
      //
      this.stage.setBackgroundColor('#007236');
      //
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.scale.pageAlignHorizontally = true;
      this.scale.pageAlignVertically = true;
      //
      this.load.image('mushroom', '/assets/sprites/mushroom2.png');
      this.load.image('sonic', '/assets/sprites/sonic_havok_sanity.png');
      this.load.image('phaser', '/assets/sprites/phaser1.png');
    }

    create () {
      this.world.resize(6000, 600);
      for (let i = 0; i < 200; i++) {
        this.add.sprite(this.world.randomX, this.world.randomY, 'mushroom');
      }
      this.game.add.text(
          32,
          32,
          'this text is on the background\nuse arrows to scroll',
          {font: '22px Arial', fill: '#f26c4f', align: 'left'}
      );
      //
      this.logo1 = this.add.sprite(100, 300, 'phaser');
      this.logo1.fixedToCamera = true;
      //
      this.logo2 = this.add.sprite(500, 100, 'phaser');
      this.logo2.fixedToCamera = true;
      //
      let t = this.add.text(200, 500, 'this text is fixed to the camera', {
        font: '32px Arial',
        fill: '#ffffff',
        align: 'center'
      });
      t.fixedToCamera = true;
      t.cameraOffset.setTo(200, 500);
      //
      this.add
          .tween(this.logo2.cameraOffset)
          .to({y: 400}, 2000, Phaser.Easing.Back.InOut, true, 0, 2000, true);
      //
      this.cursors = this.input.keyboard.createCursorKeys();
    }

    update () {
      if (this.cursors.left.isDown) {
        this.camera.x -= 4;
      } else if (this.cursors.right.isDown) {
        this.camera.x += 4;
      }
    }

    render () {
      this.game.debug.cameraInfo(this.camera, 32, 32);
    }
  }
})();
