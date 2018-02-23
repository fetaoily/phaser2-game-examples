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
    this.count = 0;
    this.lastScaleTime = 0;
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
    this.sprite = game.add.sprite(0, 0, 'bubble');
    this.sprite.anchor.setTo(0.5, 0.5);
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
    this.emitter.emitX = game.world.randomX;
    this.emitter.emitY = game.world.randomY;
    //
    this.sprite.reset(this.emitter.emitX, this.emitter.emitY);
    //
    game.add.tween(this.emitter).to({
      emitX: 800,
      emitY: 400
    }, 2000, Phaser.Easing.Linear.None, true, 0, Number.MAX_VALUE, true);
  },
  update () {
    //
    this.emitter.customSort(this.scaleSort, this);
    //
    if (game.time.now > this.lastScaleTime) {
      this.count += 1;
      this.sprite.scale.x = 2 + Math.sin(this.count);
      this.sprite.scale.y = 2 + Math.sin(this.count);
      this.lastScaleTime = game.time.now + 150;
    }
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