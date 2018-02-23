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
    game.load.spritesheet('button', '/assets/buttons/number-buttons-90x90.png', 90, 90);
    game.load.image('background', '/assets/misc/starfield.jpg');
  },
  create () {
    game.stage.backgroundColor = '#182d3d';

    this.button = game.add.button(game.world.centerX, game.world.centerY, 'button', this.actionOnClick, this, 1, 0, 2);

    this.button.anchor.setTo(0.5, 0.5);
  },
  update () {
  },
  render () {
  },
  actionOnClick () {
    this.button.setFrames(4, 3, 5);
  }
};