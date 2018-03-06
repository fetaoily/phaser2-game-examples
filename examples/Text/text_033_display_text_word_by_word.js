(() => {
  let game;
  const content = [
    "The sky above the port was the color of television, tuned to a dead channel.",
    "`It's not like I'm using,' Case heard someone say, as he shouldered his way ",
    "through the crowd around the door of the Chat. `It's like my body's developed",
    "this massive drug deficiency.' It was a Sprawl voice and a Sprawl joke.",
    "The Chatsubo was a bar for professional expatriates; you could drink there for",
    "a week and never hear two words in Japanese.",
    "",
    "Ratz was tending bar, his prosthetic arm jerking monotonously as he filled a tray",
    "of glasses with draft Kirin. He saw Case and smiled, his teeth a webwork of",
    "East European steel and brown decay. Case found a place at the bar, between the",
    "unlikely tan on one of Lonny Zone's whores and the crisp naval uniform of a tall",
    "African whose cheekbones were ridged with precise rows of tribal scars. `Wage was",
    "in here early, with two joeboys,' Ratz said, shoving a draft across the bar with",
    "his good hand. `Maybe some business with you, Case?'",
    "",
    "Case shrugged. The girl to his right giggled and nudged him.",
    "The bartender's smile widened. His ugliness was the stuff of legend. In an age of",
    "affordable beauty, there was something heraldic about his lack of it. The antique",
    "arm whined as he reached for another mug.",
    "",
    "",
    "From Neuromancer by William Gibson"
  ];

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
      this.line = [];
      this.wordIndex = 0;
      this.lineIndex = 0;
      this.wordDelay = 120;
      this.lineDelay = 400;
    }

    preload () {
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.scale.pageAlignHorizontally = true;
      this.scale.pageAlignVertically = true;
    }

    create () {
      this.text = this.add.text(32, 32, '', {font: '15px Arial', fill: '#19de65'});
      this.nextLine();
    }

    update () {
    }

    render () {
    }

    nextLine () {
      if (this.lineIndex === content.length) {
        return;
      }
      this.line = content[this.lineIndex].split(' ');
      this.wordIndex = 0;
      this.time.events.repeat(this.wordDelay, this.line.length, this.nextWord, this);
      this.lineIndex++;
    }

    nextWord () {
      this.text.text = this.text.text.concat(this.line[this.wordIndex] + ' ');
      this.wordIndex++;
      if (this.wordIndex === this.line.length) {
        this.text.text = this.text.text.concat('\n');
        this.time.events.add(this.lineDelay, this.nextLine, this);
      }
    }
  }
})();