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
      this.load.spritesheet('uniqueKey', '/assets/sprites/metalslug_mummy37x45.png', 37, 45, 18);
    }

    create () {
      this.sprite = this.add.sprite(300, 200, 'uniqueKey');
      this.sprite.animations.add('walk');
      this.sprite.animations.play('walk', 50, true);
    }

    update () {
    }

    render () {
    }
  }
})();