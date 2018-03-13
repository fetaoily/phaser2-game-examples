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
      this.sprite1 = null;
      this.sprite2 = null;
      this.sprite3 = null;
    }

    preload () {
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.scale.pageAlignHorizontally = true;
      this.scale.pageAlignVertically = true;
      //
      this.load.image("ball", "/assets/sprites/shinyball.png");
      this.load.image("sky", "/assets/skies/sunset.png");
    }

    create () {
      this.add.image(0, 0, "sky");
      //
      this.physics.startSystem(Phaser.Physics.P2JS);
      //
      this.physics.p2.gravity.y = 300;
      //
      this.spriteMaterial = this.physics.p2.createMaterial("spriteMaterial");
      this.worldMaterial = this.physics.p2.createMaterial("worldMaterial");
      this.contactMaterial = this.physics.p2.createContactMaterial(
          this.spriteMaterial,
          this.worldMaterial,
          {restitution: 1.0}
      );
      //
      this.physics.p2.setWorldMaterial(this.worldMaterial);
      //
      this.sprite1 = this.add.sprite(200, 100, "ball");
      this.sprite2 = this.add.sprite(400, 100, "ball");
      this.sprite3 = this.add.sprite(600, 100, "ball");
      //
      this.physics.p2.enable([this.sprite1, this.sprite2, this.sprite3]);
      //
      this.sprite1.body.setMaterial(this.spriteMaterial);
      this.sprite2.body.setMaterial(this.spriteMaterial);
      this.sprite3.body.setMaterial(this.spriteMaterial);
      //
      this.sprite1.body.data.gravityScale = 1;
      this.sprite2.body.data.gravityScale = 0.5;
      this.sprite3.body.data.gravityScale = 0.25;
    }

    update () {
    }

    render () {
    }
  }
})();
