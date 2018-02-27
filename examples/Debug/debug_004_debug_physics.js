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
    this.sprite = null;
    this.counter = 0;
    this.step = Math.PI * 2 / 360;
    //
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    //
    game.load.image('sprite', '/assets/sprites/phaser2.png');
  },
  create () {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    //
    this.sprite = game.add.sprite(game.world.centerX, game.world.centerY, 'sprite');
    this.sprite.anchor.set(0.5);
    //
    game.physics.arcade.enable(this.sprite);
  },
  update () {
    this.tStep = Math.sin(this.counter);
    this.sprite.body.y = 120 + this.tStep * 60;
    this.counter += this.step;
  },
  render () {
    game.debug.body(this.sprite);
  }
};