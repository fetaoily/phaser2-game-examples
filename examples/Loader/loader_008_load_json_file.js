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
      this.load.json('version', '/assets/version.json');
    }

    create () {
      this.stage.setBackgroundColor('#0072bc');
      //
      let phaserJSON = this.cache.getJSON('version');
      this.text1 = this.add.text(100, 100, 'Current Phaser Version: ' + phaserJSON.version, {fill: '#ffffff'});
      this.text1.setShadow(2, 2, 'rgba(0,0,0,0.5)', 0);
      this.text2 = this.add.text(100, 200, 'Name: ' + phaserJSON.name, {fill: '#ffffff'});
      this.text2.setShadow(2, 2, 'rgba(0,0,0,0.5)', 0);
      this.text3 = this.add.text(100, 300, 'Released:' + phaserJSON.released, {fill: '#ffffff'});
      this.text3.setShadow(2, 2, 'rgba(0,0,0,0.5)', 0);

    }

    update () {
    }

    render () {
    }
  }
})();