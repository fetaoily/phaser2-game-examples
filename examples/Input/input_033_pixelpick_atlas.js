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
      this.chick.events.onInputDown.add(this.clicked, this);
      //
      this.cop = game.add.sprite(600, 64, 'atlas');
      this.cop.frameName = 'ladycop.png';
      this.cop.inputEnabled = true;
      this.cop.input.pixelPerfectClick = true;
      this.cop.events.onInputDown.add(this.clicked, this);
      //
      this.robot = game.add.sprite(50, 300, 'atlas');
      this.robot.frameName = 'robot.png';
      this.robot.inputEnabled = true;
      this.robot.input.pixelPerfectClick = true;
      this.robot.events.onInputDown.add(this.clicked, this);
      //
      this.car = game.add.sprite(100, 400, 'atlas');
      this.car.frameName = 'supercars_parsec.png';
      this.car.inputEnabled = true;
      this.car.input.pixelPerfectClick = true;
      this.car.events.onInputDown.add(this.clicked, this);
      //
      this.mech = game.add.sprite(250, 100, 'atlas');
      this.mech.frameName = 'titan_mech.png';
      this.mech.inputEnabled = true;
      this.mech.input.pixelPerfectClick = true;
      this.mech.events.onInputDown.add(this.clicked, this);
      //
      this.text = game.add.text(16, 16, 'Click a sprite', {fill: '#FFFFFF'});
    },
    update () {
    },
    render () {
    },
    clicked (sprite) {
      this.text.text = 'You Clicked ' + sprite.frameName;
    }
  };
})();