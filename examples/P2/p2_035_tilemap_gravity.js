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
      this.player = null;
      this.facing = "left";
      this.jumpTimer = 0;
      this.cursors = null;
      this.jumpButton = null;
      this.map = null;
      this.layer = null;
    }

    preload () {
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.scale.pageAlignHorizontally = true;
      this.scale.pageAlignVertically = true;
      //
      this.load.tilemap(
          "map",
          "/assets/tilemaps/maps/collision_test.json",
          null,
          Phaser.Tilemap.TILED_JSON
      );
      this.load.image("ground_1x1", "/assets/tilemaps/tiles/ground_1x1.png");
      this.load.image("walls_1x2", "/assets/tilemaps/tiles/walls_1x2.png");
      this.load.image("tiles2", "/assets/tilemaps/tiles/tiles2.png");
      this.load.spritesheet(
          "dude",
          "/assets/games/starstruck/dude.png",
          32,
          48
      );
    }

    create () {
      this.physics.startSystem(Phaser.Physics.P2JS);
      //
      this.stage.setBackgroundColor("#2d2d2d");
      //
      this.map = this.add.tilemap("map");
      this.map.addTilesetImage("ground_1x1");
      this.map.addTilesetImage("walls_1x2");
      this.map.addTilesetImage("tiles2");
      //
      this.layer = this.map.createLayer("Tile Layer 1");
      this.layer.resizeWorld();
      //
      this.map.setCollisionBetween(1, 12);
      //
      this.physics.p2.convertTilemap(this.map, this.layer);
      //
      this.physics.p2.restitution = 0.5;
      this.physics.p2.gravity.y = 300;
      //
      this.player = this.add.sprite(100, 200, "dude");
      this.player.animations.add("left", [0, 1, 2, 3], 10, true);
      this.player.animations.add("turn", [4], 20, true);
      this.player.animations.add("right", [5, 6, 7, 8], 10, true);
      //
      this.physics.p2.enable([this.player], true);
      //
      this.player.body.fixedRotation = true;
      //
      this.camera.follow(this.player);
      //
      this.cursors = this.input.keyboard.createCursorKeys();
      this.jumpButton = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    }

    update () {
      if (this.cursors.left.isDown) {
        this.player.body.moveLeft(200);
        if (this.facing !== "left") {
          this.player.animations.play("left");
          this.facing = "left";
        }
      } else if (this.cursors.right.isDown) {
        this.player.body.moveRight(200);
        if (this.facing !== "right") {
          this.player.animations.play("right");
          this.facing = "right";
        }
      } else {
        this.player.body.velocity.x = 0;
        if (this.facing !== "idle") {
          this.player.animations.stop();
          if (this.facing === "left") {
            this.player.frame = 0;
          } else {
            this.player.frame = 5;
          }
          this.facing = "idle";
        }
      }
      //
      if (
          this.jumpButton.isDown &&
          this.game.time.now > this.jumpTimer &&
          this.checkIfCanJump()
      ) {
        this.player.body.moveUp(300);
        this.jumpTimer = this.game.time.now + 750;
      }
    }

    render () {
    }

    checkIfCanJump () {
      let yAxis = p2.vec2.fromValues(0, 1);
      let result = false;

      for (
          let i = 0;
          i < game.physics.p2.world.narrowphase.contactEquations.length;
          i++
      ) {
        let c = game.physics.p2.world.narrowphase.contactEquations[i];

        if (c.bodyA === this.player.body.data || c.bodyB === this.player.body.data) {
          let d = p2.vec2.dot(c.normalA, yAxis); // Normal dot Y-axis
          if (c.bodyA === this.player.body.data) {
            d *= -1;
          }
          if (d > 0.5) {
            result = true;
          }
        }
      }

      return result;
    }
  }
})();
