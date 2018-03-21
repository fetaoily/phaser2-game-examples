(() => {
  'use strict';
  let game;

  window.onload = () => {
    game = new NewGame();
  };

  class NewGame extends ErtaoGame {
    constructor() {
      super(800, 600, Phaser.AUTO);
      this.state.add('PlayGame', PlayGame);
      this.state.start('PlayGame');
    }
  }

  class PlayGame extends ErtaoGameState {
    constructor() {
      super();
      this.sprite1 = null;
      this.sprite2 = null;
      this.text = null;
    }

    preload() {
      super.preload();
      //
      this.load.image('atari1', '/assets/sprites/atari130xe.png');
      this.load.image('atari2', '/assets/sprites/atari800xl.png');
    }

    create() {
      this.sprite1 = this.add.sprite(100, 200, 'atari1');
      this.sprite1.inputEnabled = true;
      this.sprite1.input.enableDrag();
      //
      this.sprite2 = this.add.sprite(400, 100, 'atari2');
      //
      this.add
        .tween(this.sprite2)
        .to(
          { y: 400 },
          3000,
          Phaser.Easing.Cubic.InOut,
          true,
          0,
          Number.MAX_VALUE,
          true
        );
      //
      this.text = this.add.text(16, 16, 'Drag the sprite. Overlapping: false', {
        fill: '#ffffff'
      });
    }

    update() {
      if (this.checkOverlap(this.sprite1, this.sprite2)) {
        this.text.text = 'Drag the sprite. Overlapping: true';
      } else {
        this.text.text = 'Drag the sprite. Overlapping: false';
      }
    }

    render() {}

    checkOverlap(spriteA, spriteB) {
      let boundsA = spriteA.getBounds();
      let boundsB = spriteB.getBounds();
      return Phaser.Rectangle.intersects(boundsA, boundsB);
    }
  }
})();
