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
    game.load.image('starfield', '/assets/sprites/tstest.png');
  },
  create () {
    this.tileSprite = game.add.tileSprite(0, 0, 800, 600, 'starfield');
    this.cursors = game.input.keyboard.createCursorKeys();
  },
  update () {
    if (this.cursors.left.isDown) {
      this.tileSprite.tilePosition.x += 8;
    } else if (this.cursors.right.isDown) {
      this.tileSprite.tilePosition.x -= 8;
    }
    //
    if (this.cursors.up.isDown) {
      this.tileSprite.tilePosition.y += 8;
    } else if (this.cursors.down.isDown) {
      this.tileSprite.tilePosition.y -= 8;
    }
  },
  render () {
  }
};