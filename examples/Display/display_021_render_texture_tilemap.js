(() => {
  let game;

  window.onload = () => {
    game = new NewGame();
  };

  class NewGame extends Phaser.Game {
    constructor () {
      super(800, 600, Phaser.AUTO);
      this.state.add("PlayGame", PlayGame);
      this.state.start("PlayGame");
    }
  }

  class PlayGame extends Phaser.State {
    constructor () {
      super();
      this.map = null;
      this.texture = null;
      this.stamp = null;
      this.tx = 0;
      this.ty = 0;
      this.cursors = null;
      this.sprite = null;
      this.emitter = null;
    }

    preload () {
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.scale.pageAlignHorizontally = true;
      this.scale.pageAlignVertically = true;
      //
      this.load.tilemap("level3", "/assets/tilemaps/maps/cybernoid.json");
      this.load.spritesheet(
          "tiles",
          "/assets/tilemaps/maps/cybernoid.png",
          16,
          16
      );
      this.load.image("phaser", "/assets/sprites/phaser-ship.png");
      this.load.image("chunk", "/assets/sprites/chunk.png");
    }

    create () {
      this.map = this.add.tilemap("level3");
      this.map.setCollisionByExclusion([7, 32, 35, 36, 47]);
      //
      this.world.setBounds(
          0,
          0,
          this.map.widthInPixels,
          this.map.heightInPixels
      );
      this.stamp = this.add.sprite(0, 0, "tiles", 3);
      this.texture = this.add.renderTexture(this.game.width, this.game.height);
      //
      let rtMap = this.add.sprite(0, 0, this.texture);
      rtMap.fixedToCamera = true;
      //
      this.cursors = this.input.keyboard.createCursorKeys();
      //
      this.emitter = this.add.emitter(0, 0, 200);
      this.emitter.makeParticles("chunk");
      this.emitter.minRotation = 0;
      this.emitter.maxRotation = 0;
      this.emitter.gravity = 150;
      this.emitter.bounce.setTo(0.5, 0.5);
      //
      this.sprite = this.add.sprite(300, 90, "phaser");
      this.sprite.anchor.set(0.5);
      //
      this.physics.enable(this.sprite);
      //
      this.sprite.body.tilePadding.set(32, 32);
      //
      this.camera.follow(this.sprite);
      //
      this.renderMap();
    }

    update () {
      if (this.camera.x !== this.tx || this.camera.y !== this.ty) {
        this.renderMap();
      }
      //
      this.sprite.body.velocity.x = 0;
      this.sprite.body.velocity.y = 0;
      if (this.cursors.up.isDown) {
        this.sprite.body.velocity.y = -200;
        this.particleBurst();
      } else if (this.cursors.down.isDown) {
        this.sprite.body.velocity.y = 200;
        this.particleBurst();
      }
      //
      if (this.cursors.left.isDown) {
        this.sprite.body.velocity.x = -200;
        this.sprite.scale.x = -1;
        this.particleBurst();
      } else if (this.cursors.right.isDown) {
        this.sprite.body.velocity.x = 200;
        this.sprite.scale.x = 1;
        this.particleBurst();
      }
    }

    render () {
      this.game.debug.text(this.camera.x, 32, 32);
      this.game.debug.text(this.camera.y, 32, 32 * 2);
    }

    renderMap () {
      let cx = this.game.math.snapToFloor(this.camera.x, 16) / 16;
      let cy = this.game.math.snapToFloor(this.camera.y, 16) / 16;
      //
      let tile = null;
      let w = cx + 50;
      let h = cy + 38;
      let dx = 0;
      let dy = 0;
      let cls = true;
      for (let y = cy; y < h; y++) {
        for (let x = cx; x < w; x++) {
          // tile = this.map.getTile(x, y);
          if (tile) {
            this.stamp.frame = tile.index - 1;
            this.texture.renderXY(this.stamp, dx, dy, cls);
            cls = false;
          }
          dx += 16;
        }
        dx = 0;
        dy += 16;
      }
      this.tx = this.camera.x;
      this.ty = this.camera.y;
    }

    particleBurst () {
      this.emitter.x = this.sprite.x;
      this.emitter.y = this.sprite.y;
      this.emitter.start(true, 2000, null, 1);
    }
  }
})();
