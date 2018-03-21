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
      this.coins = null;
    }

    preload() {
      super.preload();
      //
      this.load.spritesheet('coin', '/assets/sprites/coin.png', 32, 32);
    }

    create() {
      this.coins = this.add.group();
      //
      this.coins.createMultiple(10, 'coin', 0, true);
      //
      this.coins.callAll(
        'animations.add',
        'animations',
        'spin',
        [0, 1, 2, 3, 4, 5],
        10,
        true
      );
      this.coins.callAll('animations.play', 'animations', 'spin');
      //
      let test = this.coins.getAt(2);
      console.log(test.x);
      //
      var key = [ 'animations', 'currentAnim', 'currentFrame', 'centerXS' ];
      // var key = [ 'animations', 'currentAnim', 'frameTotal' ];
      // var key = [ 'animations', 'currentAnim' ];
      // var key = [ 'position', 'x' ];

      console.log(this.hasProperty(test, key));

      console.log('position.x' in test);
      //
      this.coins.addAll('x', 10);
      console.log(test.x);
    }

    update() {}

    render() {}

    hasProperty(child, key) {
      let len = key.length;
      console.log('hasProperty', key, len);
      //
      if (len === 1 && key[0] in child) {
        return true;
      } else if (len === 2 && key[0] in child && key[1] in child[key[0]]) {
        return true;
      } else if (
        len === 3 &&
        key[0] in child &&
        key[1] in child[key[0]] &&
        key[2] in child[key[0]][key[1]]
      ) {
        return true;
      } else if (
        len === 4 &&
        key[0] in child &&
        key[1] in child[key[0]] &&
        key[2] in child[key[0]][key[1]] &&
        key[3] in child[key[0]][key[1]][key[2]]
      ) {
        return true;
      }
      return false;
    }
  }
})();
