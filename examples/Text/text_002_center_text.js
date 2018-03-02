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
      game.load.image('bg', '/assets/skies/deepblue.png');
    },
    create () {
      game.add.image(0, 0, 'bg');
      this.bar = game.add.graphics();
      this.bar.beginFill(0x000000, 0.2);
      this.bar.drawRect(0, 100, 800, 100);
      this.bar.endFill();
      //
      let style = {font: 'bold 32px Arial', fill: '#ffffff', boundsAlignH: 'center', boundsAlignV: 'middle'};
      this.text = game.add.text(0, 0, 'Phaser 2.4 text bounds', style);
      this.text.setShadow(3, 3, 'rgb(0,0,0,0.5)', 2);
      this.text.setTextBounds(0, 100, 800, 100);
    },
    update () {
    },
    render () {
    }
  };
})();