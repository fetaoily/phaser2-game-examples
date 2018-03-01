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
      //
      game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      game.scale.pageAlignHorizontally = true;
      game.scale.pageAlignVertically = true;
      //
      game.load.image('atari1', 'assets/sprites/atari130xe.png');
      game.load.image('atari2', 'assets/sprites/atari800xl.png');
      game.load.image('atari4', 'assets/sprites/atari800.png');
      game.load.image('sonic', 'assets/sprites/sonic_havok_sanity.png');
      game.load.image('duck', 'assets/sprites/darkwing_crazy.png');
      game.load.image('firstaid', 'assets/sprites/firstaid.png');
      game.load.image('diamond', 'assets/sprites/diamond.png');
      game.load.image('mushroom', 'assets/sprites/mushroom2.png');
    },
    create () {
      let images = game.cache.getKeys(Phaser.Cache.IMAGE);
      for (let i = 0; i < 20; i++) {
        let img = game.rnd.pick(images);
        let tempSprite = game.add.sprite(game.world.randomX, game.world.randomY, img);
        tempSprite.inputEnabled = true;
        tempSprite.input.enableDrag(false, true);
      }
    },
    update () {
      game.debug.inputInfo(32, 32);
    },
    render () {
    }
  }
})();