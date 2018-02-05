let game;
let crateSprite;
let groundSprite;

window.onload = () => {
  game = new Phaser.Game(640, 480, Phaser.AUTO);
  game.state.add('PlayGame', PlayGame);
  game.state.start('PlayGame');
};

let PlayGame = function () {
};

PlayGame.prototype = {
  preload: () => {
    game.load.image('crate', '/assets/sprites/crate.png');
    game.load.image('ground', '/assets/sprites/ground.png');
  },
  create: () => {
    game.stage.backgroundColor = '#222222';
    //
    game.physics.startSystem(Phaser.Physics.BOX2D);
    game.physics.box2d.gravity.y = 500;
    //
    groundSprite = game.add.sprite(320, 460, 'ground');
    game.physics.box2d.enable(groundSprite);
    groundSprite.body.static = true;
    //
    game.input.onDown.add(addCrate, this);
  },
  update: () => {
    // game.physics.box2d.gravity.y = game.rnd.between(0, 500000);
  },
  render: () => {
    game.debug.spriteInfo(groundSprite, 32, 32);
  }
};

let addCrate = (e) => {
  let currentBody = game.physics.box2d.getBodiesAtPoint(e.x, e.y);
  if (currentBody.length > 0) {
    if (!currentBody[0].static) {
      currentBody[0].sprite.destroy();
    }
  } else {
    crateSprite = game.add.sprite(e.x, e.y, 'crate');
    game.physics.box2d.enable(crateSprite);
  }
};
