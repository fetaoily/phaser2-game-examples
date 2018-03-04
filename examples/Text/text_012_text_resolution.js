(() => {
  let game;
  let config;

  window.onload = () => {
    config = {
      width: 800,
      height: 600,
      renderer: Phaser.AUTO,
      parent: 'phaser-example',
      resolution: window.devicePixelRatio,
      state: PlayGame
    };
    game = new NewGame();
  };


  class NewGame extends Phaser.Game {
    constructor () {
      super(config);
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
      this.stage.backgroundColor = '#5d5d5d';
      this.text = this.add.text(32, 164, 'High DPI Text', {
        font: 'Bold 86px Arial',
        fill: '#ffffff'
      });
      this.text2 = this.add.text(32, 300, 'Low DPI Text', {
        font: 'Bold 86px Arial',
        fill: '#ffffff'
      });
      this.text2.resolution = 1;
    }

    update () {
    }

    render () {
    }
  }
})();
