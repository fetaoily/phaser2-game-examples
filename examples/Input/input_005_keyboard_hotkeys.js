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
    game.load.image('phaser', '/assets/sprites/phaser-dude.png');
    game.load.image('logo', '/assets/sprites/phaser_tiny.png');
    game.load.image('pineapple', '/assets/sprites/pineapple.png');
  },
  create () {
    game.stage.backgroundColor = '#736357';
    game.add.text(32, 32, 'Press one, two ro three!', {});
    //
    this.key1 = game.input.keyboard.addKey(Phaser.Keyboard.ONE);
    this.key2 = game.input.keyboard.addKey(Phaser.Keyboard.TWO);
    this.key3 = game.input.keyboard.addKey(Phaser.Keyboard.THREE);
    //
    this.key1.onDown.add(this.addPhaserDude, this);
    this.key2.onDown.add(this.addPhaserLogo, this);
    this.key3.onDown.add(this.addPineapple, this);
  },
  update () {
    if (game.input.activePointer.withinGame) {
      game.input.enabled = true;
      game.stage.backgroundColor = '#736357';
    } else {
      game.input.enabled = false;
      game.stage.backgroundColor = '#731111';
    }
  },
  render () {
  },
  addPhaserDude () {
    game.add.sprite(game.world.randomX, game.world.randomY, 'phaser');
  },
  addPhaserLogo () {
    game.add.sprite(game.world.randomX, game.world.randomY, 'logo');
  },
  addPineapple () {
    game.add.sprite(game.world.randomX, game.world.randomY, 'pineapple');
  }
};