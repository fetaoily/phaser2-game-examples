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
      this.contra = null;
      this.bunny = null;
      this.block = null;
      this.wizball = null;
      //
      this.result = "Click a body";
    }

    preload () {
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.scale.pageAlignHorizontally = true;
      this.scale.pageAlignVertically = true;
      //
      this.load.image("contra2", "/assets/pics/contra2.png");
      this.load.image("bunny", "/assets/sprites/bunny.png");
      this.load.image("block", "/assets/sprites/block.png");
      this.load.image("wizball", "/assets/sprites/wizball.png");
      //
      this.load.physics("physicsData", "/assets/physics/sprites.json");
    }

    create () {
      this.physics.startSystem(Phaser.Physics.P2JS);
      //
      this.contra = this.add.sprite(100, 200, "contra2");
      this.bunny = this.add.sprite(550, 200, "bunny");
      this.block = this.add.sprite(300, 400, "block");
      this.wizball = this.add.sprite(500, 500, "wizball");
      //
      this.physics.p2.enable([this.contra, this.bunny], true);
      this.physics.p2.enable([this.block, this.wizball], true);
      //
      this.contra.body.clearShapes();
      this.contra.body.loadPolygon("physicsData", "contra2");
      //
      this.bunny.body.clearShapes();
      this.bunny.body.loadPolygon("physicsData", "bunny");
      //
      this.wizball.body.setCircle(45);
      //
      this.input.onDown.add(this.click, this);
      //
      console.log(this.contra.body.debug);
      console.log(this.block.body.debug);
    }

    update () {
      this.bunny.body.rotateLeft(2);
    }

    render () {
      this.game.debug.text(this.result, 32, 32);
    }

    click (pointer) {
      let bodies = this.physics.p2.hitTest(pointer.position, [
        this.contra,
        this.bunny,
        this.block,
        this.wizball
      ]);

      if (bodies.lenght === 0) {
        this.result = "You didn't click a Body";
      } else {
        this.result = "You Clicked: ";
        for (let i = 0; i < bodies.length; i++) {
          this.result = this.result + bodies[i].parent.sprite.key;
          if (i < bodies.length - 1) {
            this.result = this.result + ", ";
          }
        }
      }
    }
  }
})();
