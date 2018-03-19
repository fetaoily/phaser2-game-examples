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
      this.mods = [];
      this.current = 0;
      this.vumeter = [];
      this.channels = [];
      this.module = null;
    }

    preload () {
      this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.game.scale.pageAlignHorizontally = true;
      this.game.scale.pageAlignVertically = true;
      //
      this.game.load.script('protracker', '/_plugins/ProTracker.js');
      //
      this.game.load.image('vu', '/assets/sprites/vu.png');
      this.game.load.image('logo', '/assets/sprites/soundtracker.png');
      this.game.load.image('bg', '/assets/skies/sky2.png');
      this.game.load.image('vulkaiser', '/assets/pics/vulkaiser_red.png');
      //
      this.load.binary(
          'shampoo',
          '/assets/audio/protracker/shampoo.mod',
          this.modLoaded,
          this
      );
      this.load.binary(
          'macrocosm',
          '/assets/audio/protracker/macrocosm.mod',
          this.modLoaded,
          this
      );
      this.load.binary(
          'impulse',
          '/assets/audio/protracker/act_of_impulse.mod',
          this.modLoaded,
          this
      );
      this.load.binary(
          'enigma',
          '/assets/audio/protracker/enigma.mod',
          this.modLoaded,
          this
      );
      this.load.binary(
          'elysium',
          '/assets/audio/protracker/elysium.mod',
          this.modLoaded,
          this
      );
      this.load.binary(
          'stardust',
          '/assets/audio/protracker/sd-ingame1.mod',
          this.modLoaded,
          this
      );
      this.load.binary(
          'globaltrash',
          '/assets/audio/protracker/global_trash_3_v2.mod',
          this.modLoaded,
          this
      );
    }

    create () {
      this.game.add.sprite(0, 0, 'bg');
      this.game.add.sprite(500, 32, 'logo');
      this.game.add.sprite(500, 371, 'vulkaiser');
      //
      for (let i = 0, y = 200; i < 4; i++, y += 50) {
        this.vumeter[i] = this.game.add.sprite(400, y, 'vu');
        this.vumeter[i].crop(new Phaser.Rectangle(0, 0, 300, 30));
      }
      //
      this.module = new Protracker();
      this.module.onReady = () => {
        this.module.play();
      };
      this.module.buffer = this.game.cache.getBinary(this.mods[this.current]);
      this.module.parse();
      //
      this.game.input.onDown.add(this.load_next_module, this);
    }

    update () {
      for (let i = 0; i < this.vumeter.length; i++) {
        if (this.module.channel[i]) {
          let smp_index = this.module.channel[i].sample;
          this.channels[i] = {
            sample_index: smp_index,
            sample_name: this.module.sample[smp_index].name
          };
          let w = Math.round(this.module.vu[i] * 1200);
          if (w > 300) {
            w = 300;
          }
          this.vumeter[i].cropRect.width = w;
          this.vumeter[i].updateCrop();
        }
      }
    }

    render () {
      for (let i = 0, y = 32; i < this.vumeter.length; i++, y += 32) {
        if (this.channels[i]) {
          this.game.debug.text(
              'Channel #' +
              i +
              ' :sample ' +
              this.channels[i].sample_index +
              '  ' +
              this.channels[i].sample_name,
              16,
              y
          );
        }
      }
      //
      this.game.debug.text('Position: ' + this.module.position, 16, 160);
      this.game.debug.text('Pattern: ' + this.module.row, 16, 192);
      this.game.debug.text('BPM: ' + this.module.bpm, 16, 224);
      this.game.debug.text('Speed: ' + this.module.speed, 16, 256);
      this.game.debug.text('Name: ' + this.module.title, 16, 288);
      this.game.debug.text('Signature: ' + this.module.signature, 16, 320);
    }

    modLoaded (key, data) {
      this.mods.push(key);
      let buffer = new Uint8Array(data);
      return buffer;
    }

    load_next_module () {
      this.current === this.mods.length - 1
          ? (this.current = 0)
          : this.current++;
      //
      this.module.stop();
      this.module.clearsong();
      //
      this.module.buffer = this.game.cache.getBinary(this.mods[this.current]);
      this.module.parse();
    }
  }
})();
