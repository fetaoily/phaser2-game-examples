(() => {
  'use strict';
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
      //
      this.bmpText = null;
      this.text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quid ergo aliud intellegetur nisi uti ne quae pars naturae neglegatur? Si longus, levis; Ita relinquet duas, de quibus etiam atque etiam consideret. Optime, inquam. Sed quanta sit alias, nunc tantum possitne esse tanta.\\n\\nQuid, si etiam iucunda memoria est praeteritorum malorum? Consequatur summas voluptates non modo parvo, sed per me nihilo, si potest; Atque his de rebus et splendida est eorum et illustris oratio. Mihi enim satis est, ipsis non satis. Ergo ita: non posse honeste vivi, nisi honeste vivatur? Mihi quidem Antiochum, quem audis, satis belle videris attendere. Et quod est munus, quod opus sapientiae? Ex rebus enim timiditas, non ex vocabulis nascitur. Ex ea difficultate illae fallaciloquae, ut ait Accius, malitiae natae sunt. Nonne videmus quanta perturbatio rerum omnium consequatur, quanta confusio? Quae cum magnifice primo dici viderentur, considerata minus probabantur.\\n\\n---> Click to remove text';
      //
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.scale.pageAlignHorizontally = true;
      this.scale.pageAlignVertically = true;
      //
      this.load.bitmapFont('gem', '/assets/fonts/bitmapFonts/gem.png', '/assets/fonts/bitmapFonts/gem.xml');
    }

    create () {
      this.stage.setBackgroundColor(0x272822);
      this.bmpText = this.add.bitmapText(32, 32, 'gem', this.text, 16);
      this.bmpText.maxWidth = 400;
      //
      this.input.onDown.addOnce(this.chopText, this);
    }

    update () {
    }

    render () {
    }

    chopText () {
      this.bmpText.text = this.text.substr(0, 26);
      let purged = this.bmpText.purgeGlyphs();
      this.add.bitmapText(32, 128, 'gem', 'Purged ' + purged + ' glyphs', 32);
    }
  }
})();