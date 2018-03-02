(() => {
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
      //
      game.load.image('einstein', '/assets/pics/ra_einstein.png');
    },
    create () {
      this.image = game.add.sprite(0, 0, 'einstein');
      game.physics.enable(this.image, Phaser.Physics.ARCADE);
      this.image.body.velocity.x = 150;
    },
    update () {
    },
    render () {
    }
  };
})();