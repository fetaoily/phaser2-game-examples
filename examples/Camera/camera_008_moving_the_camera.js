(() => {
  'use strict';

  let game;

  window.onload = () => {
    game = new NewGame();
  };

  class NewGame extends Phaser.Game {
    constructor() {
      super(800, 600, Phaser.AUTO);
      this.state.add('PlayGame', PlayGame);
      this.state.start('PlayGame');
    }
  }

  class PlayGame extends Phaser.State {
    constructor() {
      super();
      this.cursors = null;
    }

    preload() {
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.scale.pageAlignHorizontally = true;
      this.scale.pageAlignVertically = true;
      //
      this.load.image('mushroom', '/assets/sprites/mushroom2.png');
    }

    create() {
      this.stage.setBackgroundColor('#2d2d2d');
      //
      this.world.setBounds(0, 0, 2000, 2000);
      for (let i = 0; i < 150; i++) {
        this.add.sprite(this.world.randomX, this.world.randomY, 'mushroom');
      }
      //
      this.cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
      if (this.cursors.up.isDown) {
        this.camera.y -= 4;
      } else if (this.cursors.down.isDown) {
        this.camera.y += 4;
      }
      //
      if (this.cursors.left.isDown) {
        this.camera.x -= 4;
      } else if (this.cursors.right.isDown) {
        this.camera.x += 4;
      }
    }

    render() {
      this.game.debug.cameraInfo(this.camera, 32, 32);
    }
  }
})();
