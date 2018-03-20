class ErtaoGame extends Phaser.Game {
  constructor() {
    super(800, 600, Phaser.AUTO);
  }
}

class ErtaoGameState extends Phaser.State {
  constructor() {
    super();
  }

  preload(){
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
  }
}

console.log(ErtaoGame);
console.log(ErtaoGameState);
