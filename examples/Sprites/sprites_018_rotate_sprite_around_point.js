(()=>{
  'use strict';
  let game;

  window.onload = ()=>{
    game = new NewGame();
  };

  class NewGame extends ErtaoGame{
    constructor(){
      super(800,600,Phaser.AUTO);
      this.state.add('PlayGame',PlayGame);
      this.state.start('PlayGame');
    }
  }

  class PlayGame extends ErtaoGameState{
    constructor(){
      super();
      this.ship = null;
      this.orb = null;
      this.cursors = null;
    }

    preload(){
      super.preload();
      //
      this.load.image('ship','/assets/sprites/shmup-ship2.png');
      this.load.image('ball','/assets/sprites/blue_ball.png');
    }

    create(){
      this.stage.setBackgroundColor('#001255');
      //
      this.ship = this.add.sprite(400,300,'ship');
      this.ship.anchor.setTo(0.5,0.5);
      //
      this.physics.arcade.enable(this.ship);
      //
      this.orb = this.add.sprite(400,300,'ball');
      this.orb.anchor.setTo(0.5);
      this.orb.pivot.x = 100;
      //
      this.cursors = this.input.keyboard.createCursorKeys();

    }

    update(){
      this.ship.body.velocity.x = 0;
      this.ship.body.velocity.y = 0;
      //
      if(this.cursors.left.isDown){
        this.ship.body.velocity.x =-300;
      } else if(this.cursors.right.isDown){
        this.ship.body.velocity.x = 300;
      }
      //
      if(this.cursors.up.isDown){
        this.ship.body.velocity.y = -300;
      } else if(this.cursors.down.isDown){
        this.ship.body.velocity.y = 300;
      }
      //
      this.preRender();
      //
      this.orb.rotation += 0.05;
    }

    render(){}

    preRender(){
      this.orb.x = this.ship.x;
      this.orb.y = this.ship.y;
    }
  }
})();