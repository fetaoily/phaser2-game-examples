let game;
let sprite;

window.onload = () => {
  game = new Phaser.Game(640, 480, Phaser.AUTO);

  game.state.add('PlayGame', PlayGame);
  game.state.start('PlayGame');
};

let PlayGame = function () {
};

PlayGame.prototype = {
  preload () {
    game.load.image('arrow', 'assets/sprites/arrow.png');
    // this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  },
  create () {
    game.backgroundColor = '#222222';
    game.physics.startSystem(Phaser.Physics.ARCADE);

    sprite = game.add.sprite(400, 300, 'arrow');
    sprite.anchor.setTo(0.5, 0.5);

    game.physics.enable(sprite, Phaser.Physics.ARCADE);
    sprite.body.allowRotation = false;
  },
  update () {
    // sprite.rotation = game.physics.arcade.moveToPointer(sprite, 60, game.input.activePointer, 500);
    sprite.rotation = game.physics.arcade.moveToPointer(sprite, 60);
  },
  render () {
    game.debug.spriteInfo(sprite, 32, 32);
  }
};
