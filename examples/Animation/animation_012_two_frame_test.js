(() => {
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
      this.player = null;
      this.left = null;
      this.right = null;
    }

    preload () {
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.scale.pageAlignHorizontally = true;
      this.scale.pageAlignVertically = true;
      //
      this.load.spritesheet('player', '/assets/sprites/spaceman.png', 16, 16);
    }

    create () {
      this.stage.setBackgroundColor('#ff00ff');
      //
      this.player = this.add.sprite(48, 48, 'player', 1);
      this.player.smoothed = false;
      this.player.scale.set(4);
      //
      this.left = this.player.animations.add('left', [8, 9], 10, true);
      this.right = this.player.animations.add('right', [1, 2], 10, true);
      this.up = this.player.animations.add('up', [11, 12, 13], 10, true);
      this.down = this.player.animations.add('down', [4, 5, 6], 10, true);
      //
      this.left.enableUpdate = true;
      this.right.enableUpdate = true;
      //
      this.physics.enable(this.player, Phaser.Physics.ARCADE);
      this.camera.follow(this.player);
      //
      this.cursors = this.input.keyboard.createCursorKeys();
    }

    update () {
      this.player.body.velocity.set(0);
      if (this.cursors.left.isDown) {
        this.player.body.velocity.x = -100;
        this.player.play('left');
      } else if (this.cursors.right.isDown) {
        this.player.body.velocity.x = 100;
        this.player.play('right');
      } else if (this.cursors.up.isDown) {
        this.player.body.velocity.y = -100;
        this.player.play('up');
      } else if (this.cursors.down.isDown) {
        this.player.body.velocity.y = 100;
        this.player.play('down');
      } else {
        this.player.animations.stop();
      }
    }

    render () {
      this.game.debug.text(this.player.frame, 32, 32);
      this.game.debug.body(this.player);
    }
  }
})();