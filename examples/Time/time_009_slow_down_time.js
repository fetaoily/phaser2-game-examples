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
      this.load.image('ball', '/assets/sprites/pangball.png');
    }

    create () {
      this.time.advancedTiming = true;
      this.time.desiredFps = 60;
      this.time.slowMotion = 1;
      //
      this.ballMovement = this.add.sprite(100, 100, 'ball');
      this.ballMovement.anchor.set(0.5);
      this.ballMovement.vy = 0;
      //
      this.ballTween = this.add.sprite(150, 100, 'ball');
      this.ballTween.anchor.set(0.5);
      this.startFall(this.ballTween);
      //
      this.emitter = this.add.emitter(this.world.centerX, 200, 200);
      this.emitter.makeParticles('ball');
      this.emitter.start(false, 5000, 20);
      //
      this.wasteTime = 0;
      //
      this.gui = new dat.GUI();
      this.gui.add(this.game.time, "slowMotion", 1, 16).step(1);
      this.gui.add(this, "wasteTime", 0, 10).step(1);
      this.gui.add(this.game.time, "desiredFps", 10, 60).step(5);
      //
      this.game.fpsProblemNotifier.add(this.handleFpsProblem, this);

    }

    update () {
    }

    render () {
    }

    startFall (_sprite) {
      this.add.tween(_sprite).to({y: 400}, 500, Phaser.Easing.Quadratic.InOut, true).onComplete.addOnce(this.bounceTween, this);
    }

    bounceTween (_sprite) {
      this.add.tween(_sprite).to({y: 100}, 500, Phaser.Easing.Quadratic.InOut, true).onComplete.addOnce(this.startFall, this);
    }

    handleFpsProblem () {
      this.time.desiredFps = this.time.suggestedFps;
    }
  }

})();