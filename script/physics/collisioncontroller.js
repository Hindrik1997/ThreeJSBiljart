class CollisionController {
    constructor() {
        this.collidableObjects = [];
    }

    registerObject(object) {
        this.collidableObjects.push(object);
    }

    deregisterObject(object) {
        let index = this.collidableObjects.indexOf(object);
        if (index < 0) return;
        this.collidableObjects.splice(index, 1);
    }

    //noinspection JSMethodCanBeStatic
    checkCollisions() {
        for (let i = 0; i < this.collidableObjects.length - 1; ++i) {
            let currentObject = this.collidableObjects[i];
            for (let j = i + 1; j < this.collidableObjects.length; ++j) {
                // Check if the two object collide

                if (currentObject.isCollidingWith(this.collidableObjects[j])) {
                    // Handle the collision from the object that is moving, if one of them isn't moving
                    // Also make sure to handle collisions with the pocket from the pocket
                    if ((currentObject.isMoving && !(this.collidableObjects[j] instanceof Pocket)) || currentObject instanceof Pocket) {
                        currentObject.collidedWith(this.collidableObjects[j]);
                    }
                    else {
                        this.collidableObjects[j].collidedWith(currentObject);
                    }
                }
            }
        }
    }
}