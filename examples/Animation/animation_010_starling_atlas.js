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
      //
      this.load.atlasXML('octopus', '/assets/sprites/octopus.png', '/assets/sprites/octopus.xml');
    }

    create () {
      this.stage.setBackgroundColor('#1873ce');
      this.octopus = this.add.sprite(300, 200, 'octopus');
      this.octopus.animations.add('swim');
      this.octopus.animations.play('swim', 30, true);
      //
      this.add.tween(this.octopus).to({y: 300}, 2000, Phaser.Easing.Quadratic.InOut, true, 0, 1000, true);
    }

    update () {
    }

    render () {
    }
  }
})();