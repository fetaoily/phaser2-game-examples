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
    game.load.spritesheet('button', '/assets/buttons/button_sprite_sheet.png', 193, 71);
    game.load.image('background', '/assets/misc/starfield.jpg');
  },
  create () {
    game.stage.backgroundColor = '#182d3d';

    this.background = game.add.tileSprite(0, 0, 800, 600, 'background');

    this.button = game.add.button(game.world.centerX - 95, 400, 'button', this.onUp, this, 2, 1, 0);
  },
  update () {
  },
  render () {
  },
  onUp (button, pointer, isOver) {
    if (isOver) {
      this.background.visible = !this.background.visible;
    }
  }
};