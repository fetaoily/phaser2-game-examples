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
      this.zooming = null;
      this.zoomAmount = 0;
      this.size = new Phaser.Rectangle();
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
      this.world.setBounds(-960, -600, 1920, 1200);
      //
      this.size.setTo(-960, -600, 1920, 1200);
      //
      this.add.sprite(-960, -600, 'backdrop');
      //
      this.card = this.add.sprite(200.5, 200.5, 'card');
      //
      this.cursors = this.input.keyboard.createCursorKeys();
      //
      this.camera.focusOnXY(-960, -600);
      //
      this.input.onDown.add(this.startZoom, this);
      this.input.onUp.add(this.stopZoom, this);
    }

    update() {
      if (this.zooming) {
        this.camera.scale.x += this.zoomAmount;
        this.camera.scale.y += this.zoomAmount;
        //
        this.camera.bounds.x = this.size.x * this.camera.scale.x;
        this.camera.bounds.y = this.size.y * this.camera.scale.y;
        //
        this.camera.bounds.width = this.size.width * this.camera.scale.x;
        this.camera.bounds.height = this.size.height * this.camera.scale.y;
        //
        console.log(this.camera.view);
        console.log(this.camera.bounds);
        console.log(
          this.input.activePointer.worldX,
          this.input.activePointer.worldY
        );
        //
        // this.camera.focusOnXY(this.input.activePointer.worldX,this.input.activePointer.worldY);
        // this.world.position.x =
        //   -this.input.activePointer.worldX * this.camera.scale.x;
        // this.world.position.y =
        //   -this.input.activePointer.worldY * this.camera.scale.y;
        // //
        // this.world.pivot.x =
        //   this.input.activePointer.worldX * this.camera.scale.x;
        // this.world.pivot.y =
        //   this.input.activePointer.worldY * this.camera.scale.y;
      }
      //
      if (this.cursors.up.isDown) {
        this.camera.y -= 4;
      } else if (this.cursors.down.isDown) {
        this.camera.y += 4;
      }
      //
      if (this.cursors.left.isDown) {
        this.game.camera.x -= 4;
      } else if (this.cursors.right.isDown) {
        this.camera.x += 4;
      }
    }

    render() {
      this.game.debug.cameraInfo(this.camera, 500, 32);
      this.game.debug.spriteCoords(this.card, 32, 32);
      // this.game.debug.physicsBody(this.card.body);
    }

    startZoom(pointer) {
      this.zooming = true;
      if (pointer.button === Phaser.Mouse.LEFT_BUTTON) {
        this.zoomAmount = 0.005;
      } else {
        this.zoomAmount = -0.005;
      }
    }

    stopZoom() {
      this.zooming = false;
    }
  }
})();
