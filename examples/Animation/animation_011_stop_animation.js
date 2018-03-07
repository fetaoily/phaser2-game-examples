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
      //
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.scale.pageAlignHorizontally = true;
      this.scale.pageAlignVertically = true;
      //
      this.load.atlas('seacreatures', '/assets/sprites/seacreatures_json.png', '/assets/sprites/seacreatures_json.json');
      this.load.image('undersea', '/assets/pics/undersea.jpg');
      this.load.image('coral', '/assets/pics/seabed.png');
    }

    create () {
      this.add.image(0, 0, 'undersea');
      this.add.sprite(32, 32, 'seacreatures', 'greenJellyfish0000');
      //
      this.greenJellyfish = this.add.sprite(330, 100, 'seacreatures');
      this.greenJellyfish.animations.add('swim', Phaser.Animation.generateFrameNames('greenJellyfish', 0, 39, '', 4), 30, true);
      this.greenJellyfish.animations.play('swim');
      //
      this.add.image(0, 466, 'coral');
      this.add.tween(this.greenJellyfish).to({y: 250}, 4000, Phaser.Easing.Quadratic.InOut, true, 0, 1000, true);
      //
      this.input.onDown.addOnce(this.stopAnimation, this);
    }

    update () {
    }

    render () {
    }

    stopAnimation () {
      console.info(this.greenJellyfish.animations);
      this.greenJellyfish.animations.stop(null, true);
    }
  }
})();