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
      this.style = {font: '16px Courier', fill: '#fff', tabs: [164, 120, 80]};
      this.headings = ['Name', 'Damage', 'Speed', 'Notes'];
      this.text = this.add.text(32, 64, '', this.style);
      this.text.parseList(this.headings);
      this.swords = [
        ['Knife', '1d3', '1', ''],
        ['Dagger', '1d4', '1', 'May be thrown'],
        ['Rapier', '1d6', '2', 'Max strength damage bonus +1'],
        ['Sabre', '1d6', '3', 'Max strength damage bonus +3'],
        ['Cutlass', '1d6', '5', ''],
        ['Scimitar', '2d4', '4', ''],
        ['Long Sword', '1d8+1', '6', ''],
        ['Bastard Sword', '1d10+1', '8', 'Requires 2 hands to use effectively'],
        ['Great Sword', '1d12+1', '10', 'Must always be used with 2 hands']
      ];
      this.text2 = this.add.text(32, 120, '', this.style);
      this.text2.parseList(this.swords);
    }

    update () {
    }

    render () {
    }
  }
})();