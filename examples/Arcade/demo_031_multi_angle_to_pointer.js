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
  }
};
