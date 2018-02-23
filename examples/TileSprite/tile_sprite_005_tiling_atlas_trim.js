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
    game.load.atlas('test', '/assets/sprites/tstrim.png', '/assets/sprites/tstrim.json');
  },
  create () {
    this.sprite = game.add.sprite(0, 0, 'test', 'ts-trim');
    this.sprite = game.add.tileSprite(100, 0, 500, 600, 'test', 'ts-trim');
  },
  update () {
  },
  render () {
  }
};