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
            borderPadding, ' but you have lost your way in the Musical dimension, an unlit realm where all beings use sound to traverse the darkness.', instructConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/1.63 - borderUISize -
            borderPadding, 'A trail of Safety Switches guides players to safety, lest they lose themselves to the darkness for all eternity. ', instructConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/1.5- borderUISize -
            borderPadding, 'Flipping a switch illuminates the surrounding parameter for safe passage. Few foreigners have escaped the Musical Dimension,', instructConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/1.38- borderUISize -
            borderPadding, 'but those that have claim flipping all Safety Switches is key. WASD to move, F to FLIP. Good luck.', instructConfig).setOrigin(0.5);
        const commandReturn = this.add.text(game.config.width/2, game.config.height/1.2- borderUISize -
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