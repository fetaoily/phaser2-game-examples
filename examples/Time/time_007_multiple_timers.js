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
      game.load.image('picture1', '/assets/pics/cougar_sanity_train.png');
      game.load.image('picture2', '/assets/pics/cougar-face_of_nature.png');
      game.load.image('picture3', '/assets/pics/destop-rewarding.png');
      game.load.image('picture4', '/assets/pics/destop-unknown.png');
      game.load.image('picture5', '/assets/pics/questar.png');
      game.load.image('picture6', '/assets/pics/seven_seas_andromeda_fairfax.png');
      game.load.image('picture7', '/assets/pics/slayer-sorry_im_the_beast.png');
    }

    create () {
      let pic1 = this.add.sprite(0, 0, 'picture1');
      let pic2 = this.add.sprite(0, 0, 'picture2');
      let pic3 = this.add.sprite(0, 0, 'picture3');
      let pic4 = this.add.sprite(0, 0, 'picture4');
      let pic5 = this.add.sprite(0, 0, 'picture5');
      let pic6 = this.add.sprite(0, 0, 'picture6');
      let pic7 = this.add.sprite(0, 0, 'picture7');
      let pics = [pic1, pic2, pic3, pic4, pic5, pic6, pic7];
      //
      pics.forEach((pic) => {
        pic.scale.set(0.5);
        pic.visible = false;
        this.time.events.add(0, this.showPicture, this, pic);
      });
      //
      let style = {font: '32px Arial', fill: '#52bace', align: 'center'};
      this.text = this.add.text(this.world.centerX, 64, 'Events: ' + this.time.events.length, style);
      this.text.anchor.set(0.5);
    }

    update () {
      this.text.text = 'Events: ' + this.time.events.length;
    }

    render () {
    }

    showPicture (pic) {
      pic.x = this.rnd.between(0, this.game.width - pic.width);
      pic.y = this.rnd.between(0, this.game.height - pic.height);
      pic.visible = true;
      //
      this.time.events.add(2000, this.removePicture, this, pic);
    }

    removePicture (pic) {
      pic.visible = false;
      this.time.events.add(2000, this.showPicture, this, pic);
    }
  }
})();