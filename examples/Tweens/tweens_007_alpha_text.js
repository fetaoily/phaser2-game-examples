(() => {
  'use strict';
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
      this.load.image('space', '/assets/misc/starfield.jpg');
      this.load.image('logo', '/assets/sprites/phaser2.png');
    }

    create () {
      let t = this.game.add.tileSprite(0, 0, 800, 600, 'logo');
      t.alpha = 0.1;
      let style = {font: '65px Arial', fill: '#ff0044', align: 'center'};
      let text = this.game.add.text(
          this.game.world.centerX,
          this.game.world.centerY,
          '- phaser -\nwith a sprinkle of \npixi dust',
          style
      );
      text.anchor.set(0.5);
      text.alpha = 0.1;
      //
      this.game.add.tween(text).to({alpha: 1}, 2000, 'Linear', true);
    }

    update () {
    }

    render () {
    }
  }
})();
