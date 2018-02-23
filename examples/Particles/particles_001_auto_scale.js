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
    game.load.image('bubble', '/assets/particles/bubble.png');
    game.load.image('water', '/assets/skies/underwater2.png');
  },
  create () {
    game.add.image(0, 0, 'water');
    //
    this.emitter = game.add.emitter(game.world.centerX, 400, 400);
    this.emitter.makeParticles('bubble');
    //
    // this.emitter.minParticleSpeed.set(0, 300);
    // this.emitter.maxParticleSpeed.set(0, 600);
    //
    this.emitter.setRotation(0, 0);
    this.emitter.setAlpha(0.1, 1, 3000, Phaser.Easing.Linear.None, true);
    this.emitter.setScale(0.1, 1, 0.1, 1, 6000, Phaser.Easing.Quintic.Out, true);
    this.emitter.gravity = -200;
    //
    this.emitter.start(false, 5000, 10);
    this.emitter.emitX = 0;
    //
    game.add.tween(this.emitter).to({emitX: 800}, 2000, Phaser.Easing.Linear.None, true, 0, Number.MAX_VALUE, false);
  },
  update () {
    this.emitter.customSort(this.scaleSort, this);
  },
  render () {
    game.debug.text(this.emitter.total, 32, 32);
  },
  scaleSort (a, b) {
    if (a.scale.x < b.scale.x) {
      return -1;
    } else if (a.scale.x > b.scale.x) {
      return 1;
    } else {
      return 0;
    }
  }
};