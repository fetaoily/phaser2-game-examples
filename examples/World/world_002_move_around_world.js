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
    game.load.image('mushroom', '/assets/sprites/mushroom2.png');
    game.load.image('phaser', '/assets/sprites/sonic_havok_sanity.png');
  },
  create () {
    game.world.setBounds(-2000, -2000, 4000, 4000);
    // game.world.resize(3000, 600);

    for (let i = 0; i < 100; i++) {
      game.add.sprite(game.world.randomX, game.world.randomY, 'mushroom');
    }

    game.add.text(600, 800, '- phaser -', {font: '32px Arial', fill: '#330088', align: 'center'});

    let g = game.add.group();
    g.x = 500;
    this.d = g.create(100, 300, 'phaser');
    this.d.anchor.setTo(0.5, 0.5);

    this.cursors = game.input.keyboard.createCursorKeys();
  },
  update () {
    this.d.angle += 1;
    if (this.cursors.up.isDown) {
      if (this.cursors.up.shiftKey) {
        this.d.angle++;
      } else {
        game.camera.y -= 4;
      }
    } else if (this.cursors.down.isDown) {
      if (this.cursors.down.shiftKey) {
        this.d.angle--;
      } else {
        game.camera.y += 4;
      }
    }
    //
    if (this.cursors.left.isDown) {
      if (this.cursors.left.shiftKey) {
        game.world.rotation -= 0.05;
      } else {
        game.camera.x -= 4;
      }
    } else if (this.cursors.right.isDown) {
      if (this.cursors.right.shiftKey) {
        game.world.rotation += 0.05;
      } else {
        game.camera.x += 4;
      }
    }
  },
  render () {
    game.debug.cameraInfo(game.camera, 32, 32);
  }
};