(() => {
  let game;

  window.onload = () => {
    game = new Phaser.Game(800, 600, Phaser.AUTO);
    game.state.add('PlayGame', PlayGame);
    game.state.start('PlayGame');
  };

  let PlayGame = function () {
  };

  PlayGame.prototype = {
    preload () {
      game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      game.scale.pageAlignHorizontally = true;
      game.scale.pageAlignVertically = true;
      //
      game.load.image('pic', '/assets/pics/fof_background.png');
    },
    create () {
      game.stage.backgroundColor = 0x5d5d5d;
      //
      this.sprite = game.add.sprite(200, 200, 'pic');
      this.sprite.anchor.set(0.5);
      this.sprite.inputEnabled = true;
      this.sprite.input.enableDrag();
      //
      let style = {
        font: '32px Arial',
        fill: '#ff0044',
        worldWrap: true,
        worldWrapWidth: this.sprite.width,
        align: 'center'
      };
      this.text = game.add.text(0, 0, '- text on a sprite - \n drag me', style);
      this.text.anchor.set(0.5);

    },
    update () {
      // this.text.x = Math.floor(this.sprite.x + this.sprite.width / 2);
      // this.text.y = Math.floor(this.sprite.y + this.sprite.height / 2);
      this.text.x = this.sprite.x;
      this.text.y = this.sprite.y;
    },
    render () {
    }
  };
})();
