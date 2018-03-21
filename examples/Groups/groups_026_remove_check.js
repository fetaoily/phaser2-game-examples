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
      this.group = null;
      this.sprite = null;
    }

    preload() {
      super.preload();
      //
      this.load.image('wasp', '/assets/sprites/wasp.png');
      this.load.image('sonic', '/assets/sprites/sonic_havok_sanity.png');
      this.load.image('phaser', '/assets/sprites/phaser.png');
    }

    create() {
      this.group = this.add.group();
      //
      for (let i = 0; i < 10; i++) {
        this.group.create(this.world.randomX, this.world.randomY, 'wasp');
      }
      //
      this.sprite = this.add.sprite(200, 20, 'sonic');
      //
      this.input.onDown.addOnce(this.remove, this);
    }

    update() {}

    render() {
      this.game.debug.text('Group size: ' + this.group.total, 32, 32);
    }

    remove() {
      this.group.remove(this.sprite);
    }
  }
})();
