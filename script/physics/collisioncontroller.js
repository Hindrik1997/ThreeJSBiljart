class CollisionController {
    constructor() {
        this.collidableObjects = [];
        GAME.registerForUpdates(this.checkCollisions, this);
    }

    registerObject(object) {
        this.collidableObjects.push(object);
    }

    deregisterObject(object) {
        let index = this.collidableObjects.indexOf(object);
        if (index < 0) return;
        this.collidableObjects.splice(index);
    }

    //noinspection JSMethodCanBeStatic
    checkCollisions(that) {
        for (let i = 0; i < that.collidableObjects.length - 1; ++i) {
            let currentObject = that.collidableObjects[i];
            for (let j = i + 1; j < that.collidableObjects.length; ++j) {
                // Check if the two object collide\
                if (currentObject.isCollidingWith(that.collidableObjects[j])) {
                    // Handle the collision from the object that is moving, if one of them isn't moving
                    if(currentObject.isMoving) currentObject.collidedWith(that.collidableObjects[j]);
                    else that.collidableObjects[j].collidedWith(currentObject);
                }
            }
        }
    }
}