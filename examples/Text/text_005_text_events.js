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
      this.clicks = 0;
      //
      game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      game.scale.pageAlignHorizontally = true;
      game.scale.pageAlignVertically = true;
    },
    create () {
      this.text = game.add.text(game.world.centerX, game.world.centerY, 'click and drag me', {
        font: '65px Arial', fill: '#ff0044', align: 'center'
      });
      this.text.setShadow(5, 5, '#2d2d2d', 3);
      this.text.anchor.set(0.5);
      this.text.inputEnabled = true;
      this.text.input.enableDrag();
      //
      this.text.events.onInputOver.add(this.over, this);
      this.text.events.onInputOut.add(this.out, this);
      this.text.events.onInputDown.add(this.down, this);
      this.text.events.onInputUp.add(this.up, this);

    },
    update () {
    },
    render () {
    },
    over (item) {
      item.fill = '#ffff44';
      item.text = 'clicked ' + this.clicks + ' times';
    },
    out (item) {
      item.fill = '#ff0044';
      item.text = 'click and drag me';
    },
    down (item) {
      item.fill = '#ff0000';
      this.clicks++;
      item.text = 'clicked ' + this.clicks + ' items';
      item.scale.set(1.5, 1.5);
      item.angle = 360 * Math.sin(Math.random());
    },
    up (item) {
      item.fill = '#0000ff';
      item.text = 'thanks for clicking!';
      item.scale.set(1);
      item.angle = 0;
    }
  };
})();
