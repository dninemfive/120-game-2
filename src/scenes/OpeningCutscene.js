class OpeningCutscene extends Phaser.Scene {
    constructor() {
        super("OpeningCutscene");
    }

    preload() {
        this.load.image("Open1", "assets/OpeningCutscenePage1.png");
        this.load.image("Open2", "assets/OpeningCutscenePage2.png");
        this.load.image("Open3", "assets/OpeningCutscenePage3.png");
        this.load.image("Open4", "assets/OpeningCutscenePage4.png");
        this.load.image("Open5", "assets/OpeningCutscenePage5.png");
        this.load.image("Open6", "assets/OpeningCutsceneCutscene6.png");
        this.load.image("Open7", "assets/OpeningCutscenePage7.png");
        this.load.audio("OpeningTheme", './assets/OpeningTheme.wav');
        this.load.audio('IntroTheme', './assets/IntroTheme.wav');
    }

    create() {
        this.OpeningTheme = this.sound.add("IntroTheme", { loop: true });
        this.OpeningTheme.play();

        let BeginConfig = {
            fontFamily: 'Century Gothic',
            fontSize: '26px',
            // stroke = '#000000',
            color: 'darkorange',
            align: 'right',
            padding: {
              top: 5,
              bottom: 5,
            },
            fixedWidth: 0
          }

        this.timePast = 0;
        this.showCommands = 0;

          this.Open1 = this.add.sprite(0, 0,"Open1").setOrigin(-0.10,-0.025).setDepth(0);
          this.Open1.setScale(0.65);
          this.Open1.alpha = 1;
          this.Open2 = this.add.sprite(0, 0,"Open2").setOrigin(-0.10,-0.025).setDepth(0);
          this.Open2.setScale(0.65);
          this.Open2.alpha = 0;
          this.Open3 = this.add.sprite(0, 0,"Open3").setOrigin(-0.10,-0.025).setDepth(0);
          this.Open3.setScale(0.65);
          this.Open3.alpha = 0;
          this.Open4 = this.add.sprite(0, 0,"Open4").setOrigin(-0.10,-0.025).setDepth(0);
          this.Open4.setScale(0.65);
          this.Open4.alpha = 0;
          this.Open5 = this.add.sprite(0, 0,"Open5").setOrigin(-0.10,-0.025).setDepth(0);
          this.Open5.setScale(0.65);
          this.Open5.alpha = 0;
          this.Open6 = this.add.sprite(0, 0,"Open6").setOrigin(-0.10,-0.025).setDepth(0);
          this.Open6.setScale(0.65);
          this.Open6.alpha = 0;
          this.Open7 = this.add.sprite(0, 0,"Open7").setOrigin(-0.10,-0.025).setDepth(0);
          this.Open7.setScale(0.65);
          this.Open7.alpha = 0;

            this.commandSkip = this.skipScene = this.add.text(game.config.width/2, game.config.height/6 - borderUISize -
            borderPadding, 'Press Esc to Skip Cutscene', BeginConfig).setOrigin(0.5);
            this.enterRound = this.skipScene = this.add.text(game.config.width/2, game.config.height/3 - borderUISize -
                borderPadding, 'Press Esc to Begin', BeginConfig).setOrigin(0.5);
                this.enterRound.alpha = 0;
            
        
        TweenHelper.flashElement(this, this.commandSkip);
        
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyEsc = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    }

    update() {
        this.timePast += 0.00695; //counts time

        if (this.timePast > 1) {
            this.Open2.alpha = 1;
        }

        if (this.timePast > 2) {
            this.Open3.alpha = 1;
        }

        if (this.timePast > 6) {
            this.Open4.alpha = 1;
        }

        if (this.timePast > 10) {
            this.Open5.alpha = 1;
        }

        if (this.timePast > 13) {
            this.Open6.alpha = 1;
        }
        
        if (this.timePast > 16) {
            this.Open6.alpha = 1;
        }

        if (this.timePast > 19) {
            this.Open7.alpha = 1;
            this.commandSkip.alpha = 0;
            this.enterRound.alpha = 1;

        }

        if (Phaser.Input.Keyboard.JustDown(keyEsc)) {
            this.OpeningTheme.stop();
            this.scene.start("Level1");
            //musicPlaying = true;
        }
    }

}