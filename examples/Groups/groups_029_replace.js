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
      this.left = null;
      this.right = null;
      this.selected = null;
      this.leftText = null;
      this.rightText = null;
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
    }

    create() {
      this.left = this.add.group();
      this.right = this.add.group();
      //
      let item;
      for (let i = 0; i < 3; i++) {
        item = this.left.create(290, 98 * (i + 1), 'item', i);
        item.inputEnabled = true;
        item.events.onInputUp.add(this.select,this);
        //
        item = this.right.create(400, 98 * (i + 1), 'item', i + 3);
        item.inputEnabled = true;
        item.events.onInputUp.add(this.select, this);
      }
      //
      this.leftText = this.add.text(290, 20, '', {
        font: '14px Arial',
        fill: '#fff'
      });
      this.rightText = this.add.text(400, 20, '', {
        font: '14px Arial',
        fill: '#fff'
      });
      //
      this.leftText.text = 'Left Group\nTotal: ' + this.left.total;
      this.rightText.text = 'Right Group\nTotal: ' + this.right.total;
      //
      this.add.text(260, 450, 'Click one item, then another to replace it', {
        font: '14px Arial',
        fill: '#fff'
      });
    }

    update() {}

    render() {}

    select(item, pointer) {
      if (!this.selected) {
        this.selected = item;
        this.selected.alpha = 0.5;
      } else {
        if (this.selected.parent !== item.parent) {
          this.add
            .tween(item)
            .to(
              { x: this.selected.x, y: this.selected.y },
              500,
              Phaser.Easing.Quartic.Out,
              true
            );
          //
          this.selected.parent.replace(this.selected, item);
          this.selected.inputEnabled = false;
          //
          this.leftText.text = 'Left Group\nTotal: ' + this.left.total;
          this.rightText.text = 'Right Group\nTotal: ' + this.right.total;
        } else {
          this.selected.alpha = 1;
        }
        this.selected = null;
      }
    }
  }
})();
