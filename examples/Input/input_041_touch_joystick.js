(() => {
  let game;

  window.onload = () => {
    game = new Phaser.Game(800, 600, Phaser.AUTO);
    game.state.add('PlayGame', PlayGame);
    game.state.start('PlayGame');
  };

  let PlayGame = function () {
  };

  PlayGame.prototype = {
    preload () {
      //
      this.ufo = null;
      this.ufoSpeed = 200;
      //
      game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      game.scale.pageAlignHorizontally = true;
      game.scale.pageAlignVertically = true;
      //
      game.world.setBounds(0, 0, 800, 600);
      game.load.image('ufo', '/assets/sprites/ufo.png');
    },
    create () {
      this.ufo = game.add.sprite(320, 240, 'ufo');
      this.ufo.anchor.setTo(0.5, 0.5);
      //
      game.physics.enable(this.ufo, Phaser.Physics.ARCADE);
      //
      GameController.init({
        left: {
          type: 'joystick',
          joystick: {
            touchStart () {
            },
            touchMove (joystick_details) {
              game.input.joystickLeft = joystick_details;
            },
            touchEnd () {
              game.input.joystickLeft = null;
            }
          }
        },
        right: {
          type: 'none'
        }
      });
      $('canvas').last().css('z-index', 20);
      $('canvas').last().offset($('canvas').first().offset());
    },
    update () {
      if (game.input.joystickLeft) {
        this.ufo.body.velocity.setTo(game.input.joystickLeft.normalizedX * 200, game.input.joystickLeft.normalizedY * this.ufoSpeed * -1);
      } else {
        this.ufo.body.velocity.setTo(0, 0);
      }
    },
    render () {
      game.debug.text('Use the virtual joystick to move the UFO.', 20, 20);
      game.debug.text('This requires touch events, so try on your phone.', 20, 20 * 2);
    }
  };
})();