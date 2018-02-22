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
    this.count = 0;
    //
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    //
    game.load.image('disk', '/assets/sprites/p2.jpeg');
  },
  create () {
    this.tileSprite = game.add.tileSprite(0, 0, 400, 400, 'disk');
    this.cursors = game.input.keyboard.createCursorKeys();
  },
  update () {
    this.count += 0.005;
    this.tileSprite.tileScale.x = 2 + Math.sin(this.count);
    this.tileSprite.tileScale.y = 2 + Math.cos(this.count);

    this.tileSprite.tilePosition.x += 1;
    this.tileSprite.tilePosition.y += 1;

    if (this.cursors.left.isDown) {
      this.tileSprite.x -= 4;
    } else if (this.cursors.right.isDown) {
      this.tileSprite.x += 4;
    }

    if (this.cursors.up.isDown) {
      this.tileSprite.y -= 4;
    } else if (this.cursors.down.isDown) {
      this.tileSprite.y += 4;
    }

  },
  render () {
  }
};
