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
    this.speed = 4;
    //
    game.world.setBounds(0, 0, 1280, 600);
    //
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    //
    game.load.image('ground', '/assets/tests/ground-2x.png');
    game.load.image('river', '/assets/tests/river-2x.png');
    game.load.image('sky', '/assets/tests/sky-2x.png');
    game.load.image('cloud0', '/assets/tests/cloud-big-2x.png');
    game.load.image('cloud1', '/assets/tests/cloud-narrow-2x.png');
    game.load.image('cloud2', '/assets/tests/cloud-small-2x.png');
    //
    game.load.spritesheet('button', '/assets/buttons/arrow-button.png', 112, 95);
    //
    game.load.image('ufo', '/assets/sprites/ufo.png');
  },
  create () {
    game.add.tileSprite(0, 0, 1280, 600, 'sky');
    game.add.sprite(0, 360, 'ground');
    game.add.sprite(0, 400, 'river');
    game.add.sprite(200, 120, 'cloud0');
    game.add.sprite(-60, 120, 'cloud1');
    game.add.sprite(900, 170, 'cloud2');
    //
    this.ufo = game.add.sprite(320, 240, 'ufo');
    this.ufo.anchor.set(0.5);
    //
    game.camera.follow(this.ufo);
    //
    this.leftButton = game.add.sprite(160 - 112, 200, 'button', 0);
    this.leftButton.alpha = 0.1;
    //
    this.rightButton = game.add.sprite(640 - 112, 200, 'button', 1);
    this.rightButton.alpha = 0;
  },
  update () {
    if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
      this.ufo.x -= this.speed;
      this.ufo.angle = -15;
      this.leftButton.alpha = 0.9;
      this.ufo.scale.set(2, 2);
    } else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
      this.ufo.x += this.speed;
      this.ufo.angle = 15;
      this.rightButton.alpha = 0.9;
      this.ufo.scale.set(3, 3);
    } else {
      this.ufo.rotation = 0;
      this.leftButton.alpha = this.rightButton.alpha = 0.1;
      this.ufo.scale.set(1, 1);
    }
  },
  render () {
    game.debug.text('Hold left/right to move the ufo.');
    game.debug.spriteInfo(this.ufo, 32, 32);
    game.debug.spriteBounds(this.ufo);
  }
};