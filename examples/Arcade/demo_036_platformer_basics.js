let game;

let player;
let facing = 'left';
let jumpTimer = 0;
let cursors;
let jumpButton;
let bg;

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
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    //
    game.load.spritesheet('dude', '/assets/games/starstruck/dude.png', 32, 48);
    game.load.image('background', '/assets/games/starstruck/background2.png');
  },
  create () {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.time.desiredFps = 30;

    bg = game.add.tileSprite(0, 0, 800, 600, 'background');
    bg.autoScroll(-10, 0);

    game.physics.arcade.gravity.y = 250;

    player = game.add.sprite(32, 32, 'dude');
    game.physics.enable(player, Phaser.Physics.ARCADE);

    player.body.bounce.y = 0.2;
    player.body.collideWorldBounds = true;
    player.body.setSize(20, 32, 5, 16);

    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('turn', [4], 20, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);

    cursors = game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);


  },
  update () {
    player.body.velocity.x = 0;
    if (cursors.left.isDown) {
      player.body.velocity.x = -150;
      if (facing !== 'left') {
        player.animations.play('left');
        facing = 'left';
      }
    } else if (cursors.right.isDown) {
      player.body.velocity.x = 150;
      if (facing !== 'right') {
        player.animations.play('right');
        facing = 'right';
      }
    } else {
      if (facing !== 'idle') {
        player.animations.stop();
        if (facing === 'left') {
          player.frame = 0;
        } else {
          player.frame = 5;
        }
        facing = 'idle';
      }
    }
    if (jumpButton.isDown && player.body.onFloor() && game.time.now > jumpTimer) {
      player.body.velocity.y = -250;
      jumpTimer = game.time.now + 750;
    }
  },
  render () {
    game.debug.bodyInfo(player, 32, 32);
    game.debug.body(player);
  }
};
