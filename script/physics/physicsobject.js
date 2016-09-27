class PhysicsObject extends GameObject {
    constructor(mesh, isMovable) {
        super(mesh);
        this._isMovable = isMovable;
        this.movement = new THREE.Vector3(0, 0, 0);
        this.movementThisFrame = 0;
        this.isOnGround = false;
        this.prevPosition = this.mesh.position;
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
            totalLength = this.movement.length() + otherObject.movement.length();
        if (totalLength === 0) return;
        // let dotProduct = this.movement.normalize().dot(normal),
        //     inAngle = Math.acos((dotProduct / totalLength));

        let ah = new THREE.ArrowHelper(normal.normalize(), this.mesh.position, 3, 0xff0000);
        GAME.scene.add(ah);

        this.movement.normalize();
        console.log("normal", normal);
        // console.log("current movement", this.movement);
        // let newMovement = this.movement.sub(normal.multiplyScalar(this.movement.dot(normal) * 2));
        let outgoingVector = ((d, n) => d.sub(n.multiplyScalar(d.dot(n) * 2))),
            newMovement = outgoingVector(this.movement.clone(), normal);


        // console.log("new     movement", newMovement);
        this.movement = newMovement.setLength(totalLength);
    }

    getSurfaceNormal(otherObject) {
        if (otherObject instanceof SphereObject) {
            let posCpy = this.mesh.position.clone();
            return posCpy.sub(otherObject.mesh.position).normalize();
        }
        else if (otherObject instanceof CubeObject) {
            //TODO: implement
            let params = otherObject.mesh.geometry.parameters;
            console.log("ball       pos", this.prevPosition);
            console.log("box        pos", otherObject.mesh.position);
            console.log("params        ", params);
            let posDiff = Utils.calculatePositionDifference(otherObject.mesh.position, this.mesh.position);
            // Account for the size of the cube
            console.log("posdif before ", posDiff);
            posDiff.x = Utils.reduceByCubeRadius(posDiff.x, params.width / 2);
            posDiff.y = Utils.reduceByCubeRadius(posDiff.y, params.height / 2);
            posDiff.z = Utils.reduceByCubeRadius(posDiff.z, params.depth / 2);

            console.log("difference pos", posDiff);

            // Remove all but the largest coordinate from the vector
            if(Math.abs(posDiff.x) < Math.abs(posDiff.y)) {
                posDiff.y = 0;
                if(Math.abs(posDiff.x) < Math.abs(posDiff.z)) {
                    posDiff.z = 0;
                }
                else {
                    posDiff.x = 0;
                }
            }
            else {
                posDiff.x = 0;
                if(Math.abs(posDiff.y) < Math.abs(posDiff.z)) {
                    posDiff.z = 0;
                }
                else {
                    posDiff.y = 0;
                }
            }

            // Finally, normalize the vector and we have the normal vector
            return posDiff.normalize();
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

        this.prevPosition = this.mesh.position;
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
        if (this.isOnGround && Math.abs(this.movement.y) < 0.01) {
            // When close to the ground but not on the ground, set position to on the ground
            console.log("object close to ground, landing", this.movement);
            this.mesh.position.y = intersectedObjects[0].point.y + this.distanceToGround + 0.0001;
            this.movement.y = 0;
        }
    }

    dispose() {
        COLLISIONCONTROLLER.deregisterObject(this);
        super.dispose();
    }
}
