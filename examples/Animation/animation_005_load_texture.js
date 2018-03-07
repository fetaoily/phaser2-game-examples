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
      this.sprite = null;
    }

    preload () {
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.scale.pageAlignHorizontally = true;
      this.scale.pageAlignVertically = true;
      //
      this.load.spritesheet('mummy', '/assets/sprites/metalslug_mummy37x45.png', 37, 45, 18);
      this.load.spritesheet('monster', '/assets/sprites/metalslug_monster39x40.png', 39, 40);
    }

    create () {
      this.sprite = this.add.sprite(300, 200, 'monster');
      this.sprite.animations.add('walk', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);
      this.sprite.animations.play('walk', 20, true);
      this.sprite.scale.set(4);
      this.sprite.smoothed = false;
      //
      this.input.onDown.add(this.changeTexture, this);
    }

    update () {
    }

    render () {
    }

    changeTexture () {
      if (this.sprite.key === 'monster') {
        this.sprite.loadTexture('mummy', 0, false);
      } else {
        this.sprite.loadTexture('monster', 0, false);
      }
    }
  }
})();