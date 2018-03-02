(() => {
  let game;

  window.onload = () => {
    game = new Phaser.Game(800, 600, Phaser.AUTO);
    game.state.add('PlayGame', PlayGame);
    game.state.start('PlayGame');
  };

  let PlayGame = function () {
  };

  PlayGame.prototype = {
    preload () {
      //
      this.word = 'phaser';
      this.corret = [];
      this.bmd = null;
      //
      game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      game.scale.pageAlignHorizontally = true;
      game.scale.pageAlignVertically = true;
    },
    create () {
      for (let i = 0; i < this.word.length; i++) {
        this.corret[this.word[i]] = false;
      }
      this.bmd = game.make.bitmapData(800, 200);
      this.bmd.context.font = '64px Arial';
      this.bmd.context.fillStyle = '#ffffff';
      this.bmd.context.fillText(this.word, 64, 64);
      this.bmd.addToWorld();
      //
      game.input.keyboard.addCallbacks(this, null, null, this.keyPress);
    },
    update () {
    },
    render () {
    },
    keyPress (char) {
      this.bmd.cls();
      let x = 64;
      for (let i = 0; i < this.word.length; i++) {
        let letter = this.word.charAt(i);
        if (char === letter) {
          this.corret[letter] = true;
        }
        if (this.corret[letter]) {
          this.bmd.context.fillStyle = '#00ff00';
        } else {
          this.bmd.context.fillStyle = '#ffffff';
        }
        this.bmd.context.fillText(letter, x, 64);
        x += this.bmd.context.measureText(letter).width;
      }
    }
  };
})();