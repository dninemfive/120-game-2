class Menu extends Phaser.Scene {
    constructor() {
        super("Menu");
    }

    preload() {
        this.load.audio("MenuTheme", "assets/TrailingLightsMenuTheme.ogg"); //original theme
        this.load.audio('MenuTheme2', './assets/Background Music 1.wav'); //inspired by layers of fear ost
        this.load.audio('MenuTheme3', './assets/BackgroundMusic2.wav'); //inspired by What a Wonderful World

    }

    create() {
        let randomnum = Math.random();
        console.log(randomnum);

        if (musicPlaying == false) {
            this.menumusic = this.sound.add("MenuTheme", { loop: true });
            this.menumusic2 = this.sound.add("MenuTheme2", {volume: 0.2}, { loop: true});
            this.menumusic3 = this.sound.add("MenuTheme3", {volume: 0.15}, { loop: true});
            if (randomnum < 0.25) {
                this.menumusic3.play();
            } else if (randomnum < 0.50) {
                this.menumusic2.play();
            } else {
                this.menumusic.play();
            }
        }

        let menuConfig = {
            fontFamily: 'Century Gothic',
            fontSize: '150px',
            color: 'lime',
            align: 'right',
            padding: {
              top: 5,
              bottom: 5,
            },
            fixedWidth: 0
          }

          let commandConfig = {
            fontFamily: 'Century Gothic',
            fontSize: '28px',
            color: 'lime',
            align: 'right',
            padding: {
              top: 5,
              bottom: 5,
            },
            fixedWidth: 0
          }
        
          menuConfig.color = 'orange';
          this.add.text(game.config.width/2, game.config.height/2 - borderUISize -
            borderPadding, 'Trailing Lights', menuConfig).setOrigin(0.5);
        commandConfig.color = 'white';
        const commandplay = this.add.text(game.config.width/2, game.config.height/1.5 - borderUISize -
            borderPadding, 'Press SPACE to Play', commandConfig).setOrigin(0.5);
        const commandinstructions = this.add.text(game.config.width/2, game.config.height/1.4 - borderUISize -
            borderPadding, 'Press I for Instructions', commandConfig).setOrigin(0.5); 
        
        TweenHelper.flashElement(this, commandplay);
        TweenHelper.flashElement(this, commandinstructions);

    
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyI = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I);
    }

    update() {

        
        // if (Phaser.Input.Keyboard.JustDown(keyS)) {
        //     this.menumusic.stop();
        //     this.scene.start("Credits");
        // }

        if (Phaser.Input.Keyboard.JustDown(keySpace)) {
            this.menumusic.stop();
            this.menumusic2.stop();
            this.menumusic3.stop();
            this.scene.start("OpeningCutscene");
        }

        if(Phaser.Input.Keyboard.JustDown(keyI)) {
            this.scene.start("Instructions"); 
        }
    }
}