(() => {
  'use strict';
  let game;
  //
  let musicIndex = null,
      ym,
      oldValues,
      values,
      vu1,
      vu2,
      vu3,
      moveData,
      vuGroup,
      musicListGroup,
      selector,
      currentPlayingSelector,
      cursors,
      time,
      spacebar;
  //
  let musics = [
    {
      name: 'A prehistoric tale 7',
      author: 'Madmax',
      file: 'assets/audio/ym/A_Prehistoric_Tale_7.ym'
    },

    {
      name: 'Copperkaahbaahnaah',
      author: 'Big Alec',
      file: 'assets/audio/ym/big_alec-copperkaahbaahnaah.ym'
    },

    {
      name: 'Thundercats',
      author: 'David Whittaker',
      file: 'assets/audio/ym/david_whittaker-thundercats.ym'
    },

    {
      name: 'Giga Dist',
      author: 'Count0',
      file: 'assets/audio/ym/count0-giga_dist.ym'
    },

    {
      name: 'Comic Bakery',
      author: 'Madmax',
      file: 'assets/audio/ym/mad_max-comic_bakery.ym'
    },

    {
      name: 'Do you speak russian',
      author: 'Jess',
      file: 'assets/audio/ym/jess-do_you_speak_russian.ym'
    },

    {
      name: 'Turrican1 1',
      author: 'Madmax',
      file: 'assets/audio/ym/mad_max-turrican1-1.ym'
    },

    {
      name: 'Wings of death 1',
      author: 'Madmax',
      file: 'assets/audio/ym/mad_max-wings_of_death1.ym'
    }
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
    }

    preload () {
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.scale.pageAlignHorizontally = true;
      this.scale.pageAlignVertically = true;
      //
      this.load.script('YM', '/_plugins/YM.js');
      //
      this.load.image('logo', '/assets/demoscene/atari.png');
      this.load.image('bg', '/assets/skies/sky2.png');
      //
      musics.forEach(music => {
        this.game.load.binary(music.name, music.file);
      });
    }

    create () {
      let musicsList, style, list;
      //
      moveData = this.game.make
          .tween({y: 0})
          .to({y: 300}, 1000, 'Sine.easeIn')
          .yoyo(true)
          .generateData(60);
      //
      this.game.add.sprite(0, 0, 'bg');
      //
      vuGroup = this.game.add.group();
      //
      this.game.add.sprite(600, 32, 'logo');
      //
      musicListGroup = this.game.add.group();
      //
      musicsList = '';
      musics.forEach((music, n) => {
        musicsList += music.author + ' ' + music.name + '\n';
      });
      //
      style = {font: '18px Arial', fill: '#ffffff', align: 'center'};
      list = this.game.add.text(
          this.game.world.centerX,
          2,
          musicsList,
          style,
          musicListGroup
      );
      list.lineSpacing = 8;
      list.anchor.set(0.5, 0);
      //
      musicListGroup.y = 380;
      currentPlayingSelector = this.game.add.graphics(0, 0, musicListGroup);
      currentPlayingSelector.beginFill(0xffffff, 0.2);
      currentPlayingSelector.drawRect(0, 0, this.game.world.width, 21);
      //
      selector = this.game.add.graphics(0, 0, musicListGroup);
      selector.beginFill(0xffffff, 0.4);
      selector.drawRect(0, 0, this.game.world.width, 21);
      //
      vu1 = this.game.add.graphics(0, 0, vuGroup);
      vu2 = this.game.add.graphics(0, 110, vuGroup);
      vu3 = this.game.add.graphics(0, 220, vuGroup);
      //
      vu1.movePosIndex = 0;
      vu2.movePosIndex = 15;
      vu3.movePosIndex = 30;
      //
      vuGroup.y = 70;
      //
      this.changeSong(0);
      this.moveSelector(0);
      //
      cursors = this.game.input.keyboard.createCursorKeys();
      spacebar = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
      //
      time = this.game.time.time;
    }

    update () {
      let max = this.game.world.width / 1.5;
      for (let i = 0; i <= 2; i++) {
        if (ym.vu[i] > 1) {
          values[i] = ym.vu[i] * (max / 40);
        } else {
          values[i] -= 4;
          if (values[i] < 1) {
            values[i] = 0;
          }
        }
      }
      //
      this.buildVu(vu3, 0xab124f, 0xe9128d, values[0]);
      this.buildVu(vu2, 0x8d126e, 0xca12ab, values[1]);
      this.buildVu(vu1, 0x6e128d, 0xab12ca, values[2]);
      //
      [vu1, vu2, vu2].forEach((vu, n) => {
        let p;
        if (vu.movePosIndex >= moveData.length) {
          vu.movePosIndex = 0;
        }
        p = moveData[vu.movePosIndex];
        vu.y = p.y;
        vu.movePosIndex++;
      });
      //
      for (let i = 0; i <= 2; i++) {
        oldValues[i] = ym.vu[i];
      }
      //
      if (this.game.time.time - time > 200) {
        if (cursors.up.isDown && musicIndex > 0) {
          musicIndex -= 1;
          this.moveSelector(musicIndex);
          time = this.game.time.time;
        } else if (cursors.down.isDown && musicIndex < musics.length - 1) {
          musicIndex += 1;
          this.moveSelector(musicIndex);
          time = this.game.time.time;
        } else if (spacebar.isDown) {
          this.changeSong(musicIndex);
          time = this.game.time.time;
        }
      }
    }

    render () {
      if (!ym) {
        return;
      }
      this.game.debug.text('Title : ' + ym.info.title, 16, 24);
      this.game.debug.text('Author: ' + ym.info.author, 16, 40);
      this.game.debug.text('Comment: ' + ym.info.comment, 16, 56);
      //
      this.game.debug.text('vu1: ' + ym.vu[0], 16, 72);
      this.game.debug.text('vu2: ' + ym.vu[1], 16, 88);
      this.game.debug.text('vu3: ' + ym.vu[2], 16, 104);
    }

    changeSong (index) {
      let data = game.cache.getBinary(musics[index].name);
      //
      if (!ym) {
        ym = new YM(data);
      } else {
        ym.stop();
        ym.clearsong();
        ym.parse(data);
      }
      //
      oldValues = [0, 0, 0];
      values = [0, 0, 0];
      //
      ym.play();
      //
      currentPlayingSelector.y = selector.y;
    }

    moveSelector (index) {
      selector.y = index * 26;
    }

    buildVu (vu, colorbg, color, width) {
      let height = 75;
      let offsetY = (this.game.world.width - width) / 2;
      //
      vu.clear();
      vu.beginFill(colorbg, 1);
      vu.drawRect(0, 0, this.game.world.width, height);
      //
      vu.beginFill(color, 1);
      vu.drawRect(offsetY, 0, width, height);
      vu.drawRect(offsetY - 10, 0, 5, height);
      vu.drawRect(offsetY - 20, 0, 3, height);
      //
      vu.drawRect(width + offsetY + 5, 0, 5, height);
      vu.drawRect(width + offsetY + 18, 0, 3, height);
      //
      vu.beginFill(0, 0.3);
      vu.drawRect(0, height - 25, this.game.world.width, 25);
    }
  }
})();
