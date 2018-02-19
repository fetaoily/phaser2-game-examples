let game;
let arrow;
let analog;
let player;
let myTween;
let launched;
let catchFlag = false;
let graphics1;
let graphics2;

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
    game.world.setBounds(0, 0, 5000, 600);
    game.add.tileSprite(0, 0, 5000, 600, 'background');
    //
    this.graphics1 = game.add.graphics(0, 0);
    this.graphics1.beginFill(0x049e0c);
    this.graphics1.drawRect(395, 400, 10, 250);
    //
    this.graphics2 = game.add.graphics(0, 0);
    this.graphics2.beginFill(0xff0000);
    this.graphics2.drawCircle(395, 400, 100);
    this.graphics2.alpha = 0.3;
    //
    analog = this.analog = game.add.sprite(400, 400, 'analog');
    this.analog.width = 8;
    this.analog.rotation = 1;
    this.analog.alpha = 0.5;
    this.analog.anchor.setTo(0.5, 0);
    //
    arrow = this.arrow = game.add.sprite(400, 400, 'arrow');
    this.arrow.anchor.setTo(0.1, 0.5);
    this.arrow.alpha = 0.5;
    //
    player = this.player = game.add.sprite(150, 320, 'player');
    this.player.anchor.setTo(0.5, 0.5);
    //
    game.physics.arcade.enable([this.player]);
    //
    this.player.body.collideWorldBounds = true;
    this.player.body.bounce.set(0.9);
    this.player.body.drag.set(20, 0);
    //
    this.player.inputEnabled = true;
    this.player.input.start(0, true);
    this.player.events.onInputDown.add(this.set);
    this.player.events.onInputUp.add(this.launch);
    //
    myTween = this.myTween = game.add.tween(this.player).to({ x: 50 }, 5000, Phaser.Easing.Linear.None);
    this.myTween.onComplete.add(this.reappear, this);

    //
    game.camera.follow(this.player, Phaser.Camera.FOLLOW_TOPDOWN);
  },
  update () {
    this.arrow.rotation = game.physics.arcade.angleBetween(this.arrow, this.player);
    if (catchFlag) {
      this.distance = game.physics.arcade.distanceToPointer(this.arrow);
      this.theta = game.physics.arcade.angleToPointer(this.arrow);

      if (this.distance > 300) {
        this.distance = 300;
        this.adjacentX = Math.cos(this.theta) * this.distance;
        this.oppositeY = Math.sin(this.theta) * this.distance;
        this.player.x = 400 + this.adjacentX;
        this.player.y = 400 + this.oppositeY;
      } else {
        this.player.x = game.input.activePointer.worldX;
        this.player.y = game.input.activePointer.worldY;
        this.analog.height = this.distance;
      }

      this.arrow.alpha = 1;
      this.analog.alpha = 0.5;
      this.analog.rotation = this.arrow.rotation - Math.PI / 2;
      this.launchVelocity = this.analog.height;
    }
    this.analog.rotation = this.arrow.rotation - Math.PI / 2;
    this.tweening = this.myTween.isRunning;
    if (!this.tweening && launched && (this.player.x >= game.world.width - 20 || this.player.body.deltaX() === 0)) {
      this.player.body.velocity.setTo(0, 0);
      this.player.alpha = 0;
      this.player.body.moves = false;
      this.player.x = 150;
      this.player.y = 320;
      this.myTween.start();
    }
  },
  render () {
    game.debug.text('Drag the sprite and release to launch', 32, 32, 'rgb(0,255,0)');
    game.debug.cameraInfo(game.camera, 32, 32 * 2);
    game.debug.spriteCoords(this.player, 32, 32 * 7);
    game.debug.text('Launch Velocity: ' + parseInt(this.launchVelocity), 550, 32, 'rgb(0,255,0)');
    game.debug.body(player);
    game.debug.body(analog);
    game.debug.body(arrow);
    game.debug.text('analog.rotation: ' + analog.rotation, 32, 32 * 10);
    game.debug.text('arrow.rotation: ' + arrow.rotation, 32, 32 * 11);
    game.debug.text('distance: ' + this.distance, 32, 32 * 12);
  },
  reappear () {
    launched = false;
    player = this.player.alpha = 1;
  },
  set (player, pointer) {
    if (!launched) {
      catchFlag = true;
      game.camera.follow(null);
      player.body.moves = false;
      player.body.gravity.set(0);
      player.body.velocity.set(0);
    }
  },
  launch (player, pointer) {
    if (catchFlag) {
      catchFlag = false;
      launched = true;
      game.camera.follow(player, Phaser.Camera.FOLLOW_TOPDOWN);

      // arrow.alpha = 0;
      // analog.alpha = 0;
      let XVector = (arrow.x - player.x) * 3;
      let YVector = (arrow.y - player.y) * 3;

      player.body.moves = true;
      player.body.gravity.setTo(0, 180);
      player.body.velocity.setTo(XVector, YVector);
    }
  }
};
