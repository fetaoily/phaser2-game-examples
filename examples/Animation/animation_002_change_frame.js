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
      this.greenJellyfish = null;
    }

    preload () {
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.scale.pageAlignHorizontally = true;
      this.scale.pageAlignVertically = true;
      //
      this.load.atlas('seacreatures', '/assets/sprites/seacreatures_json.png', '/assets/sprites/seacreatures_json.json');
      this.load.image('undersea', '/assets/pics/undersea.jpg');
    }

    create () {
      this.add.image(0, 0, 'undersea');
      this.greenJellyfish = this.add.sprite(330, 100, 'seacreatures', 'greenJellyfish0000');
      this.input.onDown.add(this.changeFrame, this);
    }

    update () {
    }

    render () {
    }

    changeFrame () {
      let frame = this.rnd.between(0, 32);
      // this.greenJellyfish.frameName = 'greenJellyfish0010';
      this.greenJellyfish.frameName = 'greenJellyfish00' + (frame < 10 ? '0' + frame : frame);
    }
  }
})();