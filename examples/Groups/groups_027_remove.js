(() => {
  'use strict';
  let game;

  window.onload = () => {
    game = new NewGame();
  };

  class NewGame extends ErtaoGame {
    constructor() {
      super(800, 600, Phaser.AUTO);
      this.state.add('PlayGame', PlayGame);
      this.state.start('PlayGame');
    }
  }

  class PlayGame extends ErtaoGameState {
    constructor() {
      super();
      this.items = null;
    }

    preload() {
      super.preload();
      //
      this.load.spritesheet(
        'item',
        '/assets/buttons/number-buttons-90x90.png',
        90,
        90
      );
      this.load.image('rect', '/assets/tests/200x100corners.png');
    }

    create() {
      this.items = this.add.group();
      //
      let item;
      for (let i = 0; i < 6; i++) {
        item = this.items.create(90, 16 + 90 * i, 'item', i);
        item.name = 'block' + i;
        item.inputEnabled = true;
        item.input.enableDrag();
        item.input.enableSnap(90, 90, false, true);
        item.events.onDragStop.add(this.dropHandler, this);
      }
      //
      let rect = this.add.sprite(390, 0, 'rect');
      rect.scale.setTo(2.0, 3.0);
    }

    update() {}

    render() {
      this.game.debug.text('Group size: ' + this.items.total, 74, 500);
      this.game.debug.text('Drop there to remove item from the Group', 394, 24);
    }

    dropHandler(item, pointer) {
      if (item.x < 90) {
        item.x = 90;
      } else if (item.x > 400) {
        this.items.remove(item);
      }
    }
  }
})();
