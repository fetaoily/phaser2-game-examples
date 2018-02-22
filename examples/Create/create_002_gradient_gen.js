let PlayGame = function () {
};

let conf = {
  width: 800,
  height: 600,
  renderer: Phaser.AUTO,
  parent: 'phaser-example',
  transparent: false,
  antialias: false,
  state: PlayGame,
  resolution: 2
};

let game = new Phaser.Game(conf);

PlayGame.prototype = {
  preload () {
    //
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    //
    game.load.image('colors', '/assets/misc/gradient-palettes.png');
    game.load.spritesheet('arrow', '/assets/misc/arrows.png', 16, 16);
    //
    this.bmd;
    this.bmdSprite;
    this.markers;
    this.swatchBMD;
    this.swatch;
    this.isDragging = false;
    this.isOnWwatch = false;
    this.arrow1;
    this.arrow2;
    this.currentArrow = null;
    this.chunk = 8;
  },
  create () {
    game.stage.backgroundColor = '#535353';

    this.bmd = game.make.bitmapData(500, 500);
    this.bmd.smoothed = false;
    this.bmdSprite = this.bmd.addToWorld(30, 20);
    //
    this.markers = game.add.group();
    //
    this.createMarker(this.bmdSprite.y);
    this.createMarker(this.bmdSprite.y + this.bmd.height);
    //
    this.arrow1 = this.markers.children[0];
    this.arrow2 = this.markers.children[1];
    //
    this.currentArrow = this.arrow1;
    this.currentArrow.frame = 1;
    //
    game.input.onDown.add(this.checkClick, this);
    //
    this.swatchBMD = game.make.bitmapData();
    this.swatchBMD.load('colors');
    //
    this.swatch = game.add.sprite(800 - 220, 10, this.swatchBMD);
    this.swatch.inputEnabled = true;
    this.swatch.events.onInputDown.add(this.startSwatch, this);
    this.swatch.events.onInputUp.add(this.stopSwatch, this);
    this.swatch.events.onInputOut.add(this.stopSwatch, this);
    //
    this.refresh();
    //
    game.input.addMoveCallback(this.updateColor, this);
  },
  update () {
    if (this.isDragging) {
      this.refresh();
    }
  },
  render () {
  },
  startSwatch (sprite, pointer) {
    this.isOnSwatch = true;
    this.updateColor(pointer);
  },
  stopSwatch () {
    this.isOnWwatch = false;
  },
  updateColor (pointer) {
    if (this.isOnSwatch) {
      let x = pointer.x - this.swatch.x;
      let y = pointer.y - this.swatch.y;
      let color = this.swatchBMD.getPixelRGB(x, y);
      this.currentArrow.color = Phaser.Color.getColor32(color.a, color.r, color.g, color.b);
      this.currentArrow.webrgb = Phaser.Color.getWebRGB(this.currentArrow.color);
      this.currentArrow.rgb = Phaser.Color.getRGB(this.currentArrow.color);
      this.refresh();
    }
  },
  checkClick (pointer) {
    if (pointer.x > this.bmdSprite.x && pointer.x <= this.bmdSprite.right) {
      this.createMarker(pointer.y);
      this.markers.sort('y');
      this.refresh();
    }
  },
  createMarker (y) {
    let arrow = this.markers.create(this.bmdSprite.x - 18, y, 'arrow', 0);
    arrow.anchor.set(0, 0.5);
    arrow.inputEnabled = true;
    //
    if (this.markers.total > 2) {
      arrow.input.enableDrag();
      arrow.input.allowHorizontalDrag = false;
      arrow.input.boundsRect = new Phaser.Rectangle(0, 50, 50, 500);
      arrow.events.onDragStart.add(this.startRefresh, this);
      arrow.events.onDragStop.add(this.stopRefresh, this);
    }
    //
    arrow.color = Phaser.Color.getRandomColor();
    arrow.webrgb = Phaser.Color.getWebRGB(arrow.color);
    arrow.rgb = Phaser.Color.getRGB(arrow.color);

    arrow.events.onInputDown.add(this.pickColor, this);

    if (this.markers.total > 2) {
      this.makeCurrent(arrow);
    }
  },
  pickColor (arrow) {
    this.makeCurrent(arrow);
  },
  makeCurrent (sprite) {
    this.currentArrow.frame = 0;
    this.currentArrow = sprite;
    this.currentArrow.frame = 1;
  },
  selectColor (sprite, pointer) {
    let x = pointer.x - this.swatch.x;
    let y = pointer.y - this.swatch.y;

    let color = this.swatchBMD.getPixelRGB(x, y);

    this.currentArrow.color = Phaser.Color.getColor32(color.a, color.r, color.g, color.b);
    this.currentArrow.webrgb = Phaser.Color.getWebRGB(this.currentArrow.color);
    this.currentArrow.rgb = Phaser.Color.getRGB(this.currentArrow.color);

    this.refresh();
  },
  startRefresh (sprite) {
    this.makeCurrent(sprite);
    this.isDragging = true;
  },
  stopRefresh (sprite) {
    this.isDragging = false;
    this.markers.sort('y');
    this.refresh();
  },
  refresh () {
    let y = 0;
    let step;
    let marker1;
    let marker2;
    let distance;

    this.bmd.cls();

    for (let c = 0; c < this.markers.children.length - 1; c++) {
      marker1 = this.markers.children[c];
      marker2 = this.markers.children[c + 1];

      let dy = marker1.y - this.bmdSprite.y;
      let sy = marker2.y - this.bmdSprite.y;

      distance = sy - dy;

      y = dy;

      step = Math.floor(distance / this.chunk);
      this.remainder = distance - (step * this.chunk);
      for (let i = 0; i < step; i++) {
        let ci = Phaser.Color.interpolateRGB(marker1.rgb.r, marker1.rgb.g, marker1.rgb.b, marker2.rgb.r, marker2.rgb.g, marker2.rgb.b, step, i);
        this.bmd.ctx.fillStyle = Phaser.Color.getWebRGB(ci);
        this.bmd.ctx.fillRect(0, dy, this.bmd.width, this.chunk);
        dy += this.chunk;
      }
      if (this.remainder > 0) {
        this.bmd.ctx.fillRect(0, dy, this.bmd.width, this.remainder);
      }
      this.bmd.dirty = true;
    }
  }
};
