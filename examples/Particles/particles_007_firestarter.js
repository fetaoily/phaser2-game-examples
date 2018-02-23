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
    game.load.image('space', '/assets/misc/starfield.jpg');
    //
    game.load.image('fire1', '/assets/particles/fire1.png');
    game.load.image('fire2', '/assets/particles/fire2.png');
    game.load.image('fire3', '/assets/particles/fire3.png');
    game.load.image('smoke', '/assets/particles/smoke-puff.png');
    //
    game.load.spritesheet('ball', '/assets/particles/plasmaball.png', 128, 128);
  },
  create () {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.add.tileSprite(0, 0, game.width, game.height, 'space');
    //
    this.emitter = game.add.emitter(game.world.centerX, game.world.centerY, 400);
    this.emitter.makeParticles(['fire1', 'fire2', 'fire3', 'smoke']);
    //
    this.emitter.gravity = 200;
    this.emitter.setAlpha(1, 0, 3000);
    this.emitter.setScale(0.8, 0, 0.8, 0, 3000);
    //
    this.emitter.start(false, 3000, 5);
    //
    this.sprite = game.add.sprite(0, 300, 'ball', 0);
    game.physics.arcade.enable(this.sprite);
    game.physics.arcade.gravity.y = 150;
    game.physics.arcade.checkCollision.left = false;
    game.physics.arcade.checkCollision.right = false;
    //
    this.sprite.body.setSize(80, 80, 0, 0);
    this.sprite.body.collideWorldBounds = true;
    this.sprite.body.bounce.set(1);
    this.sprite.body.velocity.set(300, 200);
    //
    this.sprite.inputEnabled = true;
    this.sprite.input.enableDrag();
    this.sprite.events.onDragStart.add(this.onDragStart, this);
    this.sprite.events.onDragStop.add(this.onDragStop, this);
    //
    this.sprite.animations.add('pulse');
    this.sprite.play('pulse', 30, true);
    this.sprite.anchor.set(0.5);
    //
    this.createText(16, 16, 'If you can catch the fireball ,drag it around');
  },
  update () {
    let px = this.sprite.body.velocity.x;
    let py = this.sprite.body.velocity.y;
    //
    px *= -1;
    py *= -1;
    //
    this.emitter.minParticleSpeed.set(px, py);
    this.emitter.maxParticleSpeed.set(px, py);
    //
    this.emitter.emitX = this.sprite.x;
    this.emitter.emitY = this.sprite.y;
    //
    game.world.wrap(this.sprite, 64);
  },
  render () {
    game.debug.bodyInfo(this.sprite, 32, 32 * 2);
  },
  onDragStart () {
    this.sprite.body.moves = false;
  },
  onDragStop () {
    this.sprite.body.moves = true;
  },
  createText (x, y, string) {
    let text = game.add.text(x, y, string);
    text.font = 'Arial Black';
    text.fontSize = 20;
    text.fill = '#ffffff';
    text.setShadow(2, 2, 'rgb(0,0,0,0.7)', 2);
    return text;
  }
};