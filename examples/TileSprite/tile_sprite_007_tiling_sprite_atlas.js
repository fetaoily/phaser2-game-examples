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
    game.load.atlas('seacreatures', '/assets/sprites/seacreatures_json.png', '/assets/sprites/seacreatures_json.json');

  },
  create () {
    game.stage.backgroundColor = '#0072bc';
    //
    this.sprite = game.add.tileSprite(0, 0, 800, 600, 'seacreatures', 'octopus0002');
  },
  update () {
    this.count += 0.005;
    //
    this.sprite.tileScale.x = 2 + Math.sin(this.count);
    this.sprite.tileScale.y = 2 + Math.cos(this.count);
    //
    this.sprite.tilePosition.x += 1;
    this.sprite.tilePosition.y += 1;
  },
  render () {
  }
}
;