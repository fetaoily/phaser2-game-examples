(() => {
  let game;
  window.onload = () => {
    game = new Phaser.Game(800, 600, Phaser.CANVAS);
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
      game.load.image('ball', '/assets/sprites/shinyball.png');
    },
    create () {
      this.sprite = game.add.sprite(game.world.centerX, game.world.centerY, 'ball');
      //
      game.canvas.addEventListener('mousedown', this.requestLock);
      game.input.addMoveCallback(this.move, this);
    },
    update () {
    },
    render () {
    },
    requestLock () {
      game.input.mouse.requestPointerLock();
    },
    move (pointer, x, y) {
      if (game.input.mouse.locked) {
        this.sprite.x += game.input.mouse.event.webkitMovementX;
        this.sprite.y += game.input.mouse.event.webkitMovementY;
      }
    }
  };
})();