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
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    //
    game.load.image('ball', '/assets/sprites/shinyball.png');
    game.load.image('snakehead', '/assets/sprites/snakehead.png');
    //
    this.snakeHead = null;
    this.snakeSection = [];
    this.snakePath = [];
    this.numSnakeSections = 30;
    this.snakeSpacer = 6;
  },
  create () {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.world.setBounds(0, 0, 800, 600);
    this.cursors = game.input.keyboard.createCursorKeys();

    this.snakeHead = game.add.sprite(400, 300, 'snakehead');
    this.snakeHead.anchor.setTo(0.5, 0.5);
    this.snakeHead.scale.set(2);

    game.physics.enable(this.snakeHead, Phaser.Physics.ARCADE);

    for (let i = 0; i < this.numSnakeSections; i++) {
      this.snakeSection[i] = game.add.sprite(400, 300, 'ball');
      this.snakeSection[i].anchor.setTo(0.5, 0.5);
      this.snakeSection[i].name = 'part:' + i;
    }

    for (let i = 0; i <= this.numSnakeSections * this.snakeSpacer; i++) {
      this.snakePath[i] = new Phaser.Point(400, 300);
    }
  },
  update () {
    this.snakeHead.body.velocity.setTo(0, 0);
    this.snakeHead.body.angularVelocity = 0;

    if (this.cursors.up.isDown) {
      this.snakeHead.body.velocity.copyFrom(game.physics.arcade.velocityFromAngle(this.snakeHead.angle, 300));

      let part = this.snakePath.pop();
      part.setTo(this.snakeHead.x, this.snakeHead.y);

      this.snakePath.unshift(part);
      for (let i = 0; i < this.numSnakeSections; i++) {
        let snakeSectionItem = this.snakeSection[i];
        snakeSectionItem.x = (this.snakePath[i * this.snakeSpacer]).x;
        snakeSectionItem.y = (this.snakePath[i * this.snakeSpacer]).y;
        game.debug.text(snakeSectionItem.name, snakeSectionItem.x, snakeSectionItem.y);
      }
    }
    if (this.cursors.left.isDown) {
      this.snakeHead.body.angularVelocity = -300;
    } else if (this.cursors.right.isDown) {
      this.snakeHead.body.angularVelocity = +300;
    }
  },
  render () {
    game.debug.spriteInfo(this.snakeHead, 32, 32);
    // for (let i = 0; i < this.numSnakeSections; i++) {
    //   let snakeSectionItem = this.snakeSection[i];
    //   game.debug.text(snakeSectionItem.name, snakeSectionItem.x, snakeSectionItem.y);
    // }
  }
};