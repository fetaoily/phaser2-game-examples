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
    },
    create () {
      game.stage.backgroundColor = '#454645';
      game.input.onUp.add(() => {
        console.log('Up');
      });
      game.input.onDown.add(() => {
        console.log('Down');
      });
      game.input.onTap.add(() => {
        console.log('Tap');
      });
    },
    update () {
    },
    render () {
      game.debug.pointer(game.input.mousePointer);
      game.debug.pointer(game.input.pointer1);
      game.debug.pointer(game.input.pointer2);
      game.debug.pointer(game.input.pointer3);
    }
  };
})();


