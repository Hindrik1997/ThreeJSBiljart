class PhysicsObject extends GameObject {
    constructor(geometry, material, isMovable) {
        super(geometry, material);
        this._isMovable = isMovable;
        this.movement = new THREE.Vector3(0, 0, 0);
        this.movementThisFrame = 0;
        this.isOnGround = false;
        this.isInPocket = false;
        this.prevPosition = this.mesh.position;
        this.raycaster = new THREE.Raycaster(this.mesh.position, new THREE.Vector3(0, -1, 0), 0, this.distanceToGround + 0.02);
        if (this.isMovable) GAME.registerForUpdates(this.updateMovement, this);
        GAME.collisionController.registerObject(this);
    }

    get maxMovementPerFrame() {
        // Radius multiplier
        return 2;
    }

    get distanceToGround() {
        return 0;
    }

    get isMovable() {
        return this._isMovable;
    }

    set isMovable(value) {
        this._isMovable = value;
    }

    get isMoving() {
        return this.movement.length() !== 0;
    }

    collidedWith(otherObject) {
        let normal = this.getSurfaceNormal(otherObject).negate(),
            totalLength = this.movement.length() + otherObject.movement.length();
        if (totalLength === 0) return;
        this.normalAH.setDirection(normal);

        this.movement.normalize();
        let newMovement = this.movement.sub(normal.multiplyScalar(this.movement.dot(normal) * 2));

        if(otherObject.isMovable)
        {
            this.movement = newMovement.setLength(totalLength / 2);
            otherObject.movement = normal.setLength(totalLength / 2)
        }
        else
        {
            this.movement = newMovement.setLength(totalLength);
        }

        this.mesh.position.set(this.prevPosition.x, this.prevPosition.y, this.prevPosition.z);
    }

    getSurfaceNormal(otherObject) {
        if (otherObject instanceof SphereObject) {
            let posCpy = this.mesh.position.clone();
            return posCpy.sub(otherObject.mesh.position).normalize().negate();
        }
        else if (otherObject instanceof CubeObject) {
            let params = otherObject.mesh.geometry.parameters;
            let posDiff = Utils.calculatePositionDifference(otherObject.mesh.position, this.mesh.position);
            // Account for the size of the cube
            posDiff.x = Utils.reduceByCubeRadius(posDiff.x, params.width / 2);
            posDiff.y = Utils.reduceByCubeRadius(posDiff.y, params.height / 2);
            posDiff.z = Utils.reduceByCubeRadius(posDiff.z, params.depth / 2);

            let unfinishedNormal = posDiff.clone();


            // Remove all but the largest coordinate from the vector
            if(Math.abs(unfinishedNormal.x) < Math.abs(unfinishedNormal.y)) {
                unfinishedNormal.y = 0;
                if(Math.abs(unfinishedNormal.x) < Math.abs(unfinishedNormal.z)) {
                    unfinishedNormal.z = 0;
                }
                else {
                    unfinishedNormal.x = 0;
                }
            }
            else {
                unfinishedNormal.x = 0;
                if(Math.abs(unfinishedNormal.y) < Math.abs(unfinishedNormal.z)) {
                    unfinishedNormal.z = 0;
                }
                else {
                    unfinishedNormal.y = 0;
                }
            }

            // Finally, normalize the vector and we have the normal vector
            return unfinishedNormal.normalize();
        }
    }

    // Apply the friction and gravity to the movement vector
    //noinspection JSMethodCanBeStatic
    updateMovement(that) {
        // Check if this object is on the ground;
        if (that.isMovable) {
            that.checkGround();

            if (that.isOnGround) {
                // Apply floor friction
                that.movement.setLength(that.movement.length() * PHYSICSNUMBERS.floorFriction);
            }
            else {
                // Apply gravity
                that.movement.y -= PHYSICSNUMBERS.gravity;
                // Apply air friction
                that.movement.setY(that.movement.y * PHYSICSNUMBERS.airFriction);
            }

            if(that.movement.length() < 0.1)
            {
                that.movement.setLength(0);
                return;
            }
            that.applyMovement();
        }
    }

    // Translate the object with the numbers in the movement vector, taking the time since the last frame into account
    applyMovement() {
        // movement * time since last frame
        // movement needs to be very small numbers
        // check if it doesn't exceed speed limit

        this.prevPosition = this.mesh.position.clone();

        let movementCopy = this.movement.clone();

        movementCopy.multiplyScalar(GAME.frameTime);

        this.limitSpeed(movementCopy);


        this.mesh.position.add(movementCopy);
    }

    limitSpeed(vector) {
        if(vector.length() > this.maxMovementPerFrame) {

            vector.setLength(this.maxMovementPerFrame);
            console.log("slowed it down", this.maxMovementPerFrame);
        }
    }

    checkGround() {
        let intersectedObjects = this.raycaster.intersectObjects(GAME.poolTable.group.children, true);
        this.isOnGround = intersectedObjects.length !== 0;
        if (this.isOnGround && Math.abs(this.movement.y) < 0.5) {

            // When close to the ground but not on the ground, set position to on the ground
            this.mesh.position.y = intersectedObjects[0].point.y + this.distanceToGround;
            this.movement.y = 0;
        }
    }

    dispose() {
        GAME.collisionController.deregisterObject(this);
        super.dispose();
    }
}
