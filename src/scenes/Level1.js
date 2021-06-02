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
        this.load.spritesheet("playerside", "assets/Flame.png", { frameWidth: 1200, frameHeight: 1200, startFrame: 0, endFrame: 1});
        this.load.spritesheet("playerback", "assets/FlameBack.png", { frameWidth: 1200, frameHeight: 1200, startFrame: 0, endFrame: 1});
        this.load.spritesheet("playerfront", "assets/FlameFront.png", { frameWidth: 1200, frameHeight: 1200, startFrame: 0, endFrame: 1});
    }

    create() {
        this.ambience = this.sound.add("Ambience", { loop: true });
        this.ambience.play();

        this.anims.create({ key: "playerside", frames: this.anims.generateFrameNumbers("playerside", { start: 0, end: 1, first: 0}), frameRate: 12, repeat: -1 });
        this.anims.create({ key: "playerback", frames: this.anims.generateFrameNumbers("playerback", { start: 0, end: 1, first: 0}), frameRate: 12, repeat: -1 });
        this.anims.create({ key: "playerfront", frames: this.anims.generateFrameNumbers("playerfront", { start: 0, end: 1, first: 0}), frameRate: 12, repeat: -1 });

        this.player = new Player(this, game.config.width / 2, -100, "playerside").setOrigin(0.5, 0.5).setDepth(1);
        this.player.setScale(playerScale);        
        this.player.anims.play("playerside");
        
        //Change mute to true to work with audio layering. The tracks will
        //start playing muted, then use muteToggle to add them in or out in
        //order and as needed.
        let audioConfig = {
            rate : 1,
            mute : false,
            loop : true,
            volume: 0.5
        }
        this.track01 = this.sound.add('Temp01', audioConfig);
        this.track02 = this.sound.add('Temp02', audioConfig);
        this.track03 = this.sound.add('Temp03', audioConfig);
        this.track04 = this.sound.add('Temp04', audioConfig);
        this.isPlaying = false;

        // \/ not starting correctly
        this.startTheMusic();
        // I'm trying to work it out, but for now just press '0' to start the audio
            
        this.background = this.add.sprite(0, 0,"background").setOrigin(0.25,0.25).setDepth(-2);
        this.background.setScale(5.0);

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

        this.switches = new Array();//new Set();
        // We can change this ^ back if you want, but I find arrrays
        // easier to access in this case, since I can just grab an index...
        
        //for(let i = 0; i < 5; i++){aaaaaa
        //    let w = this.background.displayWidth / 2, h = this.background.displayHeight / 2;
        //    let x = Phaser.Math.Between(0, w), y = Phaser.Math.Between(0, h);
        //    this.switches.add(
        //        new Switch(this, x, y, "SwitchOff").setOrigin(0.5, 0.5)
        //    );
        //}
        //this.switches.add(new Switch(this, 0, 0, "switch").setOrigin(0.5,0.5).setScale(switchScale));
        this.switches[0] = new Switch(this, 500, -300, "switch").setOrigin(0.5,0.5).setScale(switchScale);

        this.debugCoords = this.add.text(game.config.width / 2, game.config.height, "asdf", debugConfig).setOrigin(0.5,1);
        //this.debugCoords2 = this.add.text(game.config.width / 2, game.config.height - 40, "asdf", debugConfig).setOrigin(0.5,1);
        //console.log(this.background.displayWidth + "; " + this.background.displayHeight);

        keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        key0 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ZERO);
        keyLEFTARROW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHTARROW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        this.distCheck = this.distanceBetweenSwitchAndPlayer();
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyF)) {
            this.ambience.stop();
            this.track01.stop();
            this.track02.stop();
            this.track03.stop();
            this.track04.stop();
            this.scene.start("EndCutscene");
            //musicPlaying = true;
        }

        if (playerWin == true) {
            this.ambience.stop();
            this.scene.start("EndCustcene");
        }

        this.player.update();
        let sw;
        for(let s of this.switches) {
            s.update();
            sw = s;
        } 
        this.debugCoords.text = "angle state: " + this.angleTestText() + ", distance: " + this.distanceBetweenSwitchAndPlayer();//"player facing " + this.playerOppositeAngle().toFixed(2) + ", angle between " + this.angleBetweenSwitchAndPlayer().toFixed(2);//this.player.rotationInternal;
        if(Phaser.Input.Keyboard.JustDown(key0)){
            this.startTheMusic();
        }
        if(Phaser.Input.Keyboard.JustDown(keyRIGHTARROW)){
            this.rateUp(this.track01);
            this.rateUp(this.track02);
            this.rateUp(this.track03);
            this.rateUp(this.track04);
        }
        if(Phaser.Input.Keyboard.JustDown(keyLEFTARROW)){
            this.rateDown(this.track01);
            this.rateDown(this.track02);
            this.rateDown(this.track03);
            this.rateDown(this.track04);
        }
        this.angleTest(this.track01, this.track02, this.track03, this.track04);
        this.distanceTest(this.track01, this.track02, this.track03, this.track04);
        this.distCheck = this.distanceBetweenSwitchAndPlayer();
        //this.debugCoords2.text = "your pos - switch pos = (" + (this.player.pos.x - sw.pos.x) + ", " + (this.player.pos.y - sw.pos.y) + ")";

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
            this.time.addEvent({
                delay: 1000,
                callback: ()=>{
                    this.track01.play();
                }
            })
            this.time.addEvent({
                delay: 1250,
                callback: ()=>{
                    this.track03.play();
                }
            })
            this.time.addEvent({
                delay: 1500,
                callback: ()=>{
                    this.track02.play();
                }
            })
            this.time.addEvent({
                delay: 1750,
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
            audio.rate += 0.001;
        }
    }

    rateDown(audio){
        if(audio.rate > 0.6){ //rounding errors means this is actually > 0.5
            audio.rate -= 0.001;
        }
    }

    // Here to round up that ugly function in there and make it more obvious
    // what it does.
    angleBetweenSwitchAndPlayer(){
        return Phaser.Math.Angle.Between((this.switches[0].pos.x - (game.config.width / 2)), 
                                         (this.switches[0].pos.y - (game.config.height / 2)),
                                         this.player.pos.x, this.player.pos.y);
    }

    // Finds the opposite angle of the direction the player is facing
    playerOppositeAngle(){
        if(this.player.rotation <= 0){
            return this.player.rotation + Math.PI;
        }
        return this.player.rotation - Math.PI;
    }

    // This function is responsible for governing the musical layering based on the
    // rotation of the player vs the angle between the player and the target switch.
    // That is, it tells you if you're facing the right direction by turning the
    // background music on or off.
    // (This took me embarassingly long to figure out)
    /*
    *            (All tracks on)
    *               \      /
    *               \      /      
    *                \    /
    *                \    /  (two tracks on)
    * (two tracks on) \  /
    *                 \  /
    *                ------
    *               |player|
    *                ------
    *              /        \
    *          /                \
    *      /     (one track on)     \             
    *  /                                \
    */
    angleTest(audio1, audio2, audio3, audio4){
        var PI_OVER_ELEVEN = Math.PI / 11;
        let theta = 0;
        // Subtract the larger angle from the smaller to get the absolute difference
        if(this.player.rotation > this.angleBetweenSwitchAndPlayer()){
            theta = this.player.rotation - this.angleBetweenSwitchAndPlayer();
        }
        else{
            theta = this.angleBetweenSwitchAndPlayer() - this.player.rotation;
        }

        // Subtract half the circle to get the angle compliment
        theta -= Math.PI;
        // Get the absolute value for comparison
        theta = Math.abs(theta);

        if(theta < PI_OVER_ELEVEN){
            audio1.setMute(false);
            audio2.setMute(false);
            audio3.setMute(false);
            audio4.setMute(false);
        }
        else if(theta < (9*PI_OVER_ELEVEN)){
            audio1.setMute(false);
            audio2.setMute(false);
            audio3.setMute(true);
            audio4.setMute(true);
        }
        else{
            audio1.setMute(false);
            audio2.setMute(true);
            audio3.setMute(true);
            audio4.setMute(true);
        }
    }

    angleTestText(){
        var PI_OVER_ELEVEN = Math.PI / 11;
        let theta = 0;
        // Subtract the larger angle from the smaller to get the absolute difference
        if(this.player.rotation > this.angleBetweenSwitchAndPlayer()){
            theta = this.player.rotation - this.angleBetweenSwitchAndPlayer();
        }
        else{
            theta = this.angleBetweenSwitchAndPlayer() - this.player.rotation;
        }

        // Subtract half the circle to get the angle compliment
        theta -= Math.PI;
        // Get the absolute value for comparison
        theta = Math.abs(theta);

        if(theta < PI_OVER_ELEVEN){
            return 0;
        }
        else if(theta < (9*PI_OVER_ELEVEN)){
            return 1;
        }
        return 2;
    }

    // Make our funky relation calculations look nice...
    distanceBetweenSwitchAndPlayer(){
        return Phaser.Math.Distance.Between((this.switches[0].pos.x - (game.config.width / 2)), 
                                         (this.switches[0].pos.y - (game.config.height / 2)),
                                         this.player.pos.x, this.player.pos.y);
    }

    distanceTest(audio1, audio2, audio3, audio4){
        if(this.distanceBetweenSwitchAndPlayer() > this.distCheck){
            this.rateDown(audio1);
            this.rateDown(audio2);
            this.rateDown(audio3);
            this.rateDown(audio4);
        }
        else if(this.distanceBetweenSwitchAndPlayer() < this.distCheck){
            this.rateUp(audio1);
            this.rateUp(audio2);
            this.rateUp(audio3);
            this.rateUp(audio4);
        }
        
        if(this.distanceBetweenSwitchAndPlayer() > 1500){
            audio1.setRate(0.5);
            audio2.setRate(0.5);
            audio3.setRate(0.5);
            audio4.setRate(0.5);
        }
        else if(this.distanceBetweenSwitchAndPlayer() > 1200){
            audio1.setRate(0.75);
            audio2.setRate(0.75);
            audio3.setRate(0.75);
            audio4.setRate(0.75);
        }
        else if(this.distanceBetweenSwitchAndPlayer() > 900){
            audio1.setRate(1);
            audio2.setRate(1);
            audio3.setRate(1);
            audio4.setRate(1);
        }
        else if(this.distanceBetweenSwitchAndPlayer() > 300){
            audio1.setRate(1.5);
            audio2.setRate(1.5);
            audio3.setRate(1.5);
            audio4.setRate(1.5);
        }
        else{
            audio1.setRate(2);
            audio2.setRate(2);
            audio3.setRate(2);
            audio4.setRate(2);
        }
        
    }
    
}