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
        // Radius multiplier
        return 2;
    }

    get distanceToGround() {
        return 0;
    }

    get isMoveable() {
        return this._isMovable;
    }

    get isMoving() {
        return this.movement.length !== 0;
    }

    get geometry() {
        return this._geometry;
    }

    set geometry(value) {
        this._geometry = value;
    }

    collidedWith(otherObject) {
        if(otherObject instanceof SphereObject) {
            let sphereNormal = this.mesh.position.sub(otherObject.mesh.position).normalize();
            let dotProduct = this.movement.dot(sphereNormal);
            let totalLength = this.movement.length() + sphereNormal.length();
            let inAngle = Math.acos((dotProduct / totalLength));
            console.log("collision", inAngle);
        }
    }

    // Apply the friction and gravity to the movement vector
    //noinspection JSMethodCanBeStatic
    updateMovement(that) {
        // Check if this object is on the ground;
        if(that.isMoveable) {
            that.checkGround();

            if (that.isOnGround) {
                // Apply floor friction
                that.movement.setLength(that.movement.length() * PHYSICSNUMBERS.floorFriction);
            }
            else {
                // Apply gravity
                that.movement.y -= PHYSICSNUMBERS.gravity;
            }

            // Apply air friction
            that.movement.setLength(that.movement.length() * PHYSICSNUMBERS.airFriction);

            that.applyMovement();
        }
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
        // console.log("Slowing down...", this.constructor.name);
        return vector.setLength(this.maxMovementPerFrame);
    }

    checkGround() {
        let intersectedObjects = this.raycaster.intersectObjects(GAME.scene.children, true);
        this.isOnGround = intersectedObjects.length !== 0;
        if(this.isOnGround /* && this.movement.y < 0.01 */ ) {
            // When close to the ground but not on the ground, set position to on the ground
            this.mesh.position.y = intersectedObjects[0].point.y + this.distanceToGround;
            this.movement.y = 0;
        }
    }

    dispose() {
        COLLISIONCONTROLLER.deregisterObject(this);
        super.dispose();
    }
}
