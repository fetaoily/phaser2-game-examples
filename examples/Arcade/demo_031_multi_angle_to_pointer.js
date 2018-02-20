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
    game.load.image('arrow', '/assets/sprites/longarrow.png');
  },
  create () {
    //
    game.physics.startSystem(Phaser.Physics.ARCADE);
    //
    game.stage.backgroundColor = '#363636';
    //
    this.sprite1 = game.add.sprite(game.world.randomX, game.world.randomY, 'arrow');
    this.sprite2 = game.add.sprite(game.world.randomX, game.world.randomY, 'arrow');
    this.sprite3 = game.add.sprite(game.world.randomX, game.world.randomY, 'arrow');
    this.sprite4 = game.add.sprite(game.world.randomX, game.world.randomY, 'arrow');
    //
    this.sprite1.anchor.set(0.1, 0.5);
    this.sprite2.anchor.set(0.1, 0.5);
    this.sprite3.anchor.set(0.1, 0.5);
    this.sprite4.anchor.set(0.1, 0.5);
  },
  update () {
    this.sprite1.rotation = game.physics.arcade.angleToPointer(this.sprite1);
    this.sprite2.rotation = game.physics.arcade.angleToPointer(this.sprite2);
    this.sprite3.rotation = game.physics.arcade.angleToPointer(this.sprite3);
    this.sprite4.rotation = game.physics.arcade.angleToPointer(this.sprite4);
  },
  render () {
    game.debug.text('sprite1 angle to pointer: ' + this.sprite1.rotation, 32, 32);
    game.debug.text('sprite2 angle to pointer: ' + this.sprite2.rotation, 32, 32 * 2);
    game.debug.text('sprite3 angle to pointer: ' + this.sprite3.rotation, 32, 32 * 3);
    game.debug.text('sprite4 angle to pointer: ' + this.sprite4.rotation, 32, 32 * 4);
    //
    game.debug.text('sprite1:' + this.sprite1.rotation, this.sprite1.x, this.sprite1.y, 'red');
    game.debug.text('sprite2:' + this.sprite2.rotation, this.sprite2.x, this.sprite2.y, 'green');
    game.debug.text('sprite3:' + this.sprite3.rotation, this.sprite3.x, this.sprite3.y, 'blue');
    game.debug.text('sprite4:' + this.sprite4.rotation, this.sprite4.x, this.sprite4.y, 'yellow');
  }
};
