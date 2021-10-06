window.onload = function() {
    var scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xf0f0f0 );

    var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

    var renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.getElementById("anim").appendChild(renderer.domElement);

    var light = new THREE.HemisphereLight(0x3366cc, 0x99ffdd, 1 );
    scene.add( light );
    camera.position.z = 5;

    window.addEventListener( 'resize', onWindowResize, false );

    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.fov = Math.min((window.innerHeight / window.innerWidth) * 220.0, 70.0);
        camera.updateProjectionMatrix();

        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    var lastAdd = 0.0;
    let geoms = [];
    var counter = 0;
    const ICOSAHEDRON = new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(1, 0));
    const DODECAHEDRON = new THREE.EdgesGeometry(new THREE.DodecahedronGeometry(1, 0));
    const TETRAHEDRON = new THREE.EdgesGeometry(new THREE.TetrahedronGeometry(1, 0));
    const BOX = new THREE.EdgesGeometry(new THREE.BoxGeometry(1, 1, 1));
    var animate = function (time) {
        if (time - lastAdd > 3000.0)
        {
            // Cull to maintain 12 geometries total.
            if (geoms.length >= 12)
            {
                const [wireframe, mat, rotVector, addTime] = geoms.shift();
                mat.dispose();
                scene.remove(wireframe);
            }

            // Add a new geometry every 3 seconds.
            {
                var newGeom = null;
                const selectNum = Math.random();
                if (selectNum < 0.25)
                {
                    newGeom = ICOSAHEDRON;
                }
                else if (selectNum < 0.5)
                {
                    newGeom = DODECAHEDRON;
                }
                else if (selectNum < 0.75)
                {
                    newGeom = TETRAHEDRON;
                }
                else
                {
                    newGeom = BOX;
                }
        
                var mat = new THREE.LineBasicMaterial({ color: 0x000000, linewidth: 2 });
                var wireframe = new THREE.LineSegments(newGeom, mat);
                wireframe.name = "geom_" + counter++;
                wireframe.position.x = 6.0 * Math.random() - 3.0;
                wireframe.position.y = 6.0 * Math.random() - 3.0;
                scene.add(wireframe);
        
                var rotVector = new THREE.Vector3(
                    2.0 * Math.random() - 1.0,
                    2.0 * Math.random() - 1.0,
                    2.0 * Math.random() - 1.0);

                geoms.push([wireframe, mat, rotVector, time]);
            }

            lastAdd = time;
        }

        for (const [wireframe, mat, rotVector, addTime] of geoms)
        {
            const t = (time - addTime);
            wireframe.rotation.x = rotVector.x * t / 2000.0;
            wireframe.rotation.y = rotVector.y * t / 2000.0;
            wireframe.rotation.z = rotVector.z * t / 2000.0;
            wireframe.scale.x = t / 1000.0;
            wireframe.scale.y = t / 1000.0;
            wireframe.scale.z = t / 1000.0;

            const s = Math.pow((t - 2000.0) / 4000.0, 2);
            mat.color.r = s;
            mat.color.g = s;
            mat.color.b = s;
        }

        renderer.render(scene, camera);

        requestAnimationFrame(animate);
    };

    onWindowResize();
    animate(0);
};
