(() => {
  'use strict';

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
      this.bulletTime = 0;
      //
      game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      game.scale.pageAlignHorizontally = true;
      game.scale.pageAlignVertically = true;
      //
      game.load.image('phaser', '/assets/sprites/phaser-dude.png');
      game.load.image('bullet', '/assets/misc/bullet0.png');
    },
    create () {
      game.physics.startSystem(Phaser.Physics.ARCADE);
      game.stage.backgroundColor = '#2d2d2d';
      //
      this.bullets = game.add.group();
      this.bullets.enableBody = true;
      this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
      //
      this.bullets.createMultiple(100, 'bullet');
      this.bullets.callAll('events.onOutOfBounds.add', 'events.onOutOfBounds', this.resetBullet, this);
      this.bullets.setAll('checkWorldBounds', true);
      //
      this.sprite = game.add.sprite(400, 550, 'phaser');
      //
      game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
      //
      this.leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
      this.rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
      this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
      //
      game.input.keyboard.addKeyCapture([Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT, Phaser.Keyboard.SPACEBAR]);
      //
      this.textFont = {
        font: "16px Arial",
        fill: "#ffffff",
        align: "center"
      };
      //
      this.textLeft = game.add.text(20, 20, "Left was pressed 250 ms ago? NO", this.textFont);
      this.textRight = game.add.text(20, 60, "Right was pressed 500 ms ago? NO", this.textFont);
      this.textSpace = game.add.text(20, 100, "Space was pressed 1000 ms ago? NO", this.textFont);
      //
      this.textLeft2 = game.add.text(600, 20, "Is left still down? NO", this.textFont);
      this.textRight2 = game.add.text(600, 60, "Is right still down? NO", this.textFont);
      this.textSpace2 = game.add.text(600, 100, "Is space still down? NO", this.textFont);
    },
    update () {
      this.sprite.body.velocity.x = 0;
      this.sprite.body.velocity.y = 0;
      //
      if (this.leftKey.isDown) {
        this.sprite.body.velocity.x -= 200;
        this.textLeft2.text = 'Is Left still down? YES';
      } else {
        this.textLeft2.text = 'Is Left still down? NO';
      }
      //
      if (this.rightKey.isDown) {
        this.sprite.body.velocity.x += 200;
        this.textRight2.text = 'Is Right still down? YES';
      } else {
        this.textRight2.text = 'Is Right still down? NO';
      }
      //
      if (this.spaceKey.isDown) {
        this.fireBullet();
        this.textSpace2.text = 'Is Space still down? YES';
      } else {
        this.textSpace2.text = 'Is Space still down? NO';
      }
      //
      if (this.leftKey.downDuration(250)) {
        this.textLeft.text = 'Left was pressed 250 ms ago? YES';
      } else {
        this.textLeft.text = 'Left was pressed 250 ms ago? NO';
      }
      //
      if (this.rightKey.downDuration(500)) {
        this.textRight.text = 'Right was pressed 500 ms ago? YES';
      } else {
        this.textRight.text = 'Right was pressed 500 ms ago? NO';
      }
      //
      if (this.spaceKey.downDuration(1000)) {
        this.textSpace.text = 'Space was pressed 1000 ms ago? YES';
      } else {
        this.textSpace.text = 'Space was pressed 1000 ms ago? NO';
      }

    },
    render () {
    },
    resetBullet () {
    },
    fireBullet () {
      if (game.time.now > this.bulletTime) {
        this.bullet = this.bullets.getFirstExists(false);
        if (this.bullet) {
          this.bullet.reset(this.sprite.x + 6, this.sprite.y - 8);
          this.bullet.body.velocity.y = -300;
          this.bulletTime = game.time.now + 250;
        }
      }
    },
    resetBullet (bullet) {
      bullet.kill();
    }
  };
})();