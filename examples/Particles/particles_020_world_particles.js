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
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    //
    game.load.image('sky', '/assets/pics/remember-me.jpg');
    game.load.image('leaf', '/assets/particles/leaf1.png');
    game.load.image('mushroom', '/assets/sprites/mushroom2.png');
  },
  create () {
    game.world.setBounds(0, 0, 1920, 1200);
    game.physics.arcade.gravity.y = 100;
    //
    this.skye = game.add.image(0, 0, 'sky');
    this.cursors = game.input.keyboard.createCursorKeys();
    //
    this.emitter = game.add.emitter(400, 100, 100);
    this.emitter.makeParticles('leaf');
    this.emitter.minParticleSpeed.setTo(-300, 300);
    this.emitter.maxParticleSpeed.setTo(300, 100);
    this.emitter.minParticleScale = 0.1;
    this.emitter.maxParticleScale = 0.5;
    this.emitter.gravity = 250;
    //
    this.emitter.flow(2000, 500, 5, -1);
    //
    game.input.onDown.add(this.dropSprite, this);
  },
  update () {
    if (this.cursors.up.isDown) {
      game.camera.y -= 4;
    } else if (this.cursors.down.isDown) {
      game.camera.y += 4;
    }
    //
    if (this.cursors.left.isDown) {
      game.camera.x -= 4;
    } else if (this.cursors.right.isDown) {
      game.camera.x += 4;
    }
  },
  render () {
    game.debug.cameraInfo(game.camera, 32, 32);
  },
  dropSprite (pointer) {
    let m = game.add.sprite(pointer.worldX, pointer.worldY, 'mushroom');
    game.physics.arcade.enable(m);
    m.body.collideWorldBounds = true;
  }
};