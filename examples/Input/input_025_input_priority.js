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
      game.load.image('manga', '/assets/pics/manga-girl.png');
      game.load.image('disk', '/assets/sprites/copy-that-floppy.png');
      game.load.image('card', '/assets/sprites/mana_card.png');
    },
    create () {
      game.stage.backgroundColor = '#4b0049';
      //
      let manga = game.add.sprite(100, 100, 'manga');
      manga.inputEnabled = true;
      manga.input.enableDrag(false, false, true);
      manga.input.priorityID = 2;
      //
      let disk = game.add.sprite(200, 200, 'disk');
      disk.alpha = 0.7;
      disk.inputEnabled = true;
      disk.input.enableDrag(false, false, true);
      disk.input.priorityID = 1;
      //
      let card = game.add.sprite(300, 300, 'card');
      card.inputEnabled = true;
      card.input.enableDrag(false, false, true);
      card.input.priorityID = 0;
    },
    update () {
    },
    render () {
      game.debug.text('Drag the Sprites', 32, 32);
    }
  };
})();