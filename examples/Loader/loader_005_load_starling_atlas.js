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
      this.load.atlasXML('seacreatures', '/assets/sprites/seacreatures.png', '/assets/sprites/seacreatures.xml');
      this.load.image('undersea', '/assets/pics/undersea.jpg');
      this.load.image('coral', '/assets/pics/seabed.png');
    }

    create () {
      this.add.sprite(0, 0, 'undersea');
      this.jellyfish = this.add.sprite(330, 100, 'seacreatures');
      this.jellyfish.animations.add('swim', Phaser.Animation.generateFrameNames('greenJellyfish', 0, 39, '', 4), 30, true);
      this.jellyfish.animations.play('swim');
      //
      this.add.sprite(0, 466, 'coral');
      this.add.tween(this.jellyfish).to({y: 250}, 4000, Phaser.Easing.Quadratic.InOut, true, 0, 100000, true);
    }

    update () {
    }

    render () {
      this.game.debug.spriteInfo(this.jellyfish, 32, 32);
    }
  }
})();