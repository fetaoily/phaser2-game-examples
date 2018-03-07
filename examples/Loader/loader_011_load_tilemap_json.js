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
      this.load.tilemap('mario', '/assets/tilemaps/maps/super_mario.json', null, Phaser.Tilemap.TILED_JSON);
      this.load.image('tiles', '/assets/tilemaps/tiles/super_mario.png');
    }

    create () {
      this.stage.setBackgroundColor('#787878');
      this.map = this.add.tilemap('mario');
      this.map.addTilesetImage('SuperMarioBros-World1-1', 'tiles');
      this.layer = this.map.createLayer('World1');
    }

    update () {
    }

    render () {
    }
  }
})();