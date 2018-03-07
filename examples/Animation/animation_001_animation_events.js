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
      this.back = null;
      this.mummy = null;
      this.anim = null;
      this.loopText = null;
    }

    preload () {
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.scale.pageAlignHorizontally = true;
      this.scale.pageAlignVertically = true;
      //
      this.load.image('lazur', '/assets/pics/thorn_lazur.png');
      this.load.spritesheet('mummy', '/assets/sprites/metalslug_mummy37x45.png', 37, 45, 18);
    }

    create () {
      this.back = this.add.image(0, -400, 'lazur');
      this.back.scale.set(2);
      this.back.smoothed = false;
      //
      this.mummy = this.add.sprite(200, 350, 'mummy', 5);
      this.mummy.scale.set(4);
      this.mummy.smoothed = false;
      //
      this.anim = this.mummy.animations.add('walk');
      this.anim.onStart.add(this.animationStarted, this);
      this.anim.onLoop.add(this.animationLooped, this);
      this.anim.onComplete.add(this.animationStopped, this);
      this.anim.play(10, true);
    }

    update () {
    }

    render () {
    }

    animationStarted (sprite, animation) {
      this.add.text(32, 32, 'Animation started', {fill: 'white'});
    }

    animationLooped (sprite, animation) {
      if (animation.loopCount === 1) {
        this.loopText = this.add.text(32, 64, 'Animation looped', {fill: 'white'});
      } else {
        this.loopText.text = 'Animation looped x2';
        animation.loop = false;
      }
    }

    animationStopped (sprite, animation) {
      this.add.text(32, 32 * 3, 'Animation stopped', {fill: 'white'});
    }
  }
})();