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
      game.load.spritesheet('button', '/assets/buttons/button_sprite_sheet.png', 193, 71);
    },
    create () {
      game.stage.backgroundColor = '#4b0049';
      this.button = game.add.button(game.world.centerX - 95, 460, 'button', this.nukeButton, this, 2, 1, 0);
    },
    update () {
    },
    render () {
    },
    nukeButton () {
      this.button.pendingDestroy = true;
      // this.button.destroy();

      this.text = game.add.text(game.world.centerX, game.world.centerY, '- button nuke -', {
        font: '64px Arial',
        fill: '#ffffff'
      });
      this.text.anchor.set(0.5);
    }
  };
})();