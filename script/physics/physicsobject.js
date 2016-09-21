class PhysicsObject extends GameObject {
    constructor(mesh, isMovable) {
        super(mesh);
        this._isMovable = isMovable;
        this.movement = new THREE.Vector3(0, 0, 0);
        this.movementThisFrame = 0;
        this.isOnGround = false;
        this.raycaster = new THREE.Raycaster(this.mesh.position, new THREE.Vector3(0, -1, 0), 0, this.distanceToGround + 0.01);
        if (this.isMoveable) GAME.registerForUpdates(this.updateMovement, this);
        COLLISIONCONTROLLER.registerObject(this);
    }

    get maxMovementPerFrame() {
        return 0;
    }

    get distanceToGround() {
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
        // Check if this object is on the ground;
        that.checkGround();

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
            this.limitSpeed(movementCopy).length() : movementCopy.length();

        this.mesh.position.add(movementCopy);
    }

    limitSpeed(vector) {
        console.log("Slowing down...", this.constructor.name);
        return vector.setLength(this.maxMovementPerFrame);
    }

    checkGround() {
        let intersectedObjects = this.raycaster.intersectObjects(GAME.scene.children, true);
        this.isOnGround = intersectedObjects.length !== 0;
        if(this.isOnGround) {
            // When close to the ground but not on the ground, set position to on the ground
            console.log(intersectedObjects[0].point.y, this.distanceToGround, this.constructor.name);
            this.mesh.position.y = intersectedObjects[0].point.y + this.distanceToGround;
        }
    }

    dispose() {
        COLLISIONCONTROLLER.deregisterObject(this);
        super.dispose();
    }
}