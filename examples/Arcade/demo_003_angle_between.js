let game;

let arrow;
let target;

window.onload = () => {
  game = new Phaser.Game(640, 480, Phaser.AUTO);
  game.state.add('PlayGame', PlayGame);
  game.state.start('PlayGame');
};

let PlayGame = function () {
};

PlayGame.prototype = {
  preload () {
    game.load.image('arrow', '/assets/sprites/longarrow.png');
    game.load.image('ball', '/assets/sprites/pangball.png');
  },
  create () {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.stage.backgroundColor = '#0072bc';
    arrow = game.add.sprite(200, 250, 'arrow');
    arrow.anchor.setTo(0.1, 0.5);

    target = game.add.sprite(600, 400, 'ball');
    target.anchor.setTo(0.5, 0.5);
    target.inputEnabled = true;
    target.input.enableDrag(true);

    game.physics.arcade.collideWorldBounds = true;

    game.physics.arcade.enable(target);
    // target.body.gravity.y = 1000;
  },
  update () {
    // arrow.rotation = game.physics.arcade.angleBetween(arrow, target);
    arrow.rotation = game.physics.arcade.angleToXY(arrow, target.x, target.y);
    // arrow.rotation = game.physics.arcade.angleToPointer(arrow);
  },
  render () {
    game.debug.text('Drag the ball', 32, 32);
    game.debug.spriteInfo(arrow, 32, 100);
    game.debug.spriteInfo(target, 32, 200);
    game.debug.spriteBounds(arrow);
    game.debug.spriteBounds(target);
  }
};