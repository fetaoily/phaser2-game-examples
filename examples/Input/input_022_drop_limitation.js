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
      game.load.spritesheet('item', '/assets/buttons/number-buttons-90x90.png', 90, 90);
    },
    create () {
      let item;
      for (let i = 0; i < 6; i++) {
        item = game.add.sprite(90, 90 * i, 'item', i);
        item.inputEnabled = true;
        item.input.enableDrag();
        //
        item.input.enableSnap(90, 90, false, true);
        // item.input.enableSnap(90, 90, true, true);
        item.events.onDragStop.add(this.fixLocation);
      }
    },
    update () {
    },
    render () {
      game.debug.text('Group Left.', 100, 560);
      game.debug.text('Group Right.', 280, 560);
    },
    fixLocation (item) {
      if (item.x < 90) {
        item.x = 90;
      } else if (item.x > 180 && item.x < 270) {
        item.x = 180;
      } else if (item.x > 360) {
        item.x = 270;
      }
    }
  };
})();