class Menu extends Phaser.Scene {
    constructor() {
        super("Menu");
    }

    preload() {
        this.load.audio("MenuTheme", "assets/TrailingLightsMenuTheme.ogg");

    }

    create() {
        
        this.menumusic = this.sound.add("MenuTheme", { loop: true });
        this.menumusic.play();

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
        keyI = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I);
    }

    update() {

        if (Phaser.Input.Keyboard.JustDown(keySpace)) {
            this.scene.start("Level1");
            this.menumusic.stop();
        }

        if(Phaser.Input.Keyboard.JustDown(keyI)) {
            this.scene.start("Instructions");
            this.menumusic.stop();
        }
    }
}