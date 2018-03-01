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
      game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      game.scale.pageAlignHorizontally = true;
      game.scale.pageAlignVertically = true;
      //
      game.load.atlas('atlas', '/assets/pics/texturepacker_test.png', '/assets/pics/texturepacker_test.json');
    },
    create () {
      game.stage.backgroundColor = '#404040';
      //
      this.chick = game.add.sprite(64, 64, 'atlas');
      this.chick.frameName = 'budbrain_chick.png';
      this.chick.inputEnabled = true;
      this.chick.input.pixelPerfectClick = true;
      this.chick.input.useHandCursor = true;
      this.chick.events.onInputDown.add(this.clicked, this);
      this.chick.scale.set(2);
      //
      this.cop = game.add.sprite(650, 32, 'atlas');
      this.cop.frameName = 'ladycop.png';
      this.cop.inputEnabled = true;
      this.cop.input.pixelPerfectClick = true;
      this.cop.input.useHandCursor = true;
      this.cop.events.onInputDown.add(this.clicked, this);
      this.cop.scale.set(1, 2.5);
      //
      this.car = game.add.sprite(100, 400, 'atlas');
      this.car.frameName = 'supercars_parsec.png';
      this.car.inputEnabled = true;
      this.car.input.pixelPerfectClick = true;
      this.car.input.useHandCursor = true;
      this.car.events.onInputDown.add(this.clicked, this);
      this.car.scale.set(0.5);
      //
      this.mech = game.add.sprite(240, 100, 'atlas');
      this.mech.frameName = 'titan_mech.png';
      this.mech.inputEnabled = true;
      this.mech.input.pixelPerfectClick = true;
      this.mech.input.useHandCursor = true;
      this.mech.events.onInputDown.add(this.clicked, this);
      //
      this.text = game.add.text(16, 16, 'Click a sprite', {fill: '#ffffff'});
    },
    update () {
    },
    render () {
    },
    clicked (sprite) {
      this.text.text = 'You clicked ' + sprite.frameName;
    }
  };
})();