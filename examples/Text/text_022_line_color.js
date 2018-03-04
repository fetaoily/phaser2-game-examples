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
      let textGroup = this.add.group();
      for (let i = 0; i < 10; i++) {
        textGroup.add(this.make.text(100, 64 + i * 32, 'here is a colored line of text', {
          font: '32px Arial',
          fill: this.generateHexColor()
        }));
      }
    }

    update () {
    }

    render () {
    }

    generateHexColor () {
      return '#' + ((0.5 + 0.5 * Math.random()) * 0xffffff << 0).toString(16);
    }
  }

})();
