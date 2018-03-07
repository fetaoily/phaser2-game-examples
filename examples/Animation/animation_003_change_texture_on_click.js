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
    }

    preload () {
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.scale.pageAlignHorizontally = true;
      this.scale.pageAlignVertically = true;
      //
      this.load.atlasJSONHash('bot', '/assets/sprites/running_bot.png', '/assets/sprites/running_bot.json');
      this.load.spritesheet('mummy', '/assets/sprites/metalslug_mummy37x45.png', 37, 45, 18);
    }

    create () {
      this.bot = this.add.sprite(200, 200, 'bot');
      this.bot.animations.add('run');
      this.bot.animations.play('run', 15, true);
      //
      this.input.onDown.addOnce(this.changeMummy, this);
    }

    update () {
    }

    render () {
      this.game.debug.body(this.bot);
    }

    changeMummy () {
      this.bot.loadTexture('mummy', 0);
      this.bot.animations.add('walk');
      this.bot.animations.play('walk', 30, true);
    }
  }
})();