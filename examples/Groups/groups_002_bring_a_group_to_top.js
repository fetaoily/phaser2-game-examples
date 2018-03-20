(() => {
  'use strict';
  let game;

  window.onload = () => {
    game = new NewGame();
  };

  class NewGame extends ErtaoGame {
    constructor() {
      super(800, 600, Phaser.AUTO);
      this.state.add('PlayGame', PlayGame);
      this.state.start('PlayGame');
    }
  }

  class PlayGame extends ErtaoGameState {
    constructor() {
      super();
      this.group1 = null;
      this.group2 = null;
    }

    preload() {
      super.preload();
      //
      this.load.image(
        'beast',
        '/assets/pics/shadow_of_the_beast2_karamoon.png'
      );
      this.load.image('snot', '/assets/pics/nslide_snot.png');
      this.load.image('atari1', '/assets/sprites/atari130xe.png');
      this.load.image('sonic', '/assets/sprites/sonic_havok_sanity.png');
    }

    create() {
      this.bg = this.game.add.sprite(0, 0, 'beast');
      this.bg.width = 800;
      //
      this.group1 = this.add.group();
      this.group2 = this.add.group();
      //
      for (let i = 0; i < 10; i++) {
        let tempSprite = this.add.sprite(
          this.world.randomX,
          this.world.randomY,
          'atari1'
        );
        tempSprite.name = 'atari' + i;
        tempSprite.inputEnabled = true;
        tempSprite.input.enableDrag(false, true);
        //
        this.group1.add(tempSprite);
        //
        let tempSprite2 = this.add.sprite(
          this.world.randomX,
          this.world.randomY,
          'sonic'
        );
        tempSprite2.name = 'sonic' + i;
        tempSprite2.inputEnabled = true;
        tempSprite.input.enableDrag(false, true);
        //
        this.group2.add(tempSprite2);
      }
      let snot = this.add.sprite(this.world.centerX, this.world.height, 'snot');
      snot.anchor.setTo(0.5, 1);
    }

    update() {
      if (this.input.keyboard.isDown(Phaser.Keyboard.ONE)) {
        this.world.bringToTop(this.group1);
      }

      if (this.input.keyboard.isDown(Phaser.Keyboard.TWO)) {
        this.world.bringToTop(this.group2);
      }
    }

    render() {
      this.game.debug.inputInfo(32, 32);
    }
  }
})();
