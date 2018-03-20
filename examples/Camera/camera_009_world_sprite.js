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
      this.card = null;
      this.cursors = null;
    }

    preload() {
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.scale.pageAlignHorizontally = true;
      this.scale.pageAlignVertically = true;
      //
      this.load.image('backdrop', '/assets/pics/remember-me.jpg');
      this.load.image('card', '/assets/sprites/mana_card.png');
    }

    create() {
      this.world.setBounds(0, 0, 1920, 1200);
      //
      this.add.sprite(0, 0, 'backdrop');
      //
      this.card = this.add.sprite(200.5, 200.5, 'card');
      //
      this.physics.enable(this.card, Phaser.Physics.ARCADE);
      //
      this.card.body.collideWorldBounds = true;
      //
      this.camera.follow(this.card);
      //
      this.cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
      this.card.body.velocity.x = 0;
      this.card.body.velocity.y = 0;
      //
      if (this.cursors.left.isDown) {
        this.card.body.velocity.x = -240;
      } else if (this.cursors.right.isDown) {
        this.card.body.velocity.x = 240;
      }
      //
      if (this.cursors.up.isDown) {
        this.card.body.velocity.y = -240;
      } else if (this.cursors.down.isDown) {
        this.card.body.velocity.y = 240;
      }
    }

    render() {
      this.game.debug.cameraInfo(this.camera, 500, 32);
      this.game.debug.spriteCoords(this.card, 32, 32);
    }
  }
})();
