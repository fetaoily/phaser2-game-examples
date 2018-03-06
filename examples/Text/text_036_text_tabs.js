(() => {
  let game;

  window.onload = () => {
    game = new NewGame();
  };

  class NewGame extends Phaser.Game {
    constructor () {
      super(800, 600, Phaser.AUTO);
      this.state.add('PlayGame', PlayGame);
      this.state.start('PlayGame');
    }
  }

  class PlayGame extends Phaser.State {
    constructor () {
      super();
    }

    preload () {
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.scale.pageAlignHorizontally = true;
      this.scale.pageAlignVertically = true;
      //
      this.load.image('bg', '/assets/skies/deepblue.png');
    }

    create () {
      this.add.image(0, 0, 'bg');
      this.style = {font: '20px Courier', fill: '#fff', tabs: 132};
      this.text1 = this.add.text(100, 64, 'Armor\tSpells\tDamage\tWeapons', this.style);
      this.text2 = this.add.text(100, 120, '100\tFire\t+50\tAxe\n67\tIce\t+23\tStaff', this.style);
    }

    update () {
    }

    render () {
    }
  }

})();