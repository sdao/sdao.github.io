window.onload = function() {
    var scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xf6f6f6 );

    var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

    var renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.getElementById("anim").appendChild(renderer.domElement);

    var geometry = new THREE.SphereGeometry(5, 10, 10);
    var material = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        flatShading: true,
        metalness: 0.1,
        side: THREE.BackSide
    });
    var mesh = new THREE.Mesh(geometry, material);
    scene.add( mesh );

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

    var animate = function (time) {
        var t = time + 14000.0;
        mesh.rotation.x = t / 12000.0;
        mesh.rotation.y = t / 8000.0;
        mesh.rotation.z = t / 24000.0;
        light.color.r = 0.5 + 0.1 * Math.sin(t / 4000.0);
        light.color.g = 0.5 + 0.2 * Math.cos(t / 6000.0);
        light.color.b = 0.5 + 0.3 * Math.cos(t / 8000.0);
        light.groundColor.r = 0.5 + 0.3 * Math.cos(t / 12000.0);
        light.groundColor.r = 0.5 + 0.5 * Math.cos(t / 8000.0);
        light.groundColor.r = 0.5 + 0.4 * Math.cos(t / 6000.0);

        renderer.render(scene, camera);

        requestAnimationFrame(animate);
    };

    onWindowResize();
    animate(0);
};
