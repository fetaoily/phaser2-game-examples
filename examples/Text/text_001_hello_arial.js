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
      //
      this.counter = 0;
      this.lastScaleTime = 0;
      //
      game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      game.scale.pageAlignHorizontally = true;
      game.scale.pageAlignVertically = true;
    },
    create () {
      let style = {font: '65px Arial', fill: '#ff0044', align: 'center'};
      this.text = game.add.text(game.world.centerX, game.world.centerY, '- phaser -\nwith a sprinkle of\npixi dust', style);
      this.text.anchor.set(0.5);
    },
    update () {

      this.text.angle += 0.1;
      if (game.time.now > this.lastScaleTime) {
        this.counter++;
        let s = Math.sin(this.counter);
        this.text.scale.set(s, s);
        this.lastScaleTime = game.time.now + 200;
      }
    },
    render () {
      game.debug.text(game.time.now, 32, 32);
      game.debug.text(this.lastScaleTime, 32, 32 * 2);
    }
  };
})();