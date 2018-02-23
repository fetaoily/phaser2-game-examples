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
    //
    game.load.spritesheet('sky0', '/assets/skies/space2.png');
    game.load.spritesheet('sky1', '/assets/skies/cavern1.png');
    game.load.spritesheet('sky2', '/assets/skies/chrome.png');
    game.load.spritesheet('sky3', '/assets/skies/fire.png');
    game.load.spritesheet('sky4', '/assets/skies/fog.png');
    game.load.spritesheet('sky5', '/assets/skies/sky1.png');
    game.load.spritesheet('sky6', '/assets/skies/toxic.png');
  },
  create () {
    this.background = game.add.sprite(0, 0, 'sky0');
    this.background.name = 'background';
    //
    this.button1 = game.add.button(100, 100, 'button', this.changeSky, this, 2, 1, 0);
    this.button1.name = 'sky1';
    this.button1.anchor.setTo(0.5, 0.5);
    //
    this.button2 = game.add.button(330, 200, 'button', this.changeSky, this, 2, 1, 0);
    this.button2.name = 'sky2';
    this.button2.angle = 24;
    this.button2.anchor.setTo(0.5, 0.5);
    //
    this.button3 = game.add.button(100, 300, 'button', this.changeSky, this, 2, 1, 0);
    this.button3.name = 'sky3';
    this.button3.width = 300;
    this.button3.anchor.setTo(0, 0.5);
    this.button3.angle = 0.1;
    //
    this.button4 = game.add.button(300, 450, 'button', this.changeSky, this, 2, 1, 0);
    this.button4.name = 'sky4';
    this.button4.scale.setTo(2, 2);
    //
    this.button5 = game.add.button(100, 450, 'button', this.changeSky, this, 2, 1, 0);
    this.button5.name = 'sky5';
    this.button5.scale.setTo(0.5, 0.5);
    //
    this.button6 = game.add.button(570, 200, 'button', this.changeSky, this, 2, 1, 0);
    this.button6.name = 'sky6';
    this.button6.angle = 32;
    this.button6.scale.setTo(2, 2);
    this.button6.anchor.setTo(0.5, 0.5);
  },
  update () {
  },
  render () {
  },
  changeSky (button) {
    this.background.loadTexture(button.name);
  }
};