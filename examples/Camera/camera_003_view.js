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
      this.card = null;
      this.cursors = null;
      this.moving = 0;
    }

    preload () {
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.scale.pageAlignHorizontally = true;
      this.scale.pageAlignVertically = true;
      //
      this.load.image('backdrop', '/assets/pics/remember-me.jpg');
      this.load.image('card', '/assets/sprites/mana_card.png');
    }

    create () {
      this.world.setBounds(0, 0, 1920, 1920);
      //
      this.game.add.sprite(0, 0, 'backdrop');
      //
      this.card = this.game.add.sprite(200, 200, 'card');
      //
      this.cursors = this.game.input.keyboard.createCursorKeys();
      //
      this.game.input.onDown.add(this.toggle, this);
      //
      // this.game.camera.follow(this.card);
    }

    update () {
      if (this.moving === 0) {
        if (this.cursors.up.isDown) {
          this.game.camera.y -= 4;
        } else if (this.cursors.down.isDown) {
          this.game.camera.y += 4;
        }
        //
        if (this.cursors.left.isDown) {
          this.game.camera.x -= 4;
        } else if (this.cursors.right.isDown) {
          this.game.camera.x += 4;
        }
      } else {
        if (this.cursors.left.isDown) {
          this.card.x -= 4;
        } else if (this.cursors.right.isDown) {
          this.card.x += 4;
        }
        //
        if (this.cursors.up.isDown) {
          this.card.y -= 4;
        } else if (this.cursors.down.isDown) {
          this.card.y += 4;
        }
      }
    }

    render () {
      this.game.debug.cameraInfo(this.game.camera, 500, 32);
      this.game.debug.spriteInfo(this.card, 32, 32);
      //
      this.game.debug.text(
          'Click to toggle sprite / camera movement with cursors',
          32,
          550
      );
    }

    toggle () {
      this.moving = this.moving === 0 ? (this.moving = 1) : (this.moving = 0);
    }
  }
})();
