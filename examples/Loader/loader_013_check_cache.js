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
      this.load.image('image', '/assets/sprites/phaser2.png');
      this.load.text('html', 'index.html');
      this.load.tilemap('mario', 'assets/tilemaps/maps/super_mario.json', null, Phaser.Tilemap.TILED_JSON);
      this.load.audio('sfx', ['/assets/audio/SoundEffects/squit.mp3', '/assets/audio/SoundEffects/squit.ogg']);
    }

    create () {
      //
      let style = {fill: '#ffffff'};
      //
      let image = this.cache.checkImageKey('image');
      let text = this.cache.checkTextKey('html');
      let tilemap = this.cache.checkTilemapKey('mario');
      let audio = this.cache.checkSoundKey('sfx');
      let broken = this.cache.checkImageKey('playerHead');
      //
      this.add.text(40, 40, 'Check Image Key: ' + image, style);
      this.add.text(40, 40 * 2, 'Check Text Key: ' + text, style);
      this.add.text(40, 40 * 3, 'Check Tilemap Key: ' + tilemap, style);
      this.add.text(40, 40 * 4, 'Check Audio Key: ' + audio, style);
      this.add.text(40, 40 * 5, 'Check Image 2 Key: ' + broken, style);

    }

    update () {
    }

    render () {
    }
  }
})();