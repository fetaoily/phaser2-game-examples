(() => {
  let game;

  window.onload = () => {
    game = new Phaser.Game(800, 600, Phaser.AUTO);
    game.state.add('PlayGame', PlayGame);
    game.state.start('PlayGame');
  };

  let PlayGame = function () {
  };

  PlayGame.prototype = {
    preload () {
      //
      this.camSpeed = 4;
      //
      game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      game.scale.pageAlignHorizontally = true;
      game.scale.pageAlignVertically = true;
      //
      game.load.spritesheet('mummy', '/assets/sprites/metalslug_mummy37x45.png', 37, 45, 18);
      game.load.image('stars', '/assets/misc/starfield.jpg');
    },
    create () {
      game.physics.startSystem(Phaser.Physics.ARCADE);
      //
      game.world.setBounds(0, 0, 4000, 2000);
      this.s = game.add.tileSprite(0, 0, 4000, 600, 'stars');
      this.b = game.add.sprite(0, 300, 'mummy');
      game.physics.arcade.enable(this.b);
      this.b.scale.set(6);
      this.b.smoothed = false;
      this.b.animations.add('walk');
      this.b.animations.play('walk', 5, true);
      this.b.body.velocity.setTo(50, 0);
      this.b.inputEnabled = true;
      this.b.input.pixelPerfectClick = true;
      this.b.events.onInputDown.add(this.tint, this);
    },
    update () {
      if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
        game.camera.x -= this.camSpeed;
        if (!game.camera.atLimit.x) {
          this.s.tilePosition.x += this.camSpeed;
        }
      } else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
        game.camera.x += this.camSpeed;
        if (!game.camera.atLimit.x) {
          this.s.tilePosition.x -= this.camSpeed;
        }
      }
      //
      if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
        game.camera.y -= this.camSpeed;
        if (!game.camera.atLimit.y) {
          this.s.tilePosition.y += this.camSpeed;
        }
      } else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
        game.camera.y += this.camSpeed;
        if (!game.camera.atLimit.y) {
          this.s.tilePosition.y -= this.camSpeed;
        }
      }
    },
    render () {
      game.debug.spriteInputInfo(this.b, 32, 32);
    },
    tint () {
      this.b.tint = Math.random() * 0xffffff;
    }
  };
})();