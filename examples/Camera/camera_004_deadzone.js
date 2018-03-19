(() => {
  'use strict';

  let game;

  window.onload = () => {
    game = new NewGame();
  };

  class NewGame extends Phaser.Game {
    constructor () {
      super(800, 600, Phaser.CANVAS);
      this.state.add('PlayGame', PlayGame);
      this.state.start('PlayGame');
    }
  }

  class PlayGame extends Phaser.State {
    constructor () {
      super();
      this.player = null;
      this.cursors = null;
    }

    preload () {
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.scale.pageAlignHorizontally = true;
      this.scale.pageAlignVertically = true;
      //
      this.load.image('background', '/assets/tests/debug-grid-1920x1920.png');
      this.load.image('player', '/assets/sprites/phaser-dude.png');
    }

    create () {
      this.add.tileSprite(0, 0, 1920, 1920, 'background');
      //
      this.world.setBounds(0, 0, 1920, 1920);
      //
      this.physics.startSystem(Phaser.Physics.P2JS);
      //
      this.player = this.add.sprite(
          this.world.centerX,
          this.world.centerY,
          'player'
      );
      //
      this.physics.p2.enable(this.player);
      //
      this.cursors = this.input.keyboard.createCursorKeys();
      //
      this.camera.follow(this.player);
      //
      this.camera.deadzone = new Phaser.Rectangle(100, 100, 600, 400);
    }

    update () {
      this.player.body.setZeroVelocity();
      if (this.cursors.up.isDown) {
        this.player.body.moveUp(300);
      } else if (this.cursors.down.isDown) {
        this.player.body.moveDown(300);
      }
      //
      if (this.cursors.left.isDown) {
        this.player.body.velocity.x = -300;
        // this.player.body.moveLeft(300);
      } else if (this.cursors.right.isDown) {
        this.player.body.moveRight(300);
      }
    }

    render () {
      let zone = this.camera.deadzone;
      //
      this.game.context.fillStyle = 'rgba(255,0,0,0.6)';
      this.game.context.fillRect(zone.x, zone.y, zone.width, zone.height);
      //
      this.game.debug.cameraInfo(this.camera, 32, 32);
      this.game.debug.spriteCoords(this.player, 32, 500);
    }
  }
})();
