class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        // an internal position vector, as opposed to x and y, which are the screen position
        this.pos = new Phaser.Math.Vector2(playerStartPos);
        console.log("playerStartPos: " + playerStartPos.x + " pos: " + this.pos.x);
        this.printed = false;
    }

    update() {
        // To do simple 8-way movement without diagonal speed exploit, we simply add components to a vector then set its max distance to move speed
        let velocity = new Phaser.Math.Vector2(0, 0);
        if(!this.printed) console.log("before: " + velocity.x);
        if (keyLeft.isDown) { // todo: checks here to make sure you can't move past the boundary part of the texture
            velocity.x -= playerSpeed;
        }
        if (keyRight.isDown) {
            velocity.x += playerSpeed;
        }
        if (keyUp.isDown) {
            velocity.y -= playerSpeed;
        }
        if (keyDown.isDown) {
            velocity.y += playerSpeed;
        }
        if(!this.printed) console.log("mid: " + velocity.x);
        velocity = velocity.limit(playerSpeed);
        if(!this.printed) console.log("after: " + velocity.x);
        this.printed = true;
        this.pos = this.pos.add(velocity);        
        this.updateScreenPosition();
    }

    updateScreenPosition(){
        // if edges of background would be visible, move player on the screen instead to keep them in boundaries
        // otherwise, player should be in the center of the screen and move the background instead
        let background = this.scene.background;     
        this.updateCoord('x', background.displayWidth / 2, game.config.width);
        this.updateCoord('y', background.displayHeight / 2, game.config.height);
        
    }

    // performs the update for one dimension at a time. for example, updateCoord('x') updates the x dimension
    updateCoord(name, backgroundSize, screenSize){
        let background = this.scene.background;
        if(this.pos[name] < (-backgroundSize + screenSize)){
            this[name] = this.pos[name] - (screenSize / 2) + backgroundSize;
        } else if(this.pos[name] > (backgroundSize - screenSize)){
            console.log("this.pos." + name + ": " + this.pos[name] + " sd: " + (screenSize / 2) + " bd: " + backgroundSize + " res: " + (this[name] = this.pos[name] + (screenSize / 2) - backgroundSize));
            this[name] = this.pos[name] + (1.5 * screenSize) - backgroundSize;
        } else{
            this[name] = screenSize / 2;
            background[name] = -this.pos[name];
        }
    }
}