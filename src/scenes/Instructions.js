class Instructions extends Phaser.Scene {
    constructor() {
        super("Instructions");
    }

    preload() {
        
    }

    create() {
        let instructConfig = {
            fontFamily: 'Century Gothic',
            fontSize: '26px',
            color: 'lime',
            align: 'right',
            padding: {
              top: 5,
              bottom: 5,
            },
            fixedWidth: 0
          }

          instructConfig.color = 'lightblue';
        this.add.text(game.config.width/2, game.config.height/6 - borderUISize -
            borderPadding, 'Instructions', instructConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/4 - borderUISize -
            borderPadding, 'Let sound guide you: The rate of the tempo indicates your distance from switches.', instructConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/3.5 - borderUISize -
            borderPadding, 'Complexity of the music heard indicates direction from your target.', instructConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/3 - borderUISize -
            borderPadding, 'High Tempo and complexity, closest to target.', instructConfig).setOrigin(0.5);  
        this.add.text(game.config.width/2, game.config.height/2.5 - borderUISize -
            borderPadding, 'Slow Tempo and single notes, furthest from target.', instructConfig).setOrigin(0.5); 
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize -
            borderPadding, 'You are Flame, denizen of the Light Dimension. Your ultimate goal was to find the Light Tower,', instructConfig).setOrigin(0.5); 
        this.add.text(game.config.width/2, game.config.height/1.8 - borderUISize -
            borderPadding, 'but you have lost your way in the Musical Dimension, an unlit realm where all beings use sound to', instructConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/1.63 - borderUISize -
            borderPadding, 'traverse the darkness. A trail of Safety Switches guides foreigners to safety, lest they lose themselves', instructConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/1.5- borderUISize -
            borderPadding, 'to the darkness for all eternity. Flipping a switch illuminates the surrounding parameter for safe passage.', instructConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/1.38- borderUISize -
            borderPadding, 'Few foreigners have escaped the Musical Dimension, but those that have claim flipping all Safety Switches is key.', instructConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/1.25- borderUISize -
            borderPadding, 'WS to move, AD to turn, F to FLIP. Good luck.', instructConfig).setOrigin(0.5);
        const commandReturn = this.add.text(game.config.width/2, game.config.height/1.15 - borderUISize -
            borderPadding, 'Press Esc to Return', instructConfig).setOrigin(0.5);
        
        TweenHelper.flashElement(this, commandReturn);
        
        keyEsc = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyEsc)) {
            this.scene.start("Menu");
            musicPlaying = true;
        }
    }

}