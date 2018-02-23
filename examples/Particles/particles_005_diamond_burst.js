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
    game.load.image('diamond', '/assets/sprites/diamond.png');
  },
  create () {
    game.stage.backgroundColor = '#337799';
    //
    this.emitter = game.add.emitter(game.world.centerX, 200, 200);
    this.emitter.makeParticles('diamond');
    // this.emitter.start(false, 5000, 20);
    window.setInterval(() => {
      this.emitter.start(true, 5000, null, 10);
    }, 1000);
  },
  update () {
  },
  render () {
  }
};