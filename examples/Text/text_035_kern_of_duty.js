(() => {
  let game;
  let content = [
    " ",
    "photon storm presents",
    "a phaser production",
    " ",
    "Kern of Duty",
    " ",
    "directed by rich davey",
    "rendering by mat groves",
    "    ",
    "03:45, November 4th, 2014",
    "somewhere in the north pacific",
    "mission control bravo ...",
  ];

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
      this.index = 0;
      this.line = 0;
    }

    preload () {
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.scale.pageAlignHorizontally = true;
      this.scale.pageAlignVertically = true;
      //
      this.load.image('cod', '/assets/pics/cod.jpg')
    }

    create () {
      this.add.sprite(0, 0, 'cod');
      this.text = this.add.text(32, 380, '', {
        font: '30pt Courier', fill: '#19cb65', stroke: '#119f4e', strokeThickness: 2
      });
      this.nextLine();
    }

    update () {
    }

    render () {
      game.debug.text('index:' + this.index, 32, 32);
      game.debug.text('line:' + this.line, 32, 32 * 2);
    }

    updateLine () {
      if (this.line.length < content[this.index].length) {
        this.line = content[this.index].substr(0, this.line.length + 1);
        this.text.setText(this.line);
        console.info(this.line);
      } else {
        this.time.events.add(Phaser.Timer.SECOND * 2, this.nextLine, this);
      }
    }

    nextLine () {
      this.index++;
      if (this.index < content.length) {
        this.line = '';
        this.time.events.repeat(80, content[this.index].length + 1, this.updateLine, this);
      }
    }
  }
})();