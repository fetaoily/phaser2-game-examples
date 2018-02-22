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
    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.stage.backgroundColor = '#2d2d2d';

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

    this.player = game.add.sprite(300, 300, 'phaserDude');
    this.player.anchor.set(0.5);

    game.physics.arcade.enable(this.player);

    this.cursors = game.input.keyboard.createCursorKeys();
  },
  update () {
    this.player.body.velocity.x = 0;
    this.player.body.velocity.y = 0;
    //
    if (this.cursors.left.isDown) {
      this.player.body.velocity.x = -200;
      this.player.scale.x = 2;
      this.player.scale.y = 2;
    } else if (this.cursors.right.isDown) {
      this.player.body.velocity.x = 200;
      this.player.scale.x = -1;
      this.player.scale.y = -1;
    }
    //
    if (this.cursors.up.isDown) {
      this.player.body.velocity.y = -200;
    } else if (this.cursors.down.isDown) {
      this.player.body.velocity.y = +200;
    }
  },
  render () {
  }
};