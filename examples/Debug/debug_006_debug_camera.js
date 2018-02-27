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
    this.sprite = game.add.sprite(0, 0, 'sprite');
    this.sprite.alpha = 0.5;
    this.sprite.x = game.width / 2;
    this.sprite.anchor.x = this.sprite.anchor.y = 0.5;
  },
  update () {
    this.tStep = Math.sin(this.counter);
    this.sprite.y = (game.height / 2) + this.tStep * 30;
    this.sprite.rotation += Phaser.Math.degToRad(0.1 * this.tStep);
    this.counter += this.step;
  },
  render () {
    game.debug.cameraInfo(game.camera, 32, 32);
  }
};