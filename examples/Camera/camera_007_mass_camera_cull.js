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
    }

    preload () {
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.scale.pageAlignHorizontally = true;
      this.scale.pageAlignVertically = true;
      //
      this.load.image('backdrop', '/assets/pics/remember-me.jpg');
      this.load.image('baddie1', '/assets/sprites/shmup-baddie.png');
      this.load.image('baddie2', '/assets/sprites/shmup-baddie2.png');
      this.load.image('baddie3', '/assets/sprites/shmup-baddie3.png');
    }

    create () {
      this.world.setBounds(0, 0, 1920, 1200);
      //
      this.add.sprite(0, 0, 'backdrop');
      //
      for (let i = 0; i < 100; i++) {
        let s = this.add.sprite(
            this.rnd.between(800, 1100),
            this.world.randomY,
            'baddie' + this.rnd.between(1, 3)
        );
        //
        this.physics.arcade.enable(s);
        //
        s.body.velocity.x = this.rnd.between(-25, -50);
        s.autoCull = true;
        s.checkWorldBounds = true;
        s.events.onOutOfBounds.add(this.resetSprite, this);
      }
      //
      this.cursors = this.input.keyboard.createCursorKeys();
    }

    update () {
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

    render () {
      this.game.debug.cameraInfo(this.camera, 32, 32);
    }

    resetSprite (sprite) {
      sprite.x = this.world.bounds.right;
    }
  }
})();
