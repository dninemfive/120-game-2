class Level1 extends Phaser.Scene {
    constructor() {
        super("Level1");
    }

    preload() {
        this.load.image("background", "assets/FirstLevelBackground.jpg");
        this.load.image("switch", "assets/SwitchOff.png");
        this.load.audio('Temp01', './assets/TLTest1.wav');
        this.load.audio('Temp02', './assets/TLTest2.wav');
        this.load.audio('Temp03', './assets/TLTest3.wav');
        this.load.audio('Temp04', './assets/TLTest4.wav');
        this.load.audio('Ambience', './assets/Background Ambience.wav');
        this.load.spritesheet("playerside", "assets/Flame.png", { frameWidth: 1024, frameHeight: 1024, startFrame: 0, endFrame: 1});
    }

    create() {
        this.ambience = this.sound.add("Ambience", { loop: true });
        this.ambience.play();

        this.player = new Player(this, game.config.width / 2, -100, "playerside").setOrigin(0.5, 0.5);
        this.player.setScale(playerScale);
        this.anims.create({ key: "playerside", frames: this.anims.generateFrameNumbers("playerside", { start: 0, end: 1, first: 0}), frameRate: 12, repeat: -1 });
        this.player.anims.play("playerside");
        
        //Change mute to true to work with audio layering. The tracks will
        //start playing muted, then use muteToggle to add them in or out in
        //order and as needed.
        let audioConfig = {
            mute : false,
            loop : true,
            volume: 0.5
        }
        this.track01 = this.sound.add('Temp01', audioConfig);
        this.track02 = this.sound.add('Temp02', audioConfig);
        this.track03 = this.sound.add('Temp03', audioConfig);
        this.track04 = this.sound.add('Temp04', audioConfig);
        this.isPlaying = false;

        //this.startTheMusic();
            
        this.background = this.add.sprite(0, 0,"background").setOrigin(0.25,0.25).setDepth(-2);
        this.background.setScale(1.5);

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
                new Switch(this, x, y, "SwitchOff").setOrigin(0.5, 0.5)
            );
        }

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

    //This does exaclty what it sounds like. I was using this to layer audio
    //in and out. If you want to play with that, the order doesn't really matter,
    //but I wrote it to be track 1, 2, 3, then 4.
    muteToggle(audio){
        if(audio.mute == true){
            audio.setMute(false);
        }
        else{
            audio.setMute(true);
        }
    }

    //The two functions play with the rate of playback, it detunes it, because
    //of course it does, but it's one method of achieving the speed element to
    //the sound effects.
    rateUp(audio){
        if(audio.rate < 3){
            audio.rate += 0.1;
        }
    }

    rateDown(audio){
        if(audio.rate > 0.6){ //rounding errors means this is actually > 0.5
            audio.rate -= 0.1;
        }
    }

    
}