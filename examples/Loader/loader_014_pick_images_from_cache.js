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
      game.load.image('atari1', '/assets/sprites/atari130xe.png');
      game.load.image('atari2', '/assets/sprites/atari800xl.png');
      game.load.image('atari4', '/assets/sprites/atari800.png');
      game.load.image('sonic', '/assets/sprites/sonic_havok_sanity.png');
      game.load.image('duck', '/assets/sprites/darkwing_crazy.png');
      game.load.image('firstaid', '/assets/sprites/firstaid.png');
      game.load.image('diamond', '/assets/sprites/diamond.png');
      game.load.image('mushroom', '/assets/sprites/mushroom2.png');
    }

    create () {
      this.images = this.cache.getKeys(Phaser.Cache.IMAGE);
      for (let i = 0; i < 20; i++) {
        let img = this.rnd.pick(this.images);
        let tempSprite = this.add.sprite(this.world.randomX, this.world.randomY, img);
        tempSprite.inputEnabled = true;
        tempSprite.input.enableDrag(false, true);
      }
    }

    update () {
    }

    render () {
      this.game.debug.pointer(this.input.activePointer);
      game.debug.inputInfo(32, 32);
    }
  }
})();