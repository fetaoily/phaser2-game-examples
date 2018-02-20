let game;

let player;
let cursors;
let arrow;
let catchFlag = false;
let launchVelocity = 0;
let background;

window.onload = () => {
  game = new Phaser.Game(800, 600, Phaser.AUTO);
  game.state.add('PlayGame', PlayGame);
  game.state.start('PlayGame');
};

let PlayGame = function () {
};

PlayGame.prototype = {
  preload () {
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    //
    game.load.image('background', '/assets/misc/starfield.jpg');
    game.load.image('player', '/assets/sprites/phaser-dude.png');
    game.load.image('analog', '/assets/tests/fusia.png');
    game.load.image('arrow', '/assets/sprites/longarrow2.png');
  },
  create () {
    //
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.world.setBounds(0, 0, 3400, 1000);
    background = this.background = game.add.tileSprite(0, 0, 3400, 1000, 'background');
    // this.background.autoScroll(0, 100);
    //
    analog = this.analog = game.add.sprite(200, 450, 'analog');
    analog.width = 8;
    analog.rotation = 220;
    analog.alpha = 0.5;
    analog.anchor.setTo(0.5, 0.0);
    //
    arrow = this.arrow = game.add.sprite(200, 450, 'arrow');
    arrow.anchor.setTo(0.1, 0.5);
    arrow.alpha = 0.5;
    //
    player = this.player = game.add.sprite(150, 320, 'player');
    game.physics.arcade.enable(player);
    player.anchor.set(0.5);
    player.body.collideWorldBounds = true;
    player.body.bounce.set(0.9);
    player.body.drag.set(20, 20);
    //
    player.inputEnabled = true;
    player.input.start(0, true);
    player.events.onInputDown.add(this.set);
    player.events.onInputUp.add(this.launch);
    //
    game.camera.follow(player, Phaser.Camera.FOLLOW_TOPDOWN);

  },
  update () {
    arrow.rotation = game.physics.arcade.angleBetween(arrow, player);

    if (catchFlag === true) {
      player.x = game.input.activePointer.worldX;
      player.y = game.input.activePointer.worldY;

      arrow.alpha = 1;
      analog.alpha = 0.5;

      analog.rotation = arrow.rotation - Math.PI / 2;
      analog.height = game.physics.arcade.distanceBetween(arrow, player);
      launchVelocity = analog.height;
    }
  },
  render () {
    game.debug.text('Drag the sprite and release to launch', 32, 32, 'rgb(0,255,0)');
    game.debug.cameraInfo(game.camera, 32, 32 * 2);
    game.debug.spriteCoords(player, 32, 32 * 7);
    game.debug.text('Launch Celocity: ' + parseInt(launchVelocity), 550, 32, 'rgb(0,255,0)');
  },
  set (player, pointer) {
    catchFlag = true;
    game.camera.follow(null);
    player.body.moves = false;
    player.body.velocity.setTo(0, 0);
    arrow.reset(player.x, player.y);
    analog.reset(player.x, player.y);
  },
  launch () {
    catchFlag = false;
    player.body.moves = true;
    game.camera.follow(player, Phaser.Camera.FOLLOW_TOPDOWN);

    arrow.alpha = 0.5;
    analog.alpha = 0.5;

    let XVector = (arrow.x - player.x) * 3;
    let YVector = (arrow.y - player.y) * 3;

    player.body.velocity.setTo(XVector, YVector);
  }
};
