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
    game.load.image('melon', '/assets/sprites/melon.png');
  },
  create () {
    game.world.setBounds(0, 0, 2000, 2000);
    for (let i = 0; i < 1000; i++) {
      game.add.sprite(game.world.randomX, game.world.randomY, 'melon');
    }
    this.cursors = game.input.keyboard.createCursorKeys();
  },
  update () {
    if (this.cursors.left.isDown) {
      game.camera.x -= 2;
    } else if (this.cursors.right.isDown) {
      game.camera.x += 2;
    }
    //
    if (this.cursors.up.isDown) {
      game.camera.y -= 2;
    } else if (this.cursors.down.isDown) {
      game.camera.y += 2;
    }
  },
  render () {
    game.debug.inputInfo(16, 16);
  }
};