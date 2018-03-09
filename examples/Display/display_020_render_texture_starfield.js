(() => {
  let game;

  window.onload = () => {
    game = new NewGame();
  };

  class NewGame extends Phaser.Game {
    constructor () {
      super(800, 600, Phaser.AUTO);
      this.state.add("PlayGame", PlayGame);
      this.state.start("PlayGame");
    }
  }

  class PlayGame extends Phaser.State {
    constructor () {
      super();
      this.starts = [];
    }

    preload () {
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.scale.pageAlignHorizontally = true;
      this.scale.pageAlignVertically = true;
      //
      this.load.image("star", "/assets/sprites/bullet.png");
    }

    create () {
      //
      this.start = this.make.sprite(0, 0, "star");
      //
      this.texture1 = this.add.renderTexture(800, 600, "texture1");
      this.texture2 = this.add.renderTexture(800, 600, "texture2");
      this.texture3 = this.add.renderTexture(800, 600, "texture3");
      //
      this.add.sprite(0, 0, this.texture1);
      this.add.sprite(0, 0, this.texture2);
      this.add.sprite(0, 0, this.texture3);
      //
      let t = this.texture1;
      let s = 4;
      for (let i = 0; i < 300; i++) {
        if (i === 100) {
          s = 6;
          t = this.texture2;
        } else if (i === 200) {
          s = 7;
          t = this.texture3;
        }
        this.starts.push({
          x: this.world.randomX,
          y: this.world.randomY,
          speed: s,
          texture: t
        });
      }
    }

    update () {
      for (let i = 0; i < 300; i++) {
        this.starts[i].y += this.starts[i].speed;
        if (this.starts[i].y > 600) {
          this.starts[i].x = this.world.randomX;
          this.starts[i].y = -32;
        }

        if (i === 0 || i === 100 || i === 200) {
          this.starts[i].texture.renderXY(
              this.start,
              this.starts[i].x,
              this.starts[i].y,
              true
          );
        } else {
          this.starts[i].texture.renderXY(
              this.start,
              this.starts[i].x,
              this.starts[i].y,
              false
          );
        }
      }
    }

    render () {
    }
  }
})();
