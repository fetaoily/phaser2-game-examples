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
      this.sprite = null;
      this.player = null;
      this.facing = "left";
      this.jumpTimer = 0;
      this.cursors = null;
      this.jumpButton = null;
      this.yAxis = p2.vec2.fromValues(0, 1);
    }

    preload () {
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.scale.pageAlignHorizontally = true;
      this.scale.pageAlignVertically = true;
      //
      this.load.image("atari", "assets/sprites/block.png");
      this.load.image("background", "/assets/games/starstruck/background2.png");
      this.load.spritesheet(
          "dude",
          "/assets/games/starstruck/dude.png",
          32,
          48
      );
    }

    create () {
      this.bg = this.add.tileSprite(0, 0, 800, 600, "background");
      //
      this.physics.startSystem(Phaser.Physics.P2JS);
      //
      this.physics.p2.gravity.y = 350;
      this.physics.p2.world.defaultContactMaterial.friction = 0.3;
      this.physics.p2.world.setGlobalStiffness(1e5);
      //
      this.player = this.add.sprite(200, 200, "dude");
      this.player.animations.add("left", [0, 1, 2, 3], 10, true);
      this.player.animations.add("turn", [4], 20, true);
      this.player.animations.add("right", [5, 6, 7, 8], 10, true);
      //
      this.physics.p2.enable(this.player);
      //
      this.player.body.fixedRotation = true;
      this.player.body.damping = 0.5;
      //
      this.spriteMaterial = this.physics.p2.createMaterial(
          "spriteMaterial",
          this.player.body
      );
      this.worldMaterial = this.physics.p2.createMaterial("worldMaterial");
      this.boxMaterial = this.physics.p2.createMaterial("worldMaterial");
      //
      this.physics.p2.setWorldMaterial(
          this.worldMaterial,
          true,
          true,
          true,
          true
      );
      //
      for (let i = 0; i < 4; i++) {
        let box = this.add.sprite(300, 645 - 95 * i, "atari");
        this.physics.p2.enable(box);
        box.body.mass = 6;
        // box.body.static = true;
        box.body.setMaterial(this.boxMaterial);
      }
      //
      this.groundPlayerCM = this.physics.p2.createContactMaterial(
          this.spriteMaterial,
          this.worldMaterial,
          {friction: 0.0}
      );
      this.groundBoxesCM = this.physics.p2.createContactMaterial(
          this.worldMaterial,
          this.boxMaterial,
          {friction: 0.6}
      );
      //
      this.text = this.add.text(20, 20, "move with arrow, space to jump", {
        fill: "#ffffff"
      });
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
      let result = false;
      for (
          let i = 0;
          i < this.physics.p2.world.narrowphase.contactEquations.length;
          i++
      ) {
        let c = this.physics.p2.world.narrowphase.contactEquations[i];
        if (
            c.bodyA === this.player.body.data ||
            c.bodyB === this.player.body.data
        ) {
          let d = p2.vec2.dot(c.normalA, this.yAxis);
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
