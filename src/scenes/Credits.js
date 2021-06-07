class Credits extends Phaser.Scene {
    constructor() {
        super("Credits");
    }

    preload() {
        this.load.audio('CreditsTheme', './assets/CreditsTheme.wav');
    }

    create() {
        this.creditsTheme = this.sound.add("CreditsTheme", { loop: true });
        this.creditsTheme.play();

        let CreditConfig = {
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

             this.skipScene = this.add.text(game.config.width/2, game.config.height/6 - borderUISize -
            borderPadding, 'CREDITS:', CreditConfig).setOrigin(0.5);
            this.skipScene = this.add.text(game.config.width/3.5, game.config.height/3 - borderUISize -
                borderPadding, 'Lucas Bryant', CreditConfig).setOrigin(0.5);
            this.add.text(game.config.width/3.5, game.config.height/2.5 - borderUISize -
                borderPadding, 'Lead Programmer', CreditConfig).setOrigin(0.5);
            this.add.text(game.config.width/3.5, game.config.height/2.2 - borderUISize -
                borderPadding, 'Sound Designer', CreditConfig).setOrigin(0.5);
            this.add.text(game.config.width/1.4, game.config.height/3 - borderUISize -
                borderPadding, 'Victoria Rafaelian', CreditConfig).setOrigin(0.5);
            this.add.text(game.config.width/1.4, game.config.height/2.5 - borderUISize -
                borderPadding, 'Artist, Writer, Sound Designer', CreditConfig).setOrigin(0.5);
            this.add.text(game.config.width/1.4, game.config.height/2.2 - borderUISize -
                borderPadding, 'Programmer', CreditConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/1.7 - borderUISize -
                borderPadding, 'Graydon Simons', CreditConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/1.55 - borderUISize -
                borderPadding, 'Programmer', CreditConfig).setOrigin(0.5);
               
            
                
                const restartRound = this.skipScene = this.add.text(game.config.width/2, game.config.height/1.15 - borderUISize -
                    borderPadding, 'Press R to Restart', CreditConfig).setOrigin(0.5);
                const returnTitle = this.skipScene = this.add.text(game.config.width/2, game.config.height/1.08 - borderUISize -
                    borderPadding, 'Press Esc to Return to Main Title', CreditConfig).setOrigin(0.5);
            
        
        TweenHelper.flashElement(this, restartRound);
        TweenHelper.flashElement(this, returnTitle);
        
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyEsc = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    }

    update() {
        this.timePast += 0.00695; //counts time

        if (Phaser.Input.Keyboard.JustDown(keyR)) {
            this.creditsTheme.stop();
            this.scene.start("Level1");
            //musicPlaying = true;
        }

        if (Phaser.Input.Keyboard.JustDown(keyEsc)) {
            this.creditsTheme.stop();
            this.scene.start("Menu");
            //musicPlaying = true;
        }
    }

}