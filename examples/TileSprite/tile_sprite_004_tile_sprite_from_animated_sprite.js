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
    game.load.spritesheet('waters', '/assets/sprites/waters.png', 32, 400, 32);
  },
  create () {
    this.water = game.add.tileSprite(0, 24 * 16, 128 * 16, 24 * 16, 'waters');
    //
    // this.water = game.add.sprite(0,0,'waters'); water.animations.add('waves0', [0, 1, 2, 3, 2, 1]);
    this.water.animations.add('waves1', [4, 5, 6, 7, 6, 5]);
    this.water.animations.add('waves2', [8, 9, 10, 11, 10, 9]);
    this.water.animations.add('waves3', [12, 13, 14, 15, 14, 13]);
    this.water.animations.add('waves4', [16, 17, 18, 19, 18, 17]);
    this.water.animations.add('waves5', [20, 21, 22, 23, 22, 21]);
    this.water.animations.add('waves6', [24, 25, 26, 27, 26, 25]);
    this.water.animations.add('waves7', [28, 29, 30, 31, 30, 29]);
    let n = 3;
    this.water.animations.play('waves' + n, 8, true);
  },
  update () {
  },
  render () {
  }
};