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
      this.button = null;
      this.sprite = null;
    }

    preload () {
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.scale.pageAlignHorizontally = true;
      this.scale.pageAlignVertically = true;
      //
      game.load.image('dragon', '/assets/pics/cougar_dragonsun.png');
      game.load.spritesheet('button', '/assets/buttons/button_sprite_sheet.png', 193, 71);
    }

    create () {
      this.sprite = this.add.sprite(this.world.centerX, this.world.centerY, 'dragon');
      this.sprite.anchor.set(0.5);
      //
      this.stage.setBackgroundColor('#000000');
      //
      // this.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
      //
      // this.scale.fullScreenScaleMode = Phaser.ScaleManager.NO_SCALE;
      this.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
      //
      this.button = this.add.button(this.world.centerX - 95, 500, 'button', this.actionOnClick, this, 2, 1, 0);
      this.button.visible = false;
      // this.scale.enterFullScreen.add(this.onEnterFullScreen, this);
      // this.scale.leaveFullScreen.add(this.onLeaveFullScreen, this);
      this.input.onDown.add(this.goFull, this);
    }

    update () {
    }

    render () {
    }

    onEnterFullScreen () {
      this.button.visible = true;
    }

    onLeaveFullScreen () {
      this.button.visible = false;
    }

    goFull () {
      this.scale.startFullScreen();
    }

    actionOnClick () {
      this.sprite.tint = Math.random() * 0xFFFFFF;
    }
  }
})();