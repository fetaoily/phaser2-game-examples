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
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    //
    game.load.image('bisley', '/assets/pics/alex-bisleys_horsy_5.png');
  },
  create () {
    game.stage.backgroundColor = '#6688ee';
    //
    this.picture = game.add.sprite(game.world.centerX, game.world.centerY, 'bisley');
    this.picture.anchor.setTo(0.5, 0.5);
    //
    game.time.events.add(Phaser.Timer.SECOND * 4, this.fadePicture, this);
  },
  update () {
  },
  render () {
    game.debug.text('Time util event: ' + game.time.events.duration, 32, 32);
  },
  fadePicture () {
    game.add.tween(this.picture).to({alpha: 0}, 2000, Phaser.Easing.Linear.None, true, 1000, Number.MAX_VALUE, true);
  }
};