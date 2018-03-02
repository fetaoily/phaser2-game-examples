(() => {
  let game;

  window.onload = () => {
    window.game = game = new Phaser.Game(800, 600, Phaser.AUTO);
    game.state.add('PlayGame', PlayGame);
    game.state.start('PlayGame');
  };

  let PlayGame = function () {
  };

  PlayGame.prototype = {
    preload () {
      //
      this.fireballs = null;
      this.fireRate = 300;
      this.nextFire = 0;
      this.nextJump = 0;
      this.player = null;
      this.left = false;
      this.right = false;
      this.duck = false;
      this.fire = false;
      this.jump = false;
      //
      game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      game.scale.pageAlignHorizontally = true;
      game.scale.pageAlignVertically = true;
      // game.scale.fullScreenScaleMode  = Phaser.ScaleManager.EXACT_FIT;
      //
      // 精灵
      game.load.spritesheet('mario', 'assets/misc/mariospritesheet-small.png', 50, 50);
      // 一些图片素材
      game.load.image('ground', 'assets/misc/2048x48-ground.png');
      game.load.image('clouds', 'assets/misc/clouds.jpg');
      game.load.image('fireball', 'assets/misc/fireball.png', 40, 30);
      // 按钮
      game.load.spritesheet('buttonvertical', 'assets/buttons/buttons-big/button-vertical.png', 64, 64);
      game.load.spritesheet('buttonhorizontal', 'assets/buttons/buttons-big/button-horizontal.png', 96, 64);
      game.load.spritesheet('buttondiagonal', 'assets/buttons/buttons-big/button-diagonal.png', 64, 64);
      game.load.spritesheet('buttonfire', 'assets/buttons/buttons-big/button-round-a.png', 96, 96);
      game.load.spritesheet('buttonjump', 'assets/buttons/buttons-big/button-round-b.png', 96, 96);
    },
    create () {
      if (!game.device.desktop) {
        game.input.onDown.add(this.gofull, this);
      }
      //
      game.physics.startSystem(Phaser.Physics.P2JS);
      game.physics.p2.gravity.y = 1200;
      game.world.setBounds(0, 0, 2000, 600);
      game.physics.p2.setBoundsToWorld(true, true, false, true, false);
      //
      game.physics.p2.friction = 5;
      //
      this.clouds = game.add.tileSprite(0, 0, 2048, 600, 'clouds');
      this.ground = game.add.sprite(game.world.width / 2, game.world.height - 24, 'ground');
      game.physics.p2.enable(this.ground);
      //
      this.ground.body.static = true;
      //
      this.fireballs = game.add.group();
      this.fireballs.createMultiple(500, 'fireball', 0, false);
      //
      this.player = game.add.sprite(350, game.world.height - 150, 'mario');
      game.physics.p2.enable(this.player);
      this.player.body.setCircle(22);
      //
      this.player.body.fixedRotation = true;
      this.player.body.mass = 4;
      //
      this.player.animations.add('walk', [1, 2, 3, 4], 10, true);
      this.player.animations.add('duck', [11], 0, true);
      this.player.animations.add('duckwalk', [10, 11, 12], 3, true);
      //
      game.camera.follow(this.player);
      // ===============================================================================================================
      // ##
      // ===============================================================================================================
      this.buttonjump = game.add.button(600, 500, 'buttonjump', null, this, 0, 1, 0, 1);
      this.buttonjump.fixedToCamera = true;
      this.buttonjump.events.onInputOver.add(this.flagJump(true), this);
      this.buttonjump.events.onInputOut.add(this.flagJump(false), this);
      this.buttonjump.events.onInputDown.add(this.flagJump(true), this);
      this.buttonjump.events.onInputUp.add(this.flagJump(false), this);
      // ===============================================================================================================
      // ##
      // ===============================================================================================================
      this.buttonFire = game.add.button(700, 500, 'buttonfire', null, this, 0, 1, 0, 1);
      this.buttonFire.fixedToCamera = true;
      this.buttonFire.events.onInputOver.add(this.flagFire(true), this);
      this.buttonFire.events.onInputOut.add(this.flagFire(false), this);
      this.buttonFire.events.onInputDown.add(this.flagFire(true), this);
      this.buttonFire.events.onInputUp.add(this.flagFire(false), this);
      // ===============================================================================================================
      // ##
      // ===============================================================================================================
      this.buttonLeft = game.add.button(0, 472, 'buttonhorizontal', null, this, 0, 1, 0, 1);
      this.buttonLeft.fixedToCamera = true;
      this.buttonLeft.events.onInputOver.add(this.flagLeft(true), this);
      this.buttonLeft.events.onInputOut.add(this.flagLeft(false), this);
      this.buttonLeft.events.onInputDown.add(this.flagLeft(true), this);
      this.buttonLeft.events.onInputUp.add(this.flagLeft(false), this);
      // ===============================================================================================================
      // ##
      // ===============================================================================================================
      this.buttonBottomLeft = game.add.button(32, 536, 'buttondiagonal', null, this, 6, 4, 6, 4);
      this.buttonBottomLeft.fixedToCamera = true;
      this.buttonBottomLeft.events.onInputOver.add(this.flagLeftDuck(true, true), this);
      this.buttonBottomLeft.events.onInputOut.add(this.flagLeftDuck(false, false), this);
      this.buttonBottomLeft.events.onInputDown.add(this.flagLeftDuck(true, true), this);
      this.buttonBottomLeft.events.onInputUp.add(this.flagLeftDuck(false, false), this);
      // ===============================================================================================================
      // ##
      // ===============================================================================================================
      this.buttonRight = game.add.button(160, 472, 'buttonhorizontal', null, this, 0, 1, 0, 1);
      this.buttonRight.fixedToCamera = true;
      this.buttonRight.events.onInputOver.add(this.flagRight(true), this);
      this.buttonRight.events.onInputOut.add(this.flagRight(false), this);
      this.buttonRight.events.onInputDown.add(this.flagRight(true), this);
      this.buttonRight.events.onInputUp.add(this.flagRight(false), this);
      // ===============================================================================================================
      // ##
      // ===============================================================================================================
      this.buttonBottomRight = game.add.button(160, 536, 'buttondiagonal', null, this, 7, 5, 7, 5);
      this.buttonBottomRight.fixedToCamera = true;
      this.buttonBottomRight.events.onInputOver.add(this.flagRightDuck(true, true), this);
      this.buttonBottomRight.events.onInputOut.add(this.flagRightDuck(false, false), this);
      this.buttonBottomRight.events.onInputDown.add(this.flagRightDuck(true, true), this);
      this.buttonBottomRight.events.onInputUp.add(this.flagRightDuck(false, false), this);
      // ===============================================================================================================
      // ##
      // ===============================================================================================================
      this.buttonDown = game.add.button(96, 536, 'buttonvertical', null, this, 0, 1, 0, 1);
      this.buttonDown.fixedToCamera = true;
      this.buttonDown.events.onInputOver.add(this.flagDuck(true), this);
      this.buttonDown.events.onInputOut.add(this.flagDuck(false), this);
      this.buttonDown.events.onInputDown.add(this.flagDuck(true), this);
      this.buttonDown.events.onInputUp.add(this.flagDuck(false), this);


    },
    update () {
      if (this.left && !this.duck) {
        this.player.scale.x = -1;
        this.player.body.moveLeft(500);
        this.player.animations.play('walk');
      } else if (this.right && !this.duck) {
        this.player.scale.x = 1;
        this.player.body.moveRight(500);
        this.player.animations.play('walk');
      } else if (this.duck && !this.left && !this.right) {
        this.player.body.velocity.x = 0;
        this.player.animations.play('duck');
      } else if (this.duck && this.right) {
        this.player.scale.x = 1;
        this.player.body.moveRight(200);
        this.player.animations.play('duckwalk');
      } else if (this.duck && this.left) {
        this.player.scale.x = -1;
        this.player.body.moveLeft(200);
        this.player.animations.play('duckwalk');
      } else {
        this.player.loadTexture('mario', 0);
      }
      //
      if (this.jump) {
        this.jump_now();
        this.player.loadTexture('mario', 5);
      }
      //
      if (this.fire) {
        this.fire_now();
        this.player.loadTexture('mario', 8);
      }
      //
      if (this.duck) {
        this.player.body.setCircle(16, 0, 6);
      } else {
        this.player.body.setCircle(22);
      }
      //
      if (game.input.currentPointers === 0 && !game.input.activePointer.isMouse) {
        this.fire = false;
        this.right = false;
        this.left = false;
        this.duck = false;
        this.jump = false;
      }
    },
    render () {
      game.debug.text('jump:' + this.jump + ' duck:' + this.duck + ' left:' + this.left + ' right:' + this.right + ' fire:' + this.fire, 20, 20);
    },
    gofull () {
      game.scale.startFullScreen(false);
    },
    jump_now () {
      if (game.time.now > this.nextJump) {
        this.player.body.moveUp(600);
        this.nextJump = game.time.now + 900;
      }
    },
    fire_now () {
      if (game.time.now > this.nextFire) {
        this.nextFire = game.time.now + this.fireRate;
        let fireball = this.fireballs.getFirstExists(false);
        if (fireball) {
          fireball.exists = true;
          fireball.lifespan = 2500;
          if (this.player.scale.x === -1) {
            fireball.reset(this.player.x - 20, this.player.y);
            game.physics.p2.enable(fireball);
            fireball.body.moveLeft(800);
            fireball.body.moveDown(180);
          } else {
            fireball.reset(this.player.x + 20, this.player.y);
            game.physics.p2.enable(fireball);
            fireball.body.moveRight(800);
            fireball.body.moveDown(180);
          }
          fireball.body.setCircle(10);
        }
      }
    },
    flagJump (flag) {
      return () => {
        this.jump = flag;
      };
    },
    flagFire (flag) {
      return () => {
        this.fire = flag;
      };
    },
    flagLeft (flag) {
      return () => {
        this.left = flag;
      };
    },
    flagRight (flag) {
      return () => {
        this.right = flag;
      };
    },
    flagDuck (flag) {
      return () => {
        this.duck = flag;
      };
    },
    flagLeftDuck (flag1, flag2) {
      return () => {
        this.left = flag1;
        this.duck = flag2;
      };
    },
    flagRightDuck (flag1, flag2) {
      return () => {
        this.right = flag1;
        this.duck = flag2;
      };
    }
  };
})();