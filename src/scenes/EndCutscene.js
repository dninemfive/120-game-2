class EndCutscene extends Phaser.Scene {
    constructor() {
        super("EndCutscene");
    }

    preload() {
        this.load.image("End1", "assets/EndCutscenePage1.png");
        this.load.image("End2", "assets/EndCutscenePage2.png");
        this.load.image("End3", "assets/EndCutscenePage3.png");
        this.load.image("End4", "assets/EndCutscenePage4.png");
        this.load.image("End5", "assets/EndCutscenePage5.2.png");
        this.load.audio('FinalSwitch', './assets/FinalSwitch.wav');
        this.load.audio('EndTheme', './assets/EndTheme.wav');
    }

    create() {
        this.finalswitch = this.sound.add("FinalSwitch", { loop: false });
        this.finalswitch.play();
        this.endingTheme = this.sound.add("EndTheme", { loop: false });
        this.endingTheme.play();


        let EndConfig = {
            fontFamily: 'Century Gothic',
            fontSize: '26px',
            // stroke = '#000000',
            backgroundColor: 'gold',
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

          this.End1 = this.add.sprite(0, 0,"End1").setOrigin(-0.10,-0.025).setDepth(0);
          this.End1.setScale(0.65);
          this.End1.alpha = 1;
          this.End2 = this.add.sprite(0, 0,"End2").setOrigin(-0.10,-0.025).setDepth(0);
          this.End2.setScale(0.65);
          this.End2.alpha = 0;
          this.End3 = this.add.sprite(0, 0,"End3").setOrigin(-0.10,-0.025).setDepth(0);
          this.End3.setScale(0.65);
          this.End3.alpha = 0;
          this.End4 = this.add.sprite(0, 0,"End4").setOrigin(-0.10,-0.025).setDepth(0);
          this.End4.setScale(0.65);
          this.End4.alpha = 0;
          this.End5 = this.add.sprite(0, 0,"End5").setOrigin(-0.10,-0.025).setDepth(0);
          this.End5.setScale(0.65);
          this.End5.alpha = 0;

          this.LightTower = this.add.text(game.config.width/2, game.config.height/6 - borderUISize -
            borderPadding, 'The Light Tower is just up ahead.', EndConfig).setOrigin(0.5);
            this.LightTower.alpha = 0;
            this.Success = this.add.text(game.config.width/2, game.config.height/4.5 - borderUISize -
                borderPadding, 'You made it!', EndConfig).setOrigin(0.5);
                this.Success.alpha = 0;
        this.commandEscape = this.add.text(game.config.width/3.5, game.config.height/2- borderUISize -
            borderPadding, 'Press Esc to Return to Main Title', EndConfig).setOrigin(0.5);
            this.commandEscape.alpha = 0;
            this.commandRestart = this.add.text(game.config.width/3.5, game.config.height/1.8 - borderUISize -
                borderPadding, 'Press R to Restart', EndConfig).setOrigin(0.5);
                this.commandRestart.alpha = 0;
                this.commandCredits = this.add.text(game.config.width/1.4, game.config.height/1.9- borderUISize -
                    borderPadding, 'Press C for Credits', EndConfig).setOrigin(0.5);
                    this.commandCredits.alpha = 0;
            
        
        // TweenHelper.flashElement(this, commandRestart);
        
        keyEsc = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    }

    update() {
        this.timePast += 0.00695; //counts time

        //cutscene transitions
        if (this.timePast > 3.5) {
            this.End2.alpha = 1;
        }

        if (this.timePast > 7) {
            this.End3.alpha = 1;
        }

        if (this.timePast > 14) {
            this.End4.alpha = 1;
        }

        if (this.timePast > 18.5) {
            this.End5.alpha = 1;
            this.commandEscape.alpha = 1;
            this.commandRestart.alpha = 1;
            this.commandCredits.alpha = 1;
            this.LightTower.alpha = 1;
            this.Success.alpha = 1;
        }

        //links to other scenes
        if (Phaser.Input.Keyboard.JustDown(keyR)) {
            this.endingTheme.stop();
            this.scene.start("Level1");
        }
        if (Phaser.Input.Keyboard.JustDown(keyEsc)) {
            this.endingTheme.stop();
            this.scene.start("Menu");
        }
        if (Phaser.Input.Keyboard.JustDown(keyC)) {
            this.endingTheme.stop();
            this.scene.start("Credits");
        }
    }

}