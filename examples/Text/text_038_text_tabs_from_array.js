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
      this.WebFontConfig = {
        active: function () {
          game.time.events.add(Phaser.Timer.SECOND, this.createText, this);
        },
        google: {
          families: ['Finger Paint']
        }
      };
    }

    preload () {
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.scale.pageAlignHorizontally = true;
      this.scale.pageAlignVertically = true;
      //
      this.load.image('bg', '/assets/skies/deepblue.png');
      this.load.script('webfont', '/assets/text/webfont.js');
    }

    create () {
      this.add.image(0, 0, 'bg');
      this.createText();
    }

    update () {
    }

    render () {
    }

    createText () {
      let style = {font: '28px Finger Paint', fill: '#fff', tabs: [150, 150, 200]};
      this.text1 = this.add.text(32, 64, 'Armor\tSpells\tDamage\tWeapons', style);
      this.text1.setShadow(-3, 3, 'rgba(0,0,0,0.5)', 0);
      this.text2 = this.add.text(32, 180, '100\tFire\t+50\tAxe\n67\tIce\t+25\tStaff', style);
      this.text2.setShadow(-3, 3, 'rgba(0,0,0,0.5)', 0);
    }
  }
})();