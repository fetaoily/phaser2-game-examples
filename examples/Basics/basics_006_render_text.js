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
    },
    create () {
      this.text = '- phaser -\n with a sprinkle of \n pixi dust.';
      this.style = {font: '65px Arial', fill: '#ff0044', align: 'center'};
      this.t = game.add.text(game.world.centerX - 300, 0, this.text, this.style);
    },
    update () {
    },
    render () {
    }
  };
})();