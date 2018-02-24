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
    this.max = 0;
    this.front_emitter = null;
    this.mid_emitter = null;
    this.back_emitter = null;
    this.update_interval = 4 * 60;
    this.i = 0;
    //
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    //
    game.load.image('sky', '/assets/skies/sky3.png');
    game.load.spritesheet('snowflakes', '/assets/sprites/snowflakes.png', 17, 17);
    game.load.spritesheet('snowflakes_large', '/assets/sprites/snowflakes_large.png', 64, 64);
  },
  create () {
    //
    game.add.image(0, 0, 'sky');
    //
    this.back_emitter = game.add.emitter(game.world.centerX, -32, 600);
    this.back_emitter.makeParticles('snowflakes', [0, 1, 2, 3, 4, 5]);
    //
    this.back_emitter.maxParticleScale = 0.6;
    this.back_emitter.minParticleScale = 0.2;
    //
    this.back_emitter.setYSpeed(20, 100);
    this.back_emitter.gravity = 0;
    this.back_emitter.width = game.world.width * 1.5;
    this.back_emitter.minRotation = 0;
    this.back_emitter.maxRotation = 0;
    //
    this.mid_emitter = game.add.emitter(game.world.centerX, -32, 250);
    this.mid_emitter.makeParticles('snowflakes', [0, 1, 2, 3, 4, 5]);
    this.mid_emitter.maxParticleScale = 1.2;
    this.mid_emitter.minParticleScale = 0.8;
    this.mid_emitter.setYSpeed(50, 150);
    this.mid_emitter.gravity = 0;
    this.mid_emitter.width = game.world.width * 1.5;
    this.mid_emitter.minRotation = 0;
    this.mid_emitter.maxRotation = 40;
    //
    this.front_emitter = game.add.emitter(game.world.centerX, -32, 50);
    this.front_emitter.makeParticles('snowflakes_large', [0, 1, 2, 3, 4, 5]);
    this.front_emitter.maxParticleScale = 1;
    this.front_emitter.minParticleScale = 0.5;
    this.front_emitter.setYSpeed(100, 200);
    this.front_emitter.gravity = 0;
    this.front_emitter.width = game.world.width * 1.5;
    this.front_emitter.minRotation = 0;
    this.front_emitter.maxRotation = 40;
    //
    this.changeWindDirection();
    //
    this.back_emitter.start(false, 14000, 20);
    this.mid_emitter.start(false, 12000, 40);
    this.front_emitter.start(false, 6000, 1000);
  },
  update () {
    this.i++;
    if (this.i === this.update_interval) {
      this.changeWindDirection();
      this.update_interval = Math.floor(Math.random() * 20) * 60;//0 - 20sec @ 60fps
      this.i = 0;
    }
  },
  render () {
  },
  changeWindDirection () {
    let multi = Math.floor((this.max + 200) / 4);
    let frag = (Math.floor(Math.random() * 100) - multi);
    this.max = this.max + frag;
    //
    if (this.max > 200) {
      this.max = 150;
    }
    if (this.max < -200) {
      this.max = -150
    }
    //
    this.setXSpeed(this.back_emitter, this.max);
    this.setXSpeed(this.mid_emitter, this.max);
    this.setXSpeed(this.front_emitter, this.max);
  },
  setXSpeed (emitter, max) {
    emitter.setXSpeed(max - 20, max);
    emitter.forEachAlive(this.setParticleXSpeed, this, max);
  },
  setParticleXSpeed (particle, max) {
    particle.body.velocity.x = max - Math.floor(Math.random() * 30);
  }
};