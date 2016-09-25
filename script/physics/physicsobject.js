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
        return this.movement.length() !== 0;
    }

    get geometry() {
        return this._geometry;
    }

    set geometry(value) {
        this._geometry = value;
    }

    collidedWith(otherObject) {
        let normal = this.getSurfaceNormal(otherObject),
            dotProduct = this.movement.dot(normal);
           // totalLength = this.movement.length() + normal.length();
            //if(totalLength === 0) return;
            let inAngle = Math.acos((dotProduct));

        console.log(otherObject);
        let ah = new THREE.ArrowHelper(normal.normalize(), this.mesh.position, 3, 0xff0000);
        GAME.scene.add(ah);
        console.log("normal",normal, "dot", dotProduct, "totalL", 0, "inangle", inAngle);
        // let newMovement = normal.multiplyScalar(dotProduct).multiplyScalar(-2).add(this.movement);
        let projected = normal.multiplyScalar(dotProduct),
            multiplied = projected.multiplyScalar(2),
            added = multiplied.sub(this.movement);
        console.log("collision", inAngle * (180 / Math.PI));
        console.log("current movement", this.movement);
        console.log("new     movement", added);
        this.movement = added;
    }

    getSurfaceNormal(otherObject) {
        if (otherObject instanceof SphereObject) {
            let posCpy = this.mesh.position.clone();
            return posCpy.sub(otherObject.mesh.position).normalize();
        }
        else if (otherObject instanceof CubeObject) {
            //TODO: implement
            return new THREE.Vector3();
        }
    }

    // Apply the friction and gravity to the movement vector
    //noinspection JSMethodCanBeStatic
    updateMovement(that) {
        // Check if this object is on the ground;
        if (that.isMoveable) {
            that.checkGround();

            if (that.isOnGround) {
                // Apply floor friction
                that.movement.setLength(that.movement.length() * PHYSICSNUMBERS.floorFriction);
            }
            else {
                // Apply gravity
                that.movement.y -= PHYSICSNUMBERS.gravity;
                // Apply air friction
                that.movement.setLength(that.movement.length() * PHYSICSNUMBERS.airFriction);
            }


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
<<<<<<< HEAD
        if(this.isOnGround && this.movement.y < 0.01 ) {
=======
        if (this.isOnGround && Math.abs(this.movement.y) < 0.01) {
>>>>>>> 35073c91b72000d48f0e948f3afac3bf809bb049
            // When close to the ground but not on the ground, set position to on the ground
            console.log("object close to ground, landing", this.movement);
            this.mesh.position.y = intersectedObjects[0].point.y + this.distanceToGround;
            this.movement.y = 0;
        }
    }

    dispose() {
        COLLISIONCONTROLLER.deregisterObject(this);
        super.dispose();
    }
}
