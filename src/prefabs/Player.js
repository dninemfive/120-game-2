class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        // an internal position vector, as opposed to x and y, which are the screen position
        this.pos = new Phaser.Math.Vector2(playerStartPos);
        this.rotationInternal = 0; // in radians, as specified here: https://photonstorm.github.io/phaser3-docs/Phaser.GameObjects.Sprite.html#rotation
                                   // internal rotation is used to use the four-way sprite graphics instead
    }

    update() {
        // To do simple 8-way movement without diagonal speed exploit, we simply add components to a vector then set its max distance to move speed
        // Altered this ^^^ to allow 'flight' controls
        // A and D now rotate the sprite, W and S move it foreward or backward
        // relative to its orientation. This enables the core mechanic of knowing if you are facing
        // the right direction.
        let velocity = new Phaser.Math.Vector2(0, 0);
        if (keyLeft.isDown) {
            velocity.x -= playerSpeed;
            //this.rotationInternal -= 0.01;
        }
        if (keyRight.isDown) {
            velocity.x += playerSpeed;
            //this.rotationInternal += 0.01;
        }
        this.clampRotation();
        if (keyUp.isDown) {
            velocity.y -= playerSpeed;
            //velocity.setToPolar(this.rotationInternal, playerSpeed);
        }
        if (keyDown.isDown) {
            velocity.y += playerSpeed;
            //velocity.setToPolar(this.rotationInternal, (-1*playerSpeed));
        }
        isDebugTick = (++debugCounter) % 1000 == 0;
        velocity = velocity.limit(playerSpeed);
        this.printed = true;
        this.pos = this.pos.add(velocity);
        //if(isDebugTick) console.log("position: (" + this.pos.x + ", " + this.pos.y + ")");
        velocity = this.keepPlayerInBounds(velocity, this.scene.background.displayWidth / 4);
        this.updateScreenPosition();
        this.updateGraphic();
    }

    updateScreenPosition(){
        // if edges of background would be visible, move player on the screen instead to keep them in boundaries
        // otherwise, player should be in the center of the screen and move the background instead
        let background = this.scene.background;
        this.returnPlayerToBounds(background.displayWidth / 4);
        this.updateCoord('x', background.displayWidth / 2, game.config.width);
        this.updateCoord('y', background.displayHeight / 2, game.config.height);        
    }

    // performs the update for one dimension at a time. for example, updateCoord('x') updates the x dimension
    updateCoord(dimension, backgroundSize, screenSize){
        if(this.pos[dimension] < (-backgroundSize + screenSize)){
            this[dimension] = this.pos[dimension] - (screenSize / 2) + backgroundSize;
        } else if(this.pos[dimension] > (backgroundSize - screenSize)){
            this[dimension] = this.pos[dimension] + (1.5 * screenSize) - backgroundSize;
        } else{
            this[dimension] = screenSize / 2;
            this.scene.background[dimension] = -this.pos[dimension];
        }
    }

    returnPlayerToBounds(backgroundSize) {
        if(this.wouldTakePlayerOutOfBounds('x', undefined, backgroundSize - borderWidth)){
            this.pos.x = backgroundSize - borderWidth;
        }
        if(this.wouldTakePlayerOutOfBounds('x', undefined, -backgroundSize + borderWidth)){
            this.pos.x = -backgroundSize + borderWidth;
        }
        if(this.wouldTakePlayerOutOfBounds('y', undefined, backgroundSize - borderWidth)){
            this.pos.y = backgroundSize - borderWidth;
        }
        if(this.wouldTakePlayerOutOfBounds('y', undefined, -backgroundSize + borderWidth)){
            this.pos.y = -backgroundSize + borderWidth;
        }
    }

    keepPlayerInBounds(vector, backgroundSize){
        if(this.wouldTakePlayerOutOfBounds('x', vector, backgroundSize - borderWidth) || this.wouldTakePlayerOutOfBounds('x', vector, -backgroundSize + borderWidth)){
            vector.x = 0;
        }
        if(this.wouldTakePlayerOutOfBounds('y', vector, backgroundSize - borderWidth) || this.wouldTakePlayerOutOfBounds('y', vector, -backgroundSize + borderWidth)){
            vector.y = 0;
        }
        return vector;
    }

    wouldTakePlayerOutOfBounds(dimension, vector, boundary){
        if(typeof vector === 'undefined') vector = new Phaser.Math.Vector2(0, 0);
        if(boundary < 0){
            let result = this.pos[dimension] + vector[dimension] < boundary;
            return result;
        } else {
            let result = this.pos[dimension] + vector[dimension] > boundary;
            return result;
        }
        
    }

    clampRotation(){
        let tau = Phaser.Math.PI2;
        if(this.rotationInternal < 0) {
            this.rotationInternal += tau;
        }
        if(this.rotationInternal >= tau) {
            this.rotationInternal -= tau;
        }
    }

    updateGraphic(){
        /*
        right: x <= pi / 4 || x > 7pi / 4
        back:  x > pi / 4 && x <= 3pi / 4
        left:  x > 3pi / 4 && x <= 5pi / 4
        front: rest
        */
        let qpi = Math.PI / 4,
            rot = this.rotationInternal;
        if(rot <= qpi || rot > qpi * 7) {
            this.anims.play("playerside");
            this.setFlip(false, false);
        } else if(rot <= qpi * 3) {
            this.anims.play("playerback");
        } else if(rot <= qpi * 5) {
            this.anims.play("playerside");
            this.setFlip(true, false);
        } else {
            this.anims.play("playerfront");
        }
    }
}