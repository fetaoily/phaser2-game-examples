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
      game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      game.scale.pageAlignHorizontally = true;
      game.scale.pageAlignVertically = true;
      //
      game.load.image('mouse', '/assets/sprites/mouse_jim_sachs.png');
    },
    create () {
      game.stage.backgroundColor = '#943021';
      game.add.sprite(0, 100, 'mouse');
      //
      game.input.mouse.capture = true;
    },
    update () {
    },
    render () {
      game.debug.text('Left Button: ' + game.input.activePointer.leftButton.isDown, 300, 132);
      game.debug.text('Middle Button: ' + game.input.activePointer.middleButton.isDown, 300, 196);
      game.debug.text('Right Button: ' + game.input.activePointer.rightButton.isDown, 300, 260);
    }
  };
})();