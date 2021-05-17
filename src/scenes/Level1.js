class Level1 extends Phaser.Scene {
    constructor() {
        super("Level1");
    }

    preload() {
        this.load.image("background", "assets/TrailingLightsProtoBackground.png");
        this.load.image("player", "assets/TrailingLightsProtoCharacter.png");
        this.load.audio('Temp01', './assets/TLTest1.wav');
        this.load.audio('Temp02', './assets/TLTest2.wav');
        this.load.audio('Temp03', './assets/TLTest3.wav');
        this.load.audio('Temp04', './assets/TLTest4.wav');
    }

    create() {
        this.background = this.add.sprite(0, 0,"background").setOrigin(0.5,0.5).setDepth(-2);
        this.background.setScale(1.5);

        this.player = new Player(this, 0, 0, "player").setOrigin(0.5, 0.5);
        this.player.setScale(playerScale);

        let debugConfig = {
            fontFamily: 'Century Gothic',
            fontSize: '30px',
            color: 'lime',
            padding: {
              top: 5,
              bottom: 5,
            },
            fixedWidth: 0
        }
        this.debugCoords = this.add.text(game.config.width / 2, game.config.height, "asdf", debugConfig).setOrigin(0.5,1);
        console.log(this.background.displayWidth + "; " + this.background.displayHeight);

        this.switches = new Set();
        for(let i = 0; i < 5; i++){
            let w = this.background.displayWidth / 2, h = this.background.displayHeight / 2;
            let x = Phaser.Math.Between(0, w), y = Phaser.Math.Between(0, h);
            this.switches.add(
                new Switch(this, x, y, "switchOff").setOrigin(0.5, 0.5)
            );
        }

        let audioConfig = {
            mute : false,
            loop : true,
            volume: 0.5
        }
        this.track01 = this.sound.add('Temp01', audioConfig);
        this.track02 = this.sound.add('Temp02', audioConfig);
        this.track03 = this.sound.add('Temp03', audioConfig);
        this.track04 = this.sound.add('Temp04', audioConfig);

        keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    }

    update() {
        this.player.update();
        for(let s of this.switches) s.update();        
        this.debugCoords.text = "screen: (" + Math.round(this.player.x) + ", " + Math.round(this.player.y) + "); internal: (" + 
                                 Math.round(this.player.pos.x) + ", " + Math.round(this.player.pos.y) + ")";
    }

// Helper Functions ==================================

    //The four tracks need to be the same length in order to loop
    //correctly, but the rhythym demands that they be delayed from
    //one another, hence this function, which turns the tracks on
    //and off in the correct order at the proper time.
    startTheMusic(){
        if(this.track01.isPlaying){
            this.track01.stop();
            this.track02.stop();
            this.track03.stop();
            this.track04.stop();
        }
        else{
            this.track01.play();
            this.time.addEvent({
                delay: 250,
                callback: ()=>{
                    this.track03.play();
                }
            })
            this.time.addEvent({
                delay: 500,
                callback: ()=>{
                    this.track02.play();
                }
            })
            this.time.addEvent({
                delay: 750,
                callback: ()=>{
                    this.track04.play();
                }
            })
        }
    }

    
}