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
  },
  create () {
    game.stage.backgroundColor = '#003663';
    let bmd = game.add.bitmapData(64, 64);
    let radgrad = bmd.ctx.createRadialGradient(32, 32, 4, 32, 32, 32);
    radgrad.addColorStop(0, 'rgb(1,159,98,1)');
    radgrad.addColorStop(1, 'rgb(1,159,98,0)');
    //
    bmd.context.fillStyle = radgrad;
    bmd.context.fillRect(0, 0, 64, 64);
    //
    game.cache.addBitmapData('particleShade', bmd);
    //
    this.emitter = game.add.emitter(game.world.centerX, 200, 200);
    this.emitter.width = 800;
    //
    this.emitter.particleClass = MonsterParticle;
    this.emitter.makeParticles();
    //
    this.emitter.minParticleSpeed.set(0, 300);
    this.emitter.maxParticleSpeed.set(0, 400);
    this.emitter.setRotation(0, 0);
    this.emitter.setScale(0.1, 1, 0.1, 1, 12000, Phaser.Easing.Quintic.Out);
    this.emitter.gravity = -200;
    //
    this.emitter.start(false, 5000, 100);
    //
    game.input.onDown.add(this.updateBitmapDataTexture, this);
  },
  update () {
  },
  render () {
    game.debug.text('Click to regenerate the texture', 16, 28);
  },
  updateBitmapDataTexture () {
    let bmd = game.cache.getBitmapData('particleShade');
    bmd.context.clearRect(0, 0, 64, 64);
    let radgrad = bmd.ctx.createRadialGradient(32, 32, 4, 32, 32, 32);
    let c = Phaser.Color.getRGB(Phaser.Color.getRandomColor(0, 255, 255));
    radgrad.addColorStop(0, Phaser.Color.getWebRGB(c));
    c.a = 0;
    radgrad.addColorStop(1, Phaser.Color.getWebRGB(c));
    bmd.context.fillStyle = radgrad;
    bmd.context.fillRect(0, 0, 64, 64);
  }
};

let MonsterParticle = function (game, x, y) {
  Phaser.Particle.call(this, game, x, y, game.cache.getBitmapData('particleShade'));
};
MonsterParticle.prototype = Object.create(Phaser.Particle.prototype);
MonsterParticle.prototype.constructor = MonsterParticle;