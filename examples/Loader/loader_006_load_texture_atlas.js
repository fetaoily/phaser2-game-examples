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
      //
      this.load.atlas('test', '/assets/sprites/atlas_hash_trim.png', '/assets/sprites/atlas_json_array_trim.json');
      this.load.image('undersea', '/assets/pics/undersea.jpg');
      this.load.image('coral', '/assets/pics/seabed.png');

    }

    create () {
      this.add.sprite(0, 0, 'undersea');
      this.sprite = this.add.sprite(this.world.centerX, this.world.centerY, 'test', 'contra1');
      this.sprite.anchor.set(0.5);
      this.add.sprite(0, 466, 'coral');
      //
      this.sprite.inputEnabled = true;
      this.sprite.input.enableDrag();
    }

    update () {
    }

    render () {
      this.game.debug.spriteInfo(this.sprite, 32, 32);
    }
  }
})();