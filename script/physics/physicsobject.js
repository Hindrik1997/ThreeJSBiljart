class PhysicsObject extends GameObject {
    constructor(mesh, isMovable) {
        super(mesh);
        this._isMovable = isMovable;
        this.movement = new THREE.Vector3(0, 0, 0);
        this.movementThisFrame = 0;
        GAME.registerForUpdates(this.updateMovement, this);
        COLLISIONCONTROLLER.registerObject(this);
    }

    get maxMovementPerFrame() {
        return 0;
    }

    get isMoveable() {
        return this._isMovable;
    }

    get geometry() {
        return this._geometry;
    }

    set geometry(value) {
        this._geometry = value;
    }

    collidedWith(otherObject) {
        // console.log(this.constructor.name, "collided with", otherObject.constructor.name);
    }

    // Apply the friction and gravity to the movement vector
    //noinspection JSMethodCanBeStatic
    updateMovement(that) {
        //that.movement.set(0.01,0.01,0.01);
        //that.applyMovement();
    }

    // Translate the object with the numbers in the movement vector, taking the time since the last frame into account
    applyMovement() {
        // movement * time since last frame
        // movement needs to be very small numbers
        // check if it doesn't exceed speed limit

        let movementCopy = this.movement.clone();

        movementCopy.multiplyScalar(GAME.frameTime);

        this.movementThisFrame = (this.movement.length() > this.maxMovementPerFrame) ?
            movementCopy.setLength(this.maxMovementPerFrame).length() : movementCopy.length();

        this.mesh.position.add(movementCopy);
    }

    dispose() {
        COLLISIONCONTROLLER.deregisterObject(this);
        super.dispose();
    }
}