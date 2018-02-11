window.onload = function() {
    var scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xf6f6f6 );

    var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

    var renderer = new THREE.WebGLRenderer( {antialias: true} );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.getElementById("anim").appendChild( renderer.domElement );

    var geometry = new THREE.WireframeGeometry( new THREE.SphereGeometry( 5, 24, 24 ) );
    var material = new THREE.LineBasicMaterial( {
        color: 0x6699cc,
        linewidth: 1,
        opacity: 0.7,
        transparent: true,
    } );
    var line = new THREE.LineSegments( geometry, material );

    var geometry1 = new THREE.WireframeGeometry( new THREE.SphereGeometry( 6, 32, 32 ) );
    var material1 = new THREE.LineBasicMaterial( {
        color: 0xff6688,
        linewidth: 1,
        opacity: 0.6,
        transparent: true,
    } );
    var line1 = new THREE.LineSegments( geometry1, material1 );

    var geometry2 = new THREE.WireframeGeometry( new THREE.SphereGeometry( 7, 16, 16 ) );
    var material2 = new THREE.LineBasicMaterial( {
        color: 0x66cc99,
        linewidth: 1,
        opacity: 0.8,
        transparent: true,
    } );
    var line2 = new THREE.LineSegments( geometry2, material2 );
    line2.position.x = -2.0;

    scene.add( line );
    scene.add( line1 );
    scene.add( line2 );

    camera.position.z = 5;

    window.addEventListener( 'resize', onWindowResize, false );

    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.fov = Math.min((window.innerHeight / window.innerWidth) * 220.0, 70.0);
        camera.updateProjectionMatrix();

        renderer.setSize( window.innerWidth, window.innerHeight );
    }

    var animate = function (time) {
        line.rotation.x = time / 10000.0;
        line1.rotation.y = time / 12000.0;
        line2.rotation.z = time / 8000.0;
        line1.position.x = Math.sin(time / 3000.0) * 2.0;
        line2.position.x = Math.cos(time / 4000.0) * 1.0;

        renderer.render(scene, camera);

        requestAnimationFrame( animate );
    };

    onWindowResize();
    animate(0);
};
