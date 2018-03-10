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
      this.load.image("car", "/assets/sprites/car.png");
      this.load.image("tinycar", "/assets/sprites/tinycar.png");
    }

    create () {
      this.physics.startSystem(Phaser.Physics.P2JS);
      //
      this.bullets = this.add.group();
      for (let i = 0; i < 10; i++) {
        let bullet = this.bullets.create(
            this.game.rnd.integerInRange(200, 1700),
            this.game.rnd.integerInRange(-200, 400),
            "tinycar"
        );
        this.game.physics.p2.enable(bullet, false);
      }
      //
      this.cursors = this.game.input.keyboard.createCursorKeys();
      this.ship = this.add.sprite(32, this.world.height - 150, "car");
      //
      this.physics.p2.enable(this.ship);
    }

    update () {
      this.bullets.forEachAlive(this.moveBullets, this);
      //
      if (this.cursors.left.isDown) {
        this.ship.body.rotateLeft(100);
      } else if (this.cursors.right.isDown) {
        this.ship.body.rotateRight(100);
      }
      //
      if (this.cursors.up.isDown) {
        this.ship.body.thrust(400);
      } else if (this.cursors.down.isDown) {
        this.ship.body.reverse(400);
      }
    }

    render () {
    }

    moveBullets (bullet) {
      this.accelerateToObject(bullet, this.ship, 30);
    }

    accelerateToObject (obj1, obj2, speed) {
      if (typeof speed === "undefined") {
        speed = 0;
      }
      let angle = Math.atan2(obj2.y - obj1.y, obj2.x - obj1.x);
      obj1.body.rotation = angle + this.game.math.degToRad(90);
      obj1.body.force.x = Math.cos(angle) * speed;
      obj1.body.force.y = Math.sin(angle) * speed;
    }
  }
})();
