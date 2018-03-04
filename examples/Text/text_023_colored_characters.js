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
    }

    create () {
      let style = {
        font: '65px Arial', fill: '#ffffff', align: 'center'
      };
      this.text = game.add.text(this.world.centerX, this.world.centerY, '- phaser -\nwith a sprinkle of\npixi dust -', style);
      this.text.anchor.set(0.5);
      //
      this.text.addColor('#ffff00', 16);
      this.text.addColor('#ffffff', 25);
      this.text.addColor('#ff00ff', 28);
      this.text.addColor('#ffffff', 32);
    }

    update () {
    }

    render () {
    }
  }


})();
