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
    this.points = [];
    this.over = false;
    this.currentPoint = null;
    this.centroid = null;
    this.inputType = null;
    //
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    //
    game.load.spritesheet('centroid', '/assets/sprites/centroid.png', 16, 16);
  },
  create () {
    this.currentPoint = game.add.image(10, 10, 'centroid');
    this.currentPoint.anchor.set(0.5);
    //
    this.currentPoint.alpha = 0.5;
    //
    this.centroid = game.add.image(10, 10, 'centroid', 1);
    this.centroid.anchor.setTo(0.5);
    this.centroid.visible = false;
    //
    game.input.onTap.add(this.onTapHandler, this);
  },
  update () {
    this.currentPoint.position.copyFrom(game.input.activePointer.position);
    if (this.points.length > 0) {
      let c = Phaser.Point.centroid(this.points);
      this.centroid.position.copyFrom(c);
      if (!this.centroid.visible) {
        this.centroid.visible = true;
      }
    }
  },
  render () {
    game.world.forEachAlive((child) => {
      game.debug.text(Phaser.Math.roundTo(child.x, 0) + "," + Phaser.Math.roundTo(child.y, 0), child.x - 10, child.y + 25, '#ff1e00', '12px Courier');
    });
    //
    if (this.centroid.visible) {
      game.debug.text('Points may be dragged.', 10, 20);
      game.debug.text(Phaser.Math.roundTo(this.centroid.x, 0) + ',' + Phaser.Math.roundTo(this.centroid.y, 0), this.centroid.x - 10, this.centroid.y - 15, '#FFF', 'bold 12px Courier');
    } else {
      game.debug.text('Click any where to add points.', 10, 20);
    }
  },
  onTapHandler () {
    if (!this.over) {
      let img = game.add.sprite(game.input.activePointer.position.x, game.input.activePointer.position.y, 'centroid', 0);
      this.points.push(img.position);
      //
      img.anchor.set(0.5);
      img.alpha = 0.5;
      img.inputEnabled = true;
      img.input.enableDrag(true);
      img.defaultCursor = 'move';
      //
      let _self = this;
      //
      img.events.onInputOver.add(function () {
        this.alpha = 1;
        this.scale.setTo(1.2, 1.2);
        _self.over = true;
      }, img);
      //
      img.events.onInputOut.add(function () {
        this.alpha = 0.5;
        this.scale.setTo(1, 1);
        _self.over = false;
      }, img);
    }
  }
};