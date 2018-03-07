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
      this.jellyfish = null;
      this.crab = null;
      this.greenJellyfish = null;
      this.octopus = null;
      this.purpleFish = null;
      this.seahorse = null;
      this.squid = null;
      this.stingray = null;
      this.flyingfish = null;
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
      this.add.image(0, 0, 'undersea');
      //
      this.jellyfish = this.add.sprite(670, 20, 'seacreatures');
      this.jellyfish.animations.add('swim', Phaser.Animation.generateFrameNames('blueJellyfish', 0, 32, '', 4), 30, true);
      this.jellyfish.animations.play('swim');
      //
      this.crab = this.add.sprite(550, 480, 'seacreatures');
      this.crab.animations.add('swim', Phaser.Animation.generateFrameNames('crab1', 0, 25, '', 4), 30, true);
      this.crab.animations.play('swim');
      //
      this.greenJellyfish = this.add.sprite(330, 100, 'seacreatures');
      this.greenJellyfish.animations.add('swim', Phaser.Animation.generateFrameNames('greenJellyfish', 0, 39, '', 4), 30, true);
      this.greenJellyfish.animations.play('swim');
      //
      this.octopus = this.add.sprite(160, 400, 'seacreatures');
      this.octopus.animations.add('swim', Phaser.Animation.generateFrameNames('octopus', 0, 24, '', 4), 30, true);
      this.octopus.animations.play('swim');
      //
      this.purpleFish = this.add.sprite(800, 413, 'seacreatures');
      this.purpleFish.animations.add('swim', Phaser.Animation.generateFrameNames('purpleFish', 0, 20, '', 4), 30, true);
      this.purpleFish.animations.play('swim');
      //
      this.seahorse = this.add.sprite(491, 40, 'seacreatures');
      this.seahorse.animations.add('swim', Phaser.Animation.generateFrameNames('seahorse', 0, 5, '', 4), 30, true);
      this.seahorse.animations.play('swim');
      //
      this.squid = this.add.sprite(610, 190, 'seacreatures', 'squid0000');
      //
      this.stingray = this.add.sprite(80, 190, 'seacreatures');
      this.stingray.animations.add('swim', Phaser.Animation.generateFrameNames('stingray', 0, 23, '', 4), 30, true);
      this.stingray.animations.play('swim');
      //
      this.flyingfish = this.add.sprite(60, 40, 'seacreatures', 'flyingFish0000');
      //
      this.add.image(0, 466, 'coral');
      //
      this.add.tween(this.purpleFish).to({x: -200}, 7500, Phaser.Easing.Quadratic.InOut, true, 0, 1000, false);
      this.add.tween(this.octopus).to({y: 530}, 2000, Phaser.Easing.Quadratic.InOut, true, 0, 1000, true);
      this.add.tween(this.greenJellyfish).to({y: 250}, 4000, Phaser.Easing.Quadratic.InOut, true, 0, 1000, true);
      this.add.tween(this.jellyfish).to({y: 100}, 8000, Phaser.Easing.Quadratic.InOut, true, 0, 1000, true);

    }

    update () {
    }

    render () {
    }
  }
})();