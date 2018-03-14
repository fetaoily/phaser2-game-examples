(() => {
  let game;

  window.onload = () => {
    game = new NewGame();
  };

  class NewGame extends Phaser.Game {
    constructor () {
      super(800, 600, Phaser.AUTO);
      this.state.add("PlayGame", PlayGame);
      this.state.start("PlayGame");
    }
  }

  class PlayGame extends Phaser.State {
    constructor () {
      super();
      this.ship = null;
      this.map = null;
      this.layer = null;
      this.cursors = null;
    }

    preload () {
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.scale.pageAlignHorizontally = true;
      this.scale.pageAlignVertically = true;
      //
      this.load.tilemap(
          "map",
          "/assets/tilemaps/maps/collision_test.json",
          null,
          Phaser.Tilemap.TILED_JSON
      );
      this.load.image("ground_1x1", "/assets/tilemaps/tiles/ground_1x1.png");
      this.load.image("walls_1x2", "/assets/tilemaps/tiles/walls_1x2.png");
      this.load.image("tiles2", "/assets/tilemaps/tiles/tiles2.png");
      this.load.image("ship", "/assets/sprites/thrust_ship2.png");
    }

    create () {
      this.physics.startSystem(Phaser.Physics.P2JS);
      //
      this.stage.setBackgroundColor("#2d2d2d");
      //
      this.map = this.add.tilemap("map");
      this.map.addTilesetImage("ground_1x1");
      this.map.addTilesetImage("walls_1x2");
      this.map.addTilesetImage("tiles2");
      //
      this.layer = this.map.createLayer("Tile Layer 1");
      this.layer.resizeWorld();
      //
      this.map.setCollisionBetween(1, 12);
      //
      this.physics.p2.convertTilemap(this.map, this.layer);
      //
      this.ship = this.add.sprite(200, 200, "ship");
      this.physics.p2.enable(this.ship);
      //
      this.camera.follow(this.ship);
      //
      this.physics.p2.setBoundsToWorld(true, true, true, true, false);
      //
      this.cursors = this.input.keyboard.createCursorKeys();
    }

    update () {
      if (this.cursors.left.isDown) {
        this.ship.body.rotateLeft(100);
      } else if (this.cursors.right.isDown) {
        this.ship.body.rotateRight(100);
      } else {
        this.ship.body.setZeroRotation();
      }
      //
      if (this.cursors.up.isDown) {
        this.ship.body.thrust(400);
      } else if (this.cursors.down.isDown) {
        this.ship.body.reverse(400);
      }
    }

    render () {
    }
  }
})();
