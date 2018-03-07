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
      this.text = null;
      this.button = null;
      this.x = 32;
      this.y = 80;
    }

    preload () {
      //
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.scale.pageAlignHorizontally = true;
      this.scale.pageAlignVertically = true;
      //
      this.load.spritesheet('button', '/assets/buttons/button_sprite_sheet.png', 193, 71);
    }

    create () {
      this.stage.setBackgroundColor('#182d3b');
      //
      this.load.onLoadStart.add(this.loadStart, this);
      this.load.onFileComplete.add(this.fileComplete, this);
      this.load.onLoadComplete.add(this.loadComplete, this);
      //
      this.button = this.add.button(this.world.centerX - 95, 400, 'button', this.start, this, 2, 1, 0);
      //
      this.text = this.add.text(32, 32, 'Click to start load', {fill: '#ffffff'});
    }

    update () {
    }

    render () {
    }

    start () {
      game.load.image('picture1', '/assets/pics/mighty_no_09_cover_art_by_robduenas.jpg');
      game.load.image('picture2', '/assets/pics/cougar_dragonsun.png');
      game.load.image('picture3', '/assets/pics/trsipic1_lazur.jpg');
      game.load.image('picture4', '/assets/pics/archmage_in_your_face.png');
      game.load.image('picture5', '/assets/pics/acryl_bladerunner.png');
      game.load.image('picture6', '/assets/pics/acryl_bobablast.png');
      game.load.image('picture7', '/assets/pics/alex-bisleys_horsy_5.png');
      //
      this.load.start();
    }

    loadStart () {
      this.text.setText('Loading ...');
    }

    fileComplete (progress, cacheKey, success, totalLoaded, totalFiles) {
      this.text.setText('File Complete: ' + progress + '% - ' + totalLoaded + ' out of ' + totalFiles);
      let newImage = this.add.image(this.x, this.y, cacheKey);
      newImage.scale.set(0.3);
      this.x += newImage.width + 20;
      if (this.x > 700) {
        this.x = 32;
        this.y += 332;
      }
    }

    loadComplete () {
      this.text.setText('Load Complete');
    }
  }
})();