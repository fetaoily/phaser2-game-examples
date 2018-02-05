let game;
window.onload = () => {
  game = new Phaser.Game(640, 480, Phaser.AUTO);
  game.state.add('PlayGame', playGame);
  game.state.start('PlayGame');
};

class playGame {
  preload () {
    game.load.image('crate', '/assets/sprites/crate.png');
    game.load.image('ground', '/assets/sprites/ground.png');
  }

  create () {
    game.stage.backgroundColor = '#222222';
    game.physics.startSystem(Phaser.Physics.BOX2D);
    game.physics.box2d.gravity.y = 500;
    let groundSprite = game.add.sprite(320, 460, 'ground');
    game.physics.box2d.enable(groundSprite);
    groundSprite.body.static = true;
    game.input.onDown.add(this.addCrate, this);
  }

  update () {
  }

  render () {
    game.debug.text('Phaser Game Examples', 32, 32);
  }

  addCrate (e) {
    let currentBody = game.physics.box2d.getBodiesAtPoint(e.x, e.y);
    if (currentBody.length > 0) {
      if (!currentBody[0].static) {
        currentBody[0].sprite.destroy();
      }
    } else {
      let crateSprite = game.add.sprite(e.x, e.y, 'crate');
      game.physics.box2d.enable(crateSprite);
    }
  }
}
