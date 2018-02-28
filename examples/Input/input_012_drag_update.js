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
      game.load.image('ship', '/assets/sprites/ship.png');
      game.load.image('array', '/assets/sprites/longarrow.png');
    },
    create () {
      game.stage.backgroundColor = '#2f0f1c';
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
      this.copySprite = game.add.sprite(this.dragSprite.x + 200, this.dragSprite.y, 'array');
      this.copySprite.anchor.set(0, 0.5);
      this.copySprite.angle = 180;
      //
      this.text = game.add.text(32, 32, 'drag the ship', {font: '32px Arial', fill: '#ffffff'});
      this.text.setShadow(6, 6, 'rgb(0,0,0,0.8)', 5);
    },
    update () {
    },
    render () {
      game.debug.spriteInfo(this.dragSprite, this.dragSprite.x + 50, this.dragSprite.y);
      game.debug.spriteInfo(this.copySprite, this.copySprite.x + 50, this.copySprite.y);
    },
    dragStart () {
      this.copySprite.alpha = 1;
    },
    dragUpdate (sprite, pointer, dragX, dragY, snapPoint) {
      this.angle += 0.01;
      this.copySprite.x = this.dragSprite.x + 200 * Math.cos(this.angle);
      this.copySprite.y = this.dragSprite.y + 220 * Math.sin(this.angle);
      this.copySprite.rotation = game.physics.arcade.angleToPointer(this.copySprite);
    },
    dragStop () {
      this.copySprite.alpha = 0.5;
    }
  };

})();
