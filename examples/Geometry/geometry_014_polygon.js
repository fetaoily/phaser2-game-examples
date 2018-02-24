let game;

let colors;

window.onload = () => {
  game = new Phaser.Game(800, 600, Phaser.AUTO);
  game.state.add('PlayGame', PlayGame);
  game.state.start('PlayGame');
};

let PlayGame = function () {
};

PlayGame.prototype = {
  preload () {
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
  },
  create () {
    //
    colors = this.colors = Phaser.Color.HSVColorWheel();
    // colors = this.colors = Phaser.Color.HSLColorWheel();
    //
    this.poly = new Phaser.Polygon();
    this.poly.setTo([new Phaser.Point(200, 100), new Phaser.Point(350, 100), new Phaser.Point(375, 200), new Phaser.Point(150, 200)]);
    this.drawPolygon(this.poly.points);
    //
    this.poly = new Phaser.Polygon([new Phaser.Point(game.world.randomX, game.world.randomY), new Phaser.Point(game.world.randomX, game.world.randomY), new Phaser.Point(game.world.randomX, game.world.randomY), new Phaser.Point(game.world.randomX, game.world.randomY)]);
    this.drawPolygon(this.poly);
    //
    this.poly = new Phaser.Polygon(new Phaser.Point(game.world.randomX, game.world.randomY), new Phaser.Point(game.world.randomX, game.world.randomY), new Phaser.Point(game.world.randomX, game.world.randomY), new Phaser.Point(game.world.randomX, game.world.randomY));
    this.drawPolygon(this.poly);
    //
    this.poly = new Phaser.Polygon(game.world.randomX, game.world.randomY, game.world.randomX, game.world.randomY, game.world.randomX, game.world.randomY, game.world.randomX, game.world.randomY);
    this.drawPolygon(this.poly);
    //
    this.poly = new Phaser.Polygon([game.world.randomX, game.world.randomY, game.world.randomX, game.world.randomY, game.world.randomX, game.world.randomY, game.world.randomX, game.world.randomY, game.world.randomX, game.world.randomY]);
    this.drawPolygon(this.poly);
    //
    this.poly = new Phaser.Polygon(
        {x: game.world.randomX, y: game.world.randomY},
        {x: game.world.randomX, y: game.world.randomY},
        {x: game.world.randomX, y: game.world.randomY},
        {x: game.world.randomX, y: game.world.randomY}
    );
    this.drawPolygon(this.poly);
    //
    this.poly = new Phaser.Polygon([
      {x: game.world.randomX, y: game.world.randomY},
      {x: game.world.randomX, y: game.world.randomY},
      {x: game.world.randomX, y: game.world.randomY},
      {x: game.world.randomX, y: game.world.randomY}
    ]);
    this.drawPolygon(this.poly);
    //
    this.poly = new Phaser.Polygon(
        new Phaser.Point(game.world.randomX, game.world.randomY),
        {x: game.world.randomX, y: game.world.randomY},
        game.world.randomX,
        game.world.randomY,
        new Phaser.Point(game.world.randomX, game.world.randomY)
    );
    this.drawPolygon(this.poly);
    //
    this.poly = new Phaser.Polygon([
      new Phaser.Point(game.world.randomX, game.world.randomY),
      {x: game.world.randomX, y: game.world.randomY},
      game.world.randomX,
      game.world.randomY,
      new Phaser.Point(game.world.randomX, game.world.randomY)
    ]);
    this.drawPolygon(this.poly);
  },
  update () {
  },
  render () {
  },
  drawPolygon (points) {
    this.graphics = game.add.graphics(0, 0);
    // this.graphics.beginFill(0xff33ff);
    this.graphics.beginFill(this.colors[game.rnd.integerInRange(0, 359)].color);
    this.graphics.drawPolygon(points);
    this.graphics.endFill();
  }
};