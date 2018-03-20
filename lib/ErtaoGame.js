// (() => {
  'use strict';
  // ===================================================================================================================
  // ErtaoGame
  // ===================================================================================================================
  class ErtaoGame extends Phaser.Game {
    constructor() {
      super(800, 600, Phaser.AUTO);
    }
  }
  window.ErtaoGame = ErtaoGame;

  // ===================================================================================================================
  // ErtaoGameState
  // ===================================================================================================================
  class ErtaoGameState extends Phaser.State {
    constructor() {
      super();
    }

    preload() {
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.scale.pageAlignHorizontally = true;
      this.scale.pageAlignVertically = true;
    }
  }
  window.ErtaoGameState = ErtaoGameState;
// })();
