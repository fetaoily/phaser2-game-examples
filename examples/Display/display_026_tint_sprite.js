(() => {
  let game;

  window.onload = () => {
    game = new NewGame();
  };

  class NewGame extends Phaser.Game {
    constructor() {
      super(800, 600, Phaser.AUTO);
      this.state.add("PlayGame", PlayGame);
      this.state.start("PlayGame");
    }
  }

  class PlayGame extends Phaser.State {
    constructor() {
      super();
    }
    preload() {
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.scale.pageAlignHorizontally = true;
      this.scale.pageAlignVertically = true;
      //
      this.load.image("pic", "/assets/pics/barbarian_loading.png");
    }

    create() {
      this.pic = this.add.sprite(this.world.centerX, this.world.centerY, "pic");
      this.pic.anchor.set(0.5);
      //
      this.time.events.loop(Phaser.Timer.SECOND * 2, this.changeTint, this);
    }

    update() {}

    render() {}

    changeTint() {
      this.pic.tint = Math.random() * 0xffffff;
    }
  }
})();
