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
      this.sprites = null;
      this.rip = 0;
    }

    preload () {
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.scale.pageAlignHorizontally = true;
      this.scale.pageAlignVertically = true;
      //
      this.load.spritesheet('mummy', '/assets/sprites/metalslug_mummy37x45.png', 37, 45, 18);
    }

    create () {
      this.sprites = this.add.group();
      this.time.events.loop(50, this.createSprite, this);
    }

    update () {
      this.sprites.setAll('x', 10, true, true, 1);
      this.sprites.forEach(this.checkSprite, this, true);
    }

    render () {
      this.game.debug.text('Group size: ' + this.sprites.total, 32, 32);
      this.game.debug.text('Destroyed: ' + this.rip, 32, 32 * 2);
    }

    createSprite () {
      let mummy = this.sprites.create(0, this.world.randomY, 'mummy');
      mummy.animations.add('walk');
      mummy.animations.play('walk', 10, true);
    }

    checkSprite (sprite) {
      try {
        if (sprite.x > this.game.width) {
          this.rip++;
          this.sprites.remove(sprite, true);
        }
      } catch (e) {
        console.log(sprite);
      }
    }
  }
})();