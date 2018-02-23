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
    game.stage.backgroundColor = '#cccccc';

    this.button = game.add.button(game.world.centerX, game.world.centerY, 'button', this.actionOnClick, this, 2, 1, 0);

    this.button.anchor.setTo(0.5, 0.5);
  },
  update () {
    this.button.angle += 1;
  },
  render () {
  },
  actionOnClick () {
    window.alert('Though I\'myTween turning around, you can still click on me ');
  }
};