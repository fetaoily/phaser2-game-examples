(() => {
  let game;

  window.onload = () => {
    game = new NewGame();
  }

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
      //
      this.load.image('imageKey', '/assets/sprites/phaser2.png');
    }

    create () {
      this.add.sprite(0, 0, 'imageKey');
    }

    update () {
    }

    render () {
    }
  }
})();