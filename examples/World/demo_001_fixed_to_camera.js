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
    game.stage.backgroundColor = '#007234';
    //
    game.load.image('mushroom', '/assets/sprites/mushroom2.png');
    game.load.image('sonic', '/assets/sprites/sonic_havok_sanity.png');
    game.load.image('phaser', '/assets/sprites/phaser1.png');
  },
  create () {
    game.world.setBounds(-1000, -1000, 2000, 2000);
    for (let i = 0; i < 200; i++) {
      game.add.sprite(game.world.randomX, game.world.randomY, 'mushroom');
    }
    game.add.text(0, 0, 'this text scrolls\n width the background', {
      font: '32px Arial',
      fill: '#f26c4f',
      align: 'center'
    });
    //
    this.logo1 = game.add.sprite(0, 0, 'phaser');
    this.logo1.fixedToCamera = true;
    this.logo1.cameraOffset.setTo(100, 100);
    //
    this.logo2 = game.add.sprite(0, 0, 'phaser');
    this.logo2.fixedToCamera = true;
    this.logo2.cameraOffset.setTo(500, 100);
    //
    let t = game.add.text(0, 0, 'this text is fixed to the camera', {
      font: '32px Arial',
      fill: '#ffffff',
      align: 'center'
    });
    t.fixedToCamera = true;
    t.cameraOffset.setTo(200, 500);

    //
    game.add.tween(this.logo2.cameraOffset).to({y: 400}, 2000, Phaser.Easing.Back.InOut, true, 0, 2000, true);

    this.cursors = game.input.keyboard.createCursorKeys();
  },
  update () {
    if (this.cursors.up.isDown) {
      game.camera.y -= 4;
    } else if (this.cursors.down.isDown) {
      game.camera.y += 4;
    }
    if (this.cursors.left.isDown) {
      game.camera.x -= 4;
    } else if (this.cursors.right.isDown) {
      game.camera.x += 4;
    }
  },
  render () {
    game.debug.cameraInfo(game.camera, 32, 32);
  }
};