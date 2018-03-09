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
      this.count = 0;
    }

    preload () {
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.scale.pageAlignHorizontally = true;
      this.scale.pageAlignVertically = true;
      //
      game.load.image('spin1', '/assets/sprites/spinObj_01.png');
      game.load.image('spin2', '/assets/sprites/spinObj_02.png');
      game.load.image('spin3', '/assets/sprites/spinObj_03.png');
      game.load.image('spin4', '/assets/sprites/spinObj_04.png');
      game.load.image('spin5', '/assets/sprites/spinObj_05.png');
      game.load.image('spin6', '/assets/sprites/spinObj_06.png');
      game.load.image('spin7', '/assets/sprites/spinObj_07.png');
      game.load.image('spin8', '/assets/sprites/spinObj_08.png');
    }

    create () {
      this.renderTexture1 = this.add.renderTexture(800, 600, 'texture1');
      this.renderTexture2 = this.add.renderTexture(800, 600, 'texture2');
      //
      this.currentTexture = this.renderTexture1;
      //
      this.outputSprite = this.add.sprite(400, 300, this.currentTexture);
      //
      this.outputSprite.anchor.y = 0.5;
      this.outputSprite.anchor.y = 0.5;
      //
      this.stuffContainer = this.add.group();
      this.stuffContainer.x = 800 / 2;
      this.stuffContainer.y = 600 / 2;
      //
      for (let i = 0; i < 20; i++) {
        let item = this.stuffContainer.create(Math.random() * 400 - 200, Math.random() * 400 - 200, this.rnd.pick(this.cache.getKeys(Phaser.Cache.IMAGE)));
        item.anchor.setTo(0.5, 0.5);
      }
      this.count = 0;
    }

    update () {
      this.stuffContainer.addAll('rotation', 0.1);
      this.count += 0.01;
      //
      let temp = this.renderTexture1;
      this.renderTexture1 = this.renderTexture2;
      this.renderTexture2 = temp;
      //
      this.outputSprite.setTexture(this.renderTexture1);
      //
      this.stuffContainer.rotation -= 0.01;
      this.outputSprite.scale.x = this.outputSprite.scale.y = 1 + Math.sin(this.count) * 0.2;
      this.renderTexture2.renderXY(this.stage, 0, 0, true);
    }

    render () {
    }
  }
})();