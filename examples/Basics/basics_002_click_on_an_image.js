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
      //
      game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      game.scale.pageAlignHorizontally = true;
      game.scale.pageAlignVertically = true;
      //
      game.load.image('einstein', '/assets/pics/ra_einstein.png');
    },
    create () {
      this.image = game.add.sprite(game.world.centerX, game.world.centerY, 'einstein');
      this.image.anchor.set(0.5);
      this.image.inputEnabled = true;
      //
      this.text = game.add.text(250, 16, '', {fill: '#ffffff'});
      this.image.events.onInputDown.add(this.listener, this);
    },
    update () {
    },
    render () {
      game.debug.spriteInfo(this.image, 32, 32);
    },
    listener () {
      this.counter++;
      this.text.text = 'You clicked ' + this.counter + ' times!';
      this.image.rotation += 0.05;
      // this.image.angle += 10;
    }
  };
})();