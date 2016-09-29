/**
 * Created by hindr on 9/14/2016.
 */

class PoolTable
{
    constructor(width, height)
    {
        let tcl = new THREE.TextureLoader();

        let aM = tcl.load("imgs/carpet.jpg");

        aM.wrapS = aM.wrapT = THREE.RepeatWrapping;
        aM.repeat.set(width / 2, height / 2);

        this.basePlateGeom = new THREE.BoxGeometry(width, 0.2 ,height);
        this.basePlateMat = new THREE.MeshPhysicalMaterial({
            map : aM,
            roughness : 0.78,
            reflectivity : 0.95,
            metalness : 0.15
        });


        this.basePlate = new CubeObject(this.basePlateGeom, this.basePlateMat, false);
        GAME.scene.add(this.basePlate.mesh);

        this.standMat = new THREE.MeshPhysicalMaterial({
            reflectivity : 0.6,
            metalness : 0.7,
            roughnessMap : tcl.load("imgs/wood_roughness.jpg"),
            map : tcl.load("imgs/wood.jpg"),
            side: THREE.DoubleSide
        });

        this.sideMat = new THREE.MeshPhysicalMaterial({
            color: "brown",
            reflectivity : 0.6,
            metalness : 0.7,
            roughness : 0.8,
            side: THREE.DoubleSide
        });


        this.standGeom = new THREE.BoxGeometry(width * 0.9, 2.5, height * 0.9);

        this.lrSideBORDER = new THREE.BoxGeometry(width * 0.025, 0.5, height * 1.05);
        this.tdSideBORDER = new THREE.BoxGeometry(width * 1.2 - (2 * width * 0.05) , 0.5, width * 0.025);

        this.tdSide = new THREE.BoxGeometry(width * 0.985 - (2 * width * 0.105) / 2 , 0.5, width * 0.05);

        this.lrSideDown = new THREE.BoxGeometry(width * 0.05, 0.5, height * 0.89 / 2);
        this.lrSideTop = new THREE.BoxGeometry(width * 0.05, 0.5, height * 0.89 / 2);

        this.SideDL = new CubeObject(this.lrSideDown, this.sideMat, false);
        this.SideTL = new CubeObject(this.lrSideTop, this.sideMat, false);

        this.SideDR = new CubeObject(this.lrSideDown, this.sideMat, false);
        this.SideTR = new CubeObject(this.lrSideTop, this.sideMat, false);

        this.BORDERR = new CubeObject(this.lrSideBORDER, this.sideMat, false);
        this.BORDERL = new CubeObject(this.lrSideBORDER, this.sideMat, false);

        this.BORDERT = new CubeObject(this.tdSideBORDER, this.sideMat, false);
        this.BORDERD = new CubeObject(this.tdSideBORDER, this.sideMat, false)

        this.topSide = new CubeObject(this.tdSide, this.sideMat, false);
        this.downSide = new CubeObject(this.tdSide, this.sideMat, false);

        this.SideDR.translate(width/2, 2.63, height / 4 - 0.05);
        this.SideTR.translate(width/2, 2.63, - height / 4 + 0.05);

        this.SideDL.translate(-width/2, 2.63, height / 4 - 0.05);
        this.SideTL.translate(-width/2, 2.63, - height / 4 + 0.05);

        this.BORDERR.translate(-width/2 - 0.1875, 2.63, 0);
        this.BORDERL.translate(width/2 + 0.1875, 2.63, 0);

        this.BORDERD.translate(0, 2.63, - height / 2 - 0.2625);
        this.BORDERT.translate(0, 2.63,   height / 2 + 0.2625);

        this.topSide.translate(0, 2.63, -height/ 2 - 0.075);
        this.downSide.translate(0, 2.63, height / 2 + 0.075);

        GAME.scene.add(this.BORDERR.mesh);
        GAME.scene.add(this.BORDERL.mesh);

        GAME.scene.add(this.BORDERD.mesh);
        GAME.scene.add(this.BORDERT.mesh);

        GAME.scene.add(this.SideDR.mesh);
        GAME.scene.add(this.SideDL.mesh);

        GAME.scene.add(this.SideTR.mesh);
        GAME.scene.add(this.SideTL.mesh);

        GAME.scene.add(this.topSide.mesh);
        GAME.scene.add(this.downSide.mesh);


        this.standMesh = new THREE.Mesh(this.standGeom, this.standMat);
        this.standMesh.position.y = 1.225;

        this.basePlate.translate(0, 2.5, 0);
        this.basePlate.mesh.position.y = 2.5;
        GAME.scene.add(this.standMesh);
    }
}