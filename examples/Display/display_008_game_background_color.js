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
      this.load.image('hotdog', '/assets/sprites/hotdog.png');
    }

    create () {
      this.stage.setBackgroundColor('#4488AA');
      this.stage.setBackgroundColor(0x4488aa);
      this.stage.setBackgroundColor('rgb(68,136,170)');
      this.stage.setBackgroundColor('rgba(68,136,170,0.5)');
      //
      this.add.image(this.world.centerX, this.world.centerY, 'hotdog').anchor.set(0.5);
      this.input.onDown.add(this.changeColor, this);
    }

    update () {
    }

    render () {
    }

    changeColor () {
      let c = Phaser.Color.getRandomColor(50, 255, 255);
      this.stage.setBackgroundColor(c);
      // game.fd.record(4);
    }
  }
})();