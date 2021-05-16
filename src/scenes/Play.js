class Level1 extends Phaser.Scene {
    constructor() {
        super("level1");
    }

    preload() {
        this.load.image("background", "assets/TrailingLightsProtoBackground.png");
    }

    create() {
        this.background = this.add.sprite(game.config.width / 2, game.config.height / 2,"background").setOrigin(0.5,0.5).setDepth(-2);

        keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    }

    update() {

    }
}