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
      this.text = null;
      this.textReflect = null;
    }

    preload () {
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.scale.pageAlignHorizontally = true;
      this.scale.pageAlignVertically = true;
    }

    create () {
      this.stage.setBackgroundColor(0x3b0760);
      this.text = this.add.text(this.world.centerX, this.world.centerY, '- PHASER -');
      this.text.anchor.set(0.5);
      this.text.align = 'center';
      this.text.font = 'Arial';
      this.text.fontWeight = 'bold';
      this.text.fontSize = 70;
      this.text.fill = '#ffffff';
      //
      this.textReflect = this.add.text(this.world.centerX, this.world.centerY + 50, '- PHASER -');
      this.textReflect.anchor.set(0.5);
      this.textReflect.align = 'center';
      this.textReflect.scale.y = -1;
      this.textReflect.font = 'Arial';
      this.textReflect.fontWeight = 'bold';
      this.textReflect.fontSize = 70;
      //
      let grd = this.textReflect.context.createLinearGradient(0, 0, 0, this.text.canvas.height);
      grd.addColorStop(0, 'rgba(255,255,255,0)');
      grd.addColorStop(1, 'rgba(255,255,255,0.08)');
      this.textReflect.fill = grd;
    }

    update () {
    }

    render () {
    }
  }
})();
