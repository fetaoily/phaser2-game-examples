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
    this.count = 0;
    //
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    //
    game.load.atlas('pwr2', '/assets/sprites/pwr2.png', '/assets/sprites/pwr2.json');
  },
  create () {
    this.sprite1 = game.add.tileSprite(0, 0, 800, 600, 'pwr2', 'mushroom2');
    this.sprite2 = game.add.tileSprite(0, 0, 800, 600, 'pwr2', 'hotdog');
  },
  update () {
    this.count += 0.005;
    this.sprite1.tileScale.x = 2 + Math.sin(this.count);
    this.sprite1.tileScale.y = 2 + Math.cos(this.count);
    //
    this.sprite2.tilePosition.x -= Math.sin(this.count) * 4;
    this.sprite2.tilePosition.y -= Math.cos(this.count) * 4;
  },
  render () {
  }
}
;