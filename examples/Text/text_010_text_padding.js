(() => {
  let game;

  window.onload = () => {
    game = new NewGame();
  };

  class NewGame extends Phaser.Game {
    constructor () {
      super(800, 600, Phaser.CANVAS);
      this.state.add('PlayGame', PlayGame);
      this.state.start('PlayGame');
    }
  }

  class PlayGame extends Phaser.State {
    constructor () {
      super();
      this.WebFontConfig = {
        active: () => {
          game.time.events.add(Phaser.Timer.SECOND, this.createText, this);
        },
        google: {
          families: ['Fontdiner Swanky']
        }
      };
    }

    preload () {
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.scale.pageAlignHorizontally = true;
      this.scale.pageAlignVertically = true;
      //
      this.load.script('webfont', '/assets/text/webfont.js');
    }

    create () {
      this.stage.setBackgroundColor(0x2d2d2d);
      this.createText();
    }

    update () {
    }

    render () {
    }

    createText () {
      this.text = game.add.text(this.world.centerX, this.world.centerY, '- phaser -\nrocking with\ngoogle web fonts');
      this.text.anchor.setTo(0.5);
      this.text.font = 'Fontdiner Swanky';
      this.text.fontsize = 60;
      this.text.padding.set(10, 16);
      //
      this.grd = this.text.context.createLinearGradient(0, 0, 0, this.text.canvas.height);
      this.grd.addColorStop(0, '#8ed6ff');
      this.grd.addColorStop(1, '#004cb3');
      //
      this.text.fill = this.grd;
      this.text.align = 'center';
      this.text.stroke = '#000000';
      this.text.strokeThickness = 2;
      this.text.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);
      this.text.inputEnabled = true;
      this.text.input.enableDrag();
      this.text.events.onInputOver.add(this.over, this);
      this.text.events.onInputOut.add(this.out, this);
    }

    out () {
      this.text.fill = this.grd;
    }

    over () {
      this.text.fill = '#ff00ff';
    }
  }
})();
