/**
 * Created by hindr on 9/14/2016.
 */

class PoolTable
{
    constructor(width, height, GameObject)
    {
        this.BasePlateGeom = new THREE.BoxGeometry(width, 0.2 ,height);
        this.BasePlateMat = new THREE.MeshLambertMaterial({ color : "green" });
        this.BasePlate = new CubeObject(this.BasePlateGeom, this.BasePlateMat, false);

        this.GameObjectRef = GameObject;
        this.GameObjectRef.scene.add(this.BasePlate);


    }
}