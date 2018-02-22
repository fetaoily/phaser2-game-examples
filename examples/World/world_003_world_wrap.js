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
    game.scale.pageAlignHorizontally = true
    game.scale.pageAlignVertically = true;
    //
    game.load.image('backdrop', '/assets/pics/remember-me.jpg');
    game.load.image('card', '/assets/sprites/mana_card.png');
  },
  create () {
    game.world.setBounds(0, 0, 1920, 1200);
    game.add.sprite(0, 0, 'backdrop');

    this.card = game.add.sprite(200, 200, 'card');

    game.camera.follow(this.card);

    this.cursors = game.input.keyboard.createCursorKeys();
  },
  update () {
    if (this.cursors.left.isDown) {
      this.card.x -= 4;
    } else if (this.cursors.right.isDown) {
      this.card.x += 4;
    }

    if (this.cursors.up.isDown) {
      this.card.y -= 4;
    } else if (this.cursors.down.isDown) {
      this.card.y += 4;
    }

    game.world.wrap(this.card, 0, true);

  },
  render () {
    game.debug.cameraInfo(game.camera, 500, 32);
    game.debug.spriteCoords(this.card, 32, 32);
  }
};