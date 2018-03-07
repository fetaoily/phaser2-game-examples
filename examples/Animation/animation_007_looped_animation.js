(() => {
  let game;

  window.onload = () => {
    game = new NewGame();
  };

  class NewGame extends Phaser.Game {
    constructor () {
      super(800, 600, Phaser.AUTO);
      this.state.add('PlayGame', PlayGame);
      this.state.start('PlayGame');
    }
  }

  class PlayGame extends Phaser.State {
    constructor () {
      super();
      this.bot = null;
    }

    preload () {
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.scale.pageAlignHorizontally = true;
      this.scale.pageAlignVertically = true;
      //
      this.load.atlasJSONHash('bot', '/assets/sprites/running_bot.png', '/assets/sprites/running_bot.json');
    }

    create () {
      this.bot = this.add.sprite(200, 200, 'bot');
      this.bot.animations.add('run');
      this.bot.animations.play('run', 15, true);
    }

    update () {
      this.bot.x -= 2;
      if (this.bot.x < -this.bot.width) {
        this.bot.x = this.world.width;
      }
    }

    render () {
    }
  }
})();