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
      this.angle = 0;
      this.dragSprite = null;
      this.copySprite = null;
      //
      game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      game.scale.pageAlignHorizontally = true;
      game.scale.pageAlignVertically = true;
      //
      game.load.image('grid', '/assets/tests/debug-grid-1920x1920.png');
      game.load.image('ship', '/assets/sprites/ship.png');
      game.load.image('ball', '/assets/sprites/pangball.png');
    },
    create () {
      game.add.sprite(0, 0, 'grid').alpha = 0.4;
      //
      this.dragSprite = game.add.sprite(game.world.centerX, game.world.centerY, 'ship');
      this.dragSprite.anchor.set(0.5);
      this.dragSprite.inputEnabled = true;
      this.dragSprite.input.enableDrag();
      //
      this.dragSprite.events.onDragStart.add(this.dragStart, this);
      this.dragSprite.events.onDragUpdate.add(this.dragUpdate, this);
      this.dragSprite.events.onDragStop.add(this.dragStop, this);
      //
      this.copySprite = game.add.sprite(this.dragSprite.x + 200, this.dragSprite.y, 'ball');
      this.copySprite.anchor.set(0.5);
      this.copySprite.alpha = 0.5;
    },
    update () {
      this.angle += 0.01;
      //
      this.copySprite.x = this.dragSprite.x + 220 * Math.cos(this.angle);
      this.copySprite.y = this.dragSprite.y + 220 * Math.sin(this.angle);
      this.copySprite.rotation = game.physics.arcade.angleToXY(this.copySprite, this.dragSprite.x, this.dragSprite.y);
    },
    render () {
    },
    dragStart () {
      this.copySprite.alpha = 1;
    },
    dragUpdate (sprite, pointer, dragX, dragY, snapPoint) {
      this.angle += 0.01;
      //
      this.copySprite.x = this.dragSprite.x + 220 * Math.cos(this.angle);
      this.copySprite.y = this.dragSprite.y + 220 * Math.sin(this.angle);
      this.copySprite.rotation = game.physics.arcade.angleToPointer(this.copySprite);
    },
    dragStop () {
      this.copySprite.alpha = 0.5;
    }
  };
})();