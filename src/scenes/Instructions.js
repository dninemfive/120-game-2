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
            borderPadding, 'Disonant, low notes indicate danger. You are not alone in the darkness.', instructConfig).setOrigin(0.5); 
        this.add.text(game.config.width/2, game.config.height/1.5 - borderUISize -
            borderPadding, 'Watch your back, and move quickly. Flipping switches illuminates the surrounding parameter.', instructConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/1.3- borderUISize -
            borderPadding, 'Flip all switches to illuminate the door to the next area. WASD to move, E to interact. Good luck.', instructConfig).setOrigin(0.5);
        const commandReturn = this.add.text(game.config.width/2, game.config.height/1.2- borderUISize -
            borderPadding, 'Press Esc to Return', instructConfig).setOrigin(0.5);
        
        TweenHelper.flashElement(this, commandReturn);
        
        keyEsc = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyEsc)) {
            this.scene.start("Menu");
        }
    }

}