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
  },
  create () {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.stage.backgroundColor = '#2d2d2d';

    let endData = ['2222'];

    game.create.texture('endTexture', endData, 1, 1, 1);

    let ratData = [
      '.D...........',
      '18...........',
      '1D...........',
      '18.....1111..',
      '1D..111DDEE1.',
      '1811EEE18E0E1',
      '.1DEEEEEEEEED',
      '..1EEEEEE41..',
      '.11E41E1411..',
      '1111E1E1E111.',
      '.1111111111..'
    ];
    game.create.texture('ratTexture', ratData, 4, 4, 4);

    let dudeData = [
      '.......3.....',
      '......333....',
      '....5343335..',
      '...332333333.',
      '..33333333333',
      '..37773337773',
      '..38587778583',
      '..38588888583',
      '..37888888873',
      '...333333333.',
      '.F....5556...',
      '3E34.6757.6..',
      '.E.55.666.5..',
      '......777.5..',
      '.....6..7....',
      '.....7..7....'
    ];
    game.create.texture('phaserDude', dudeData, 4, 4, 0);

    //
    let end = game.add.sprite(0, 600 - 64, 'endTexture');
    end.width = 800;
    end.height = 64;
    //
    this.rats = game.add.physicsGroup();

    let y = 80;

    for (let i = 0; i < 9; i++) {
      let rat = this.rats.create(game.world.randomX, y, 'ratTexture');
      rat.body.velocity.x = game.rnd.between(100, 300);
      y += 48;
    }

    this.player = game.add.sprite(400, 32, 'phaserDude');
    this.player.anchor.set(0.5);

    game.physics.arcade.enable(this.player);

    this.cursors = game.input.keyboard.createCursorKeys();
  },
  update () {
    this.rats.forEach(this.checkPos, this);

    game.physics.arcade.overlap(this.player, this.rats, this.collisionHandler, null, this);

    this.player.body.velocity.x = 0;
    this.player.body.velocity.y = 0;

    if (this.cursors.left.isDown) {
      this.player.body.velocity.x = -200;
      this.player.scale.x = 1;
    } else if (this.cursors.right.isDown) {
      this.player.body.velocity.x = +200;
      this.player.scale.x = -1;
    }

    if (this.cursors.up.isDown) {
      this.player.body.velocity.y = -200;
    } else if (this.cursors.down.isDown) {
      this.player.body.velocity.y = 200;
    }
  },
  render () {
  },
  checkPos (rat) {
    if (rat.x > 800) {
      rat.x = -100;
    }
  },
  collisionHandler (player, rat) {
    this.player.x = 400;
    this.player.y = 32;
  }
};