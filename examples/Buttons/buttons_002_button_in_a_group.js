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
    game.add.tileSprite(0, 0, 800, 600, 'background');
    this.group = game.add.group();

    this.button = game.make.button(game.world.centerX - 95, 400, 'button', this.removeGroup, this, 2, 1, 0);

    window.rich = this.button;
    //
    this.button.onInputOver.add(this.over, this);
    this.button.onInputOut.add(this.out, this);
    //
    this.group.add(this.button);
  },
  update () {
  },
  render () {
  },
  removeGroup () {
    game.world.remove(this.group);
  },
  over () {
    console.log('button over');
  },
  out () {
    console.log('button out');
  },
  actionOnClick () {
    console.log('button clicked');
  }
};