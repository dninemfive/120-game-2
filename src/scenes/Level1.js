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
        this.load.audio('FinalSwitch', './assets/FinalSwitch.wav');
        this.load.spritesheet("playerside", "assets/Flame.png", { frameWidth: 1200, frameHeight: 1200, startFrame: 0, endFrame: 1});
        this.load.spritesheet("playerback", "assets/FlameBack.png", { frameWidth: 1200, frameHeight: 1200, startFrame: 0, endFrame: 1});
        this.load.spritesheet("playerfront", "assets/FlameFront.png", { frameWidth: 1200, frameHeight: 1200, startFrame: 0, endFrame: 1});
        this.load.spritesheet("switchActive", "assets/SwitchOn.png", {frameWidth: 640, frameHeight: 480, startFrame: 0, endFrame: 239});
    }

    create() {
        this.ambience = this.sound.add("Ambience", { loop: true });
        this.ambience.play();

        this.anims.create({ key: "playerside", frames: this.anims.generateFrameNumbers("playerside", { start: 0, end: 1, first: 0}), frameRate: 12, repeat: -1 });
        this.anims.create({ key: "playerback", frames: this.anims.generateFrameNumbers("playerback", { start: 0, end: 1, first: 0}), frameRate: 12, repeat: -1 });
        this.anims.create({ key: "playerfront", frames: this.anims.generateFrameNumbers("playerfront", { start: 0, end: 1, first: 0}), frameRate: 12, repeat: -1 });
        this.anims.create({ key: "switchActive", frames: this.anims.generateFrameNumbers("switchActive", {start: 0, end: 239, first: 0}), frameRate:25, repeat: -1 });

        this.player = new Player(this, game.config.width / 2, -100, "playerside").setOrigin(0.5, 0.5).setDepth(1);
        this.player.setScale(playerScale);        
        this.player.anims.play("playerside");
        
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

        // Has to have a delay, worked into the function
        // May want to consider having manual delay in controls, too.
        this.startTheMusic();
            
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

        this.switchNumber = 5;// Important control line, change to alter length of game.

        this.switches = new Array(this.switchNumber);
        let selectedPoints = this.switchSetup(this.switches.length);
        for(let i = 0; i < this.switches.length; i++){
            this.switches[i] = new Switch(this, selectedPoints[i].x, selectedPoints[i].y, "switch").setOrigin(0.5,0.5).setScale(switchScale);
        }

        // This block is a load buffer for the switch animation.
        // Without it, there is a delay upon activating the first switch, as phaser
        // needs time to unpack the spritesheet. This forces that process before gameplay,
        // as it ensures that the switch animation is rendered for 1/10th of a second just
        // beyond the top left corner of the screen.
        this.animLoadSwitch = new Switch(this, -50, -50, "switchActive").setOrigin(0.5,0.5).setScale(switchScale);
        this.animLoadSwitch.anims.play("switchActive");
        this.time.addEvent({
            delay: 100,
            callback: ()=>{
                this.animLoadSwitch.destroy();
            }
        })
        // We can change this ^ back if you want, but I find arrays
        // easier to access in this case, since I can just grab an index...
        
        //for(let i = 0; i < 5; i++){aaaaaa
        //    let w = this.background.displayWidth / 2, h = this.background.displayHeight / 2;
        //    let x = Phaser.Math.Between(0, w), y = Phaser.Math.Between(0, h);
        //    this.switches.add(
        //        new Switch(this, x, y, "SwitchOff").setOrigin(0.5, 0.5)
        //    );
        //}
        //this.switches.add(new Switch(this, 0, 0, "switch").setOrigin(0.5,0.5).setScale(switchScale));
        /*
        this.switches[0] = new Switch(this, 0, 0, "switch").setOrigin(0.5,0.5).setScale(switchScale);
        this.switches[1] = new Switch(this, -500, -300, "switch").setOrigin(0.5,0.5).setScale(switchScale);
        this.switches[2] = new Switch(this, -500, 300, "switch").setOrigin(0.5,0.5).setScale(switchScale);
        this.switches[3] = new Switch(this, 500, 300, "switch").setOrigin(0.5,0.5).setScale(switchScale);
        */

        /*
        this.bucket = [];
        for (var i=0;i<5;i++) {
            this.bucket.push(i);
        }  */ 


        
        

        this.debugCoords = this.add.text(game.config.width / 2, game.config.height, "", debugConfig).setOrigin(0.5,1);
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

        this.distCheck = this.distanceBetweenSwitchAndPlayer(this.switches[0]);
        this.switchIterator = 0;
    }

    update() {
        if ((this.distanceBetweenSwitchAndPlayer(this.switches[this.switchIterator]) < 80) && 
            Phaser.Input.Keyboard.JustDown(keyF)) {
            this.finalswitch = this.sound.add("FinalSwitch", { loop: false });
            this.finalswitch.play();
            // if i + 1 would be > number of switches - 1, don't slip into a 
            // situation where you fall off the end of the array.
            if((this.switchIterator + 1) == this.switchNumber){
                this.ambience.stop();
                this.track01.stop();
                this.track02.stop();
                this.track03.stop();
                this.track04.stop();
                this.scene.start("EndCutscene");
                //musicPlaying = true;
            }
            else{
                this.track01.setRate(1);
                this.track02.setRate(1);
                this.track03.setRate(1);
                this.track04.setRate(1);
                this.switches[this.switchIterator].setTexture("switchActive");
                this.switches[this.switchIterator].anims.play("switchActive");
                this.switches[this.switchIterator].setScale(0.48);
                this.switchIterator += 1;
            }
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
        //this.debugCoords.text = "direction: " + this.angleTestText(this.switches[this.switchIterator]) + "         distance: " + Math.round(this.distanceBetweenSwitchAndPlayer(this.switches[this.switchIterator]));//"player facing " + this.playerOppositeAngle().toFixed(2) + ", angle between " + this.angleBetweenSwitchAndPlayer().toFixed(2);//this.player.rotationInternal;
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
        if(Phaser.Input.Keyboard.JustDown(key0)){
            this.ambience.stop();
                this.track01.stop();
                this.track02.stop();
                this.track03.stop();
                this.track04.stop();
                this.scene.start("EndCutscene");
        }

        

        this.angleTest(this.track01, this.track02, this.track03, this.track04, this.switches[this.switchIterator]);
        this.distanceTest(this.track01, this.track02, this.track03, this.track04, this.switches[this.switchIterator]);
        this.distCheck = this.distanceBetweenSwitchAndPlayer(this.switches[this.switchIterator]);
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
    angleBetweenSwitchAndPlayer(currentSwitch){
        return Phaser.Math.Angle.Between((currentSwitch.pos.x - (game.config.width / 2)), 
                                         (currentSwitch.pos.y - (game.config.height / 2)),
                                         this.player.pos.x, this.player.pos.y);
    }

    // Make our funky relation calculations look nice...
    distanceBetweenSwitchAndPlayer(currentSwitch){
        return Phaser.Math.Distance.Between((currentSwitch.pos.x - (game.config.width / 2)), 
                                         (currentSwitch.pos.y - (game.config.height / 2)),
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
    angleTest(audio1, audio2, audio3, audio4, currentSwitch){
        var PI_OVER_ELEVEN = Math.PI / 11;
        let theta = 0;
        // Subtract the larger angle from the smaller to get the absolute difference
        if(this.player.rotation > this.angleBetweenSwitchAndPlayer(currentSwitch)){
            theta = this.player.rotation - this.angleBetweenSwitchAndPlayer(currentSwitch);
        }
        else{
            theta = this.angleBetweenSwitchAndPlayer(currentSwitch) - this.player.rotation;
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

    angleTestText(currentSwitch){
        var PI_OVER_ELEVEN = Math.PI / 11;
        let theta = 0;
        // Subtract the larger angle from the smaller to get the absolute difference
        if(this.player.rotation > this.angleBetweenSwitchAndPlayer(currentSwitch)){
            theta = this.player.rotation - this.angleBetweenSwitchAndPlayer(currentSwitch);
        }
        else{
            theta = this.angleBetweenSwitchAndPlayer(currentSwitch) - this.player.rotation;
        }

        // Subtract half the circle to get the angle compliment
        theta -= Math.PI;
        // Get the absolute value for comparison
        theta = Math.abs(theta);

        if(theta < PI_OVER_ELEVEN){
            return "straight ahead";
        }
        else if(theta < (9*PI_OVER_ELEVEN)){
            return "turn";
        }
        return "other way";
    }

    distanceTest(audio1, audio2, audio3, audio4, currentSwitch){
        if(this.distanceBetweenSwitchAndPlayer(currentSwitch) > this.distCheck){
            this.rateDown(audio1);
            this.rateDown(audio2);
            this.rateDown(audio3);
            this.rateDown(audio4);
        }
        else if(this.distanceBetweenSwitchAndPlayer(currentSwitch) < this.distCheck){
            this.rateUp(audio1);
            this.rateUp(audio2);
            this.rateUp(audio3);
            this.rateUp(audio4);
        }
    }

    // This method draws five points from a set of ten, creating a partially
    // random set of switches to hit for the level.
    switchSetup(len) {
        let points = [];
        let p0 = new Phaser.Geom.Point(500, -300);
        let p1 = new Phaser.Geom.Point(2000, 2000);
        let p2 = new Phaser.Geom.Point(-1500, 4000);
        let p3 = new Phaser.Geom.Point(-3800, -2200);
        let p4 = new Phaser.Geom.Point(4900, -1090);
        let p5 = new Phaser.Geom.Point(300, 300);
        let p6 = new Phaser.Geom.Point(-4010, 2000);
        let p7 = new Phaser.Geom.Point(-1900, -3850);
        let p8 = new Phaser.Geom.Point(2900, -800);
        let p9 = new Phaser.Geom.Point(4700, 4700);

        points.push(p0);
        points.push(p1);
        points.push(p2);
        points.push(p3);
        points.push(p4);
        points.push(p5);
        points.push(p6);
        points.push(p7);
        points.push(p8);
        points.push(p9);

        for(let i = 0; i < len; i++){
            var randomIndex = Math.floor(Math.random()*points.length);
            points.splice(randomIndex, 1)[0];
        }

        return points;
    }

}