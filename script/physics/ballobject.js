/**
 * Created by hindrik on 7-10-16.
 */
class BallObject extends SphereObject {
    constructor(ballNumber, geometry, material, isMovable) {
        super(geometry, material, isMovable);

        this.ballNr = ballNumber;
    }
}