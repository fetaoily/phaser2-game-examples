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
      this.result = 'Drag a sprite';
      //
      game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      game.scale.pageAlignHorizontally = true;
      game.scale.pageAlignVertically = true;
      //
      game.load.image('grid', '/assets/tests/debug-grid-1920x1920.png');
      game.load.image('atari', '/assets/sprites/atari800xl.png');
      game.load.image('sonic', '/assets/sprites/sonic_havok_sanity.png');
    },
    create () {
      game.add.sprite(0, 0, 'grid');
      //
      this.atari = game.add.sprite(32, 100, 'atari');
      this.atari.inputEnabled = true;
      this.atari.input.enableDrag();
      this.atari.events.onDragStart.add(this.onDragStart, this);
      this.atari.events.onDragStop.add(this.onDragStop, this);
      //
      this.sonic = game.add.sprite(300, 200, 'sonic');
      this.sonic.inputEnabled = true;
      this.sonic.input.enableDrag();
      this.sonic.events.onDragStart.add(this.onDragStart, this);
      this.sonic.events.onDragStop.add(this.onDragStop, this);
    },
    update () {
    },
    render () {
      game.debug.text(this.result, 10, 20);
    },
    onDragStart (sprite, pointer) {
      this.result = 'Dragging ' + sprite.key;
    },
    onDragStop (sprite, pointer) {
      this.result = sprite.key + ' dropped at x:' + pointer.x + ' y:' + pointer.y;
    }
  };
})();

