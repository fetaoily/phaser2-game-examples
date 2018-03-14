(() => {
  let game;

  window.onload = () => {
    game = new NewGame();
  };

  class NewGame extends Phaser.Game {
    constructor () {
      super(800, 600, Phaser.AUTO);
      this.state.add("StateA", StateA);
      this.state.add("StateB", StateB);
      this.state.add("StateC", StateC);
      //
      this.state.start("StateA");
    }
  }
})();
