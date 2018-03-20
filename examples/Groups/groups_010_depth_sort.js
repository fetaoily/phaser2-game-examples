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
      this.map = null;
      this.tileset = null;
      this.layer = null;
      this.sprite = null;
      this.group = null;
      this.oldY = 0;
      this.cursors = null;
      this.locs = [];
    }

    preload() {
      super.preload();
      //
      this.load.image('phaser', '/assets/sprites/phaser-dude.png');
      this.load.tilemap(
        'desert',
        '/assets/tilemaps/maps/depthsort.json',
        null,
        Phaser.Tilemap.TILED_JSON
      );
      this.load.image('ground_1x1', '/assets/tilemaps/tiles/ground_1x1.png');
      this.load.spritesheet('trees', '/assets/tilemaps/tiles/walls_1x2.png');
    }

    create() {
      this.map = this.add.tilemap('desert');
      this.map.addTilesetImage('ground_1x1');
      this.layer = this.map.createLayer('Tile Layer 1');
      //
      this.group = this.add.group();
      for (let i = 0; i < 200; i++) {
        this.createUniquelLocation();
      }
      //
      this.sprite = this.group.create(300, 28, 'phaser');
      this.group.sort();
      //
      this.cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
      if (this.cursors.left.isDown) {
        this.sprite.x -= 2;
      } else if (this.cursors.right.isDown) {
        this.sprite.x += 2;
      }
      //
      if (this.cursors.up.isDown) {
        this.sprite.y -= 2;
      } else if (this.cursors.down.isDown) {
        this.sprite.y += 2;
      }
      //
      this.group.sort('y', Phaser.Group.SORT_ASCENDING);
    }

    render() {
      this.game.debug.text('Sprite z-depth: ' + this.sprite.z, 10, 20);
    }

    createUniquelLocation() {
      let idx;
      let x;
      let y;
      do {
        x = this.game.math.snapTo(this.world.randomX, 32) / 32;
        y = this.game.math.snapTo(this.world.randomY, 32) / 32;
        if (y > 17) {
          y = 17;
        }
        idx = y * 17 + x;
      } while (this.locs.indexOf(idx) !== -1);

      this.locs.push(idx);
      //
      this.group.create(
        x * 32,
        y * 32,
        'trees',
        this.game.rnd.integerInRange(0, 7)
      );
    }
  }
})();
