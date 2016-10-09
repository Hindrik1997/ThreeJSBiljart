class PoolTable
{
    constructor(width, height)
    {
        let tcl = new THREE.TextureLoader();

        let aM = tcl.load("imgs/carpet.jpg");

        aM.wrapS = aM.wrapT = THREE.RepeatWrapping;
        aM.repeat.set(width / 4, height / 4);

        let basePlateGeom = new THREE.BoxGeometry(width, 0.2 ,height);
        let basePlateMat = new THREE.MeshPhysicalMaterial({
            map : aM,
            roughness : 0.78,
            reflectivity : 0.95,
            metalness : 0.15
        });

       this.basePlate = new CubeObject(basePlateGeom, basePlateMat, false);

        let standMat = new THREE.MeshPhysicalMaterial({
            reflectivity : 0.6,
            metalness : 0.7,
            roughnessMap : tcl.load("imgs/wood_roughness.jpg"),
            map : tcl.load("imgs/wood.jpg"),
            side: THREE.DoubleSide
        });

        let sideMat = new THREE.MeshPhysicalMaterial({
            color: "brown",
            reflectivity : 0.6,
            metalness : 0.7,
            roughness : 0.8,
            side: THREE.DoubleSide
        });


        let standGeom = new THREE.BoxGeometry(width * 0.9, 2.5, height * 0.9);

        let lrSideBORDER = new THREE.BoxGeometry(width * 0.025, 0.5, height * 1.05);
        let tdSideBORDER = new THREE.BoxGeometry(width * 1.2 - (2 * width * 0.05) , 0.5, width * 0.025);

        let tdSide = new THREE.BoxGeometry(width * 0.985 - (2 * width * 0.105) / 2 , 0.5, width * 0.05);

        let lrSideDown = new THREE.BoxGeometry(width * 0.05, 0.5, height * 0.89 / 2);
        let lrSideTop = new THREE.BoxGeometry(width * 0.05, 0.5, height * 0.89 / 2);

        let sideDL = new CubeObject(lrSideDown, sideMat, false);
        let sideTL = new CubeObject(lrSideTop, sideMat, false);
        let sideDR = new CubeObject(lrSideDown, sideMat, false);
        let sideTR = new CubeObject(lrSideTop, sideMat, false);

        let borderR = new CubeObject(lrSideBORDER, sideMat, false);
        let borderL = new CubeObject(lrSideBORDER, sideMat, false);

        let borderT = new CubeObject(tdSideBORDER, sideMat, false);
        let borderD = new CubeObject(tdSideBORDER, sideMat, false);

        let topSide = new CubeObject(tdSide, sideMat, false);
        let downSide = new CubeObject(tdSide, sideMat, false);

        sideDR.translate(width/2, 2.63, height / 4 - 0.05);
        sideTR.translate(width/2, 2.63, - height / 4 + 0.05);

        sideDL.translate(-width/2, 2.63, height / 4 - 0.05);
        sideTL.translate(-width/2, 2.63, - height / 4 + 0.05);

        borderR.translate(-width/2 - 0.1875, 2.63, 0);
        borderL.translate(width/2 + 0.1875, 2.63, 0);

        borderD.translate(0, 2.63, - height / 2 - 0.2625);
        borderT.translate(0, 2.63,   height / 2 + 0.2625);

        topSide.translate(0, 2.63, -height/ 2 - 0.075);
        downSide.translate(0, 2.63, height / 2 + 0.075);

        this.group = new THREE.Group();
        this.group.add(borderR.mesh);
        this.group.add(borderL.mesh);

        this.group.add(borderD.mesh);
        this.group.add(borderT.mesh);

        this.group.add(sideDR.mesh);
        this.group.add(sideDL.mesh);

        this.group.add(sideTR.mesh);
        this.group.add(sideTL.mesh);

        this.group.add(topSide.mesh);
        this.group.add(downSide.mesh);


        this.stand = new THREE.Mesh(standGeom, standMat);
        this.stand.position.y = 1.225;

        this.basePlate.translate(0, 2.5, 0);
        this.basePlate.mesh.position.y = 2.5;

        this.plateY = this.basePlate.mesh.position.y + this.basePlate.mesh.geometry.parameters.height / 2;

        this.group.add(this.basePlate.mesh);
        this.group.add(this.stand);
    }
}