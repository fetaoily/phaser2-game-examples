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
      this.popup = null;
      this.tween = null;
      //
      game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      game.scale.pageAlignHorizontally = true;
      game.scale.pageAlignVertically = true;
      //
      game.load.image('background', '/assets/pics/bubble-on.png');
      game.load.image('close', '/assets/sprites/orb-red.png');
    },
    create () {
      game.stage.backgroundColor = '#4b0049';
      //
      this.popup = game.add.sprite(game.world.centerX, game.world.centerY, 'background');
      this.popup.anchor.set(0.5);
      this.popup.inputEnabled = true;
      this.popup.input.enableDrag();
      //
      let pw = (this.popup.width / 2) - 30;
      let ph = (this.popup.height / 2) - 8;
      //
      this.closeButton = game.make.sprite(pw, -ph, 'close');
      this.closeButton.inputEnabled = true;
      this.closeButton.input.priorityID = 1;
      this.closeButton.events.onInputDown.add(this.closeWindow, this);
      //
      this.popup.addChild(this.closeButton);
      //
      this.popup.scale.set(0);
      //
      game.input.onDown.add(this.openWindow, this);
    },
    update () {
      game.debug.spriteInfo(this.popup, 32, 32 * 2);
      game.debug.spriteInfo(this.closeButton, 32, 32 * 5);
    },
    render () {
      game.debug.text('Click to open window + drag + close', 32, 32);
    },
    openWindow () {
      if ((this.tween && this.tween.isRunning) || this.popup.scale.x === 1) {
        return;
      }
      this.tween = game.add.tween(this.popup.scale).to({x: 1, y: 1}, 1000, Phaser.Easing.Elastic.Out, true);
    },
    closeWindow () {
      if (this.tween.isRunning || this.popup.scale.x === 0) {
        return;
      }
      this.tween = game.add.tween(this.popup.scale).to({x: 0, y: 0}, 500, Phaser.Easing.Elastic.In, true);
    }
  };
})();