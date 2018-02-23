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
    this.count = 0;
    //
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    //
    game.load.image('starfield', '/assets/misc/starfield.jpg');
    game.load.spritesheet('mummy', '/assets/sprites/metalslug_mummy37x45.png', 37, 45, 18);
    game.load.atlas('seacreatures', '/assets/sprites/seacreatures_json.png', '/assets/sprites/seacreatures_json.json')
  },
  create () {
    // this.sprite = game.add.tileSprite(0, 0, 800, 600, 'mummy');
    // this.sprite.animations.add('walk');
    // this.sprite.animations.play('walk', 20, true);
    //
    this.sprite = game.add.tileSprite(0, 0, 800, 600, 'seacreatures', 'octopus0002');
    this.sprite.animations.add('swim', Phaser.Animation.generateFrameNames('octopus', 0, 24, '', 4), 30, true);
    this.sprite.animations.play('swim');
    //
    this.cursors = game.input.keyboard.createCursorKeys();
  },
  update () {
    this.count += 0.005;
    this.sprite.tileScale.x = 2 + Math.sin(this.count);
    this.sprite.tileScale.y = 2 + Math.cos(this.count);
    //
    this.sprite.tilePosition.x += 1;
    this.sprite.tilePosition.y += 1;
    //
    if (this.cursors.left.isDown) {
      this.sprite.tilePosition.x += 4;
    } else if (this.cursors.right.isDown) {
      this.sprite.tilePosition.x -= 4;
    }
    //
    if (this.cursors.up.isDown) {
      this.sprite.tilePosition.y += 4;
    } else if (this.cursors.down.isDown) {
      this.sprite.tilePosition.y -= 4;
    }
  },
  render () {
    game.debug.text(this.sprite.frame, 32, 32);
  }
};