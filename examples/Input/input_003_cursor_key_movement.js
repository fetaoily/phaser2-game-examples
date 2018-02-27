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
    //s
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    //
    game.stage.backgroundColor = '#007236';
    //
    game.load.image('ball', '/assets/sprites/shinyball.png');
    game.load.image('mushroom', '/assets/sprites/mushroom2.png');
    game.load.image('phaser', '/assets/sprites/sonic_havok_sanity.png');
  },
  create () {
    game.world.setBounds(-1000, -1000, 2000, 2000);
    for (let i = 0; i < 100; i++) {
      game.add.image(game.world.randomX, game.world.randomY, 'mushroom');
    }
    game.add.image(-16, -16, 'ball');
    //
    this.cursors = game.input.keyboard.createCursorKeys();
    //
    game.add.text(32, 32, 'Cursors to move, Shift + Up / Down to Rotate World', {
      fill: '#FFFFFF'
    });
  },
  update () {
    if (this.cursors.up.isDown) {
      if (this.cursors.up.shiftKey) {
        game.world.rotation += 0.05;
      } else {
        game.camera.y -= 4;
      }
    } else if (this.cursors.down.isDown) {
      if (this.cursors.down.shiftKey) {
        game.world.rotation -= 0.05;
      } else {
        game.camera.y += 4;
      }
    }
    //
    if (this.cursors.left.isDown) {
      game.camera.x -= 4;
    } else if (this.cursors.right.isDown) {
      game.camera.x += 4;
    }
  },
  render () {
    game.debug.cameraInfo(game.camera, 32, 500);
  }
};