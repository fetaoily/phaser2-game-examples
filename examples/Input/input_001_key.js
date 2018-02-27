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
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    //
    game.load.image('phaser', '/assets/sprites/phaser-dude.png');
  },
  create () {
    game.stage.backgroundColor = '#736357';
    //
    this.sprite = game.add.sprite(300, 300, 'phaser');
    //
    this.upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    this.downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    this.leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    this.rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
  },
  update () {
    if (this.upKey.isDown) {
      this.sprite.y--;
    } else if (this.downKey.isDown) {
      this.sprite.y++;
    }

    if (this.leftKey.isDown) {
      this.sprite.x--;
    } else if (this.rightKey.isDown) {
      this.sprite.x++;
    }
  },
  render () {
  }
};