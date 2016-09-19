class PhysicsObject extends GameObject {
    constructor(mesh, geometry, material, isMovable) {
        super(mesh, geometry, material);
        this._isMovable = isMovable;
        COLLISIONCONTROLLER.registerObject(this);
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
         console.log(this.constructor.name, "collided with", otherObject.constructor.name);
    }

    dispose() {
        COLLISIONCONTROLLER.deregisterObject(this);
        super.dispose();
    }
}