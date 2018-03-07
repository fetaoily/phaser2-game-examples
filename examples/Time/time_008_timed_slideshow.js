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
      this.pictureA = null;
      this.pictureB = null;
      this.timer = null;
      this.current = 3;
    }

    preload () {
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.scale.pageAlignHorizontally = true;
      this.scale.pageAlignVertically = true;
      //
      game.load.image('picture1', 'assets/pics/cougar_sanity_train.png');
      game.load.image('picture2', 'assets/pics/cougar-face_of_nature.png');
      game.load.image('picture3', 'assets/pics/destop-rewarding.png');
      game.load.image('picture4', 'assets/pics/destop-unknown.png');
      game.load.image('picture5', 'assets/pics/questar.png');
      game.load.image('picture6', 'assets/pics/seven_seas_andromeda_fairfax.png');
      game.load.image('picture7', 'assets/pics/slayer-sorry_im_the_beast.png');
    }

    create () {
      this.stage.setBackgroundColor('#000');
      //
      this.pictureA = this.add.sprite(this.world.centerX, this.world.centerY, 'picture1');
      this.pictureA.anchor.setTo(0.5, 0.5);
      this.pictureA.scale.setTo(2, 2);
      //
      this.pictureB = this.add.sprite(this.world.centerX, this.world.centerY, 'picture2');
      this.pictureB.anchor.setTo(0.5, 0.5);
      this.pictureB.scale.setTo(2, 2);
      this.pictureB.alpha = 0;
      //
      this.timer = this.time.create(false);
      this.timer.add(3000, this.fadePictures, this);
      this.timer.start();
    }

    update () {
    }

    render () {
      this.game.debug.text('Time until event: ' + this.timer.duration.toFixed(0), 10, 10);
    }

    fadePictures () {
      this.tween = null;
      if (this.pictureA.alpha === 1) {
        this.tween = this.add.tween(this.pictureA).to({alpha: 0}, 2000, Phaser.Easing.Linear.None, true);
        this.add.tween(this.pictureB).to({alpha: 1}, 2000, Phaser.Easing.Linear.None, true);
      } else {
        this.add.tween(this.pictureA).to({alpha: 1}, 2000, Phaser.Easing.Linear.None, true);
        this.tween = this.add.tween(this.pictureB).to({alpha: 0}, 2000, Phaser.Easing.Linear.None, true);
      }
      this.tween.onComplete.add(this.changePicture, this);
    }

    changePicture () {
      if (this.pictureA.alpha === 0) {
        this.pictureA.loadTexture('picture' + this.current);
      } else {
        this.pictureB.loadTexture('picture' + this.current);
      }
      this.current++;
      if (this.current > 7) {
        this.current = 1;
      }
      this.timer.add(3000, this.fadePictures, this);
    }
  }
})();