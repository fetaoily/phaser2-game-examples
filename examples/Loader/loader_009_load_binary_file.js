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
      this.load.binary('mod', '/assets/audio/protracker/global_trash_3_v2.mod', this.binaryLoadCallback, this);
    }

    create () {
      this.stage.setBackgroundColor('#0072bc');
      //
      let buffer = this.cache.getBinary('mod');
      let signature = this.getString(buffer, 1080, 1084);
      let text = this.add.text(32, 32, 'Signature: ' + signature, {fill: '#ffffff'});
      text.setShadow(2, 2, 'rgba(0,0,0,0,0.5)', 0);
      let title = this.getString(buffer, 0, 20);
      let text2 = this.add.text(32, 32 * 2, 'Title: ' + title, {fill: '#ffffff'});
      text2.setShadow(2, 2, 'rgba(0,0,0,0.5)', 0);
    }

    update () {
    }

    render () {
    }

    binaryLoadCallback (key, data) {
      return new Uint8Array(data);
    }

    getString (buffer, start, end) {
      let output = '';
      for (let i = start; i < end; i++) {
        output += String.fromCharCode(buffer[i]);
      }
      return output;
    }
  }
})();