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
      game.load.atlasJSONHash('bot', '/assets/sprites/running_bot.png', '/assets/sprites/running_bot.json');
    },
    create () {
      this.bot = game.add.sprite(200,200,'bot');
      this.bot.animations.add('run');
      this.bot.animations.play('run',15,true);
    },
    update () {
    },
    render () {
    }
  };
})();