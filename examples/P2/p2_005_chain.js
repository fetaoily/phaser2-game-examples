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
    }

    preload () {
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.scale.pageAlignHorizontally = true;
      this.scale.pageAlignVertically = true;
      //
      this.load.image("clouds", "/assets/misc/clouds.jpg");
      this.load.spritesheet("chain", "/assets/sprites/chain.png", 16, 26);
    }

    create () {
      this.add.tileSprite(0, 0, 800, 600, "clouds");
      //
      this.physics.startSystem(Phaser.Physics.P2JS);
      this.physics.p2.gravity.y = 1200;
      //
      this.createRope(40, 400, 64);
    }

    update () {
    }

    render () {
    }

    createRope (length, xAnchor, yAnchor) {
      let lastRect = null;
      let newRect = null;
      let height = 20;
      let width = 16;
      let maxForce = 20000;
      //
      for (let i = 0; i <= length; i++) {
        let x = xAnchor;
        let y = yAnchor + i * height;
        console.info(x, y, i, length);
        if (i % 2 === 0) {
          newRect = this.add.sprite(x, y, "chain", 1);
        } else {
          newRect = this.add.sprite(x, y, "chain", 0);
          lastRect.bringToTop();
        }
        //
        this.physics.p2.enable(newRect, false);
        //
        newRect.body.setRectangle(width, height);
        //
        if (i === 0) {
          newRect.body.static = true;
        } else {
          newRect.body.velocity.x = 400;
          newRect.body.mass = length / i;
        }
        if (lastRect) {
          this.physics.p2.createRevoluteConstraint(
              newRect,
              [0, -10],
              lastRect,
              [0, 10],
              maxForce
          );
        }
        lastRect = newRect;
      }
    }
  }
})();
