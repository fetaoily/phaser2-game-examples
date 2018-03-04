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
    }

    create () {
      this.stage.setBackgroundColor(0xfbf6d5);
      //
      this.text = game.add.text(this.world.centerX, 250, ' dynamic shadows ');
      this.text.anchor.set(0.5);
      this.text.align = 'center';
      this.text.font = 'Arial Black';
      this.text.fontSize = 70;
      this.text.fontWeight = 'bold';
      this.text.fill = '#ec008c';
      this.text.setShadow(0, 0, 'rgba(0,0,0,0.5)', 0);

    }

    update () {
      let offset = this.moveToXY(game.input.activePointer, this.text.x, this.text.y, 8);
      this.text.setShadow(offset.x, offset.y, 'rgba(0,0,0,0.5)', this.distanceToPointer(this.text, game.input.activePointer) / 30);
    }

    render () {
    }

    moveToXY (displayObject, x, y, speed) {
      let _angle = Math.atan2(y - displayObject.y, x - displayObject.x);
      let x1 = Math.cos(_angle) * speed;
      let y1 = Math.sin(_angle) * speed;
      return { x: x1, y: y1 };
    }

    distanceToPointer (displayObject, pointer) {
      this._dx = displayObject.x - pointer.x;
      this._dy = displayObject.y - pointer.y;
      return Math.sqrt(this._dx * this._dx + this._dy * this._dy);
    }
  }
})();
