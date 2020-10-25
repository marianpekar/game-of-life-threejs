let world = new World(30, 30, 30);

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

let cubes = [];

let renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshPhongMaterial({
    color: 0x00ff00,
    opacity: 0.5,
    transparent: true,
});

camera.position.set(world.width * 1.5, world.lenght * 1.5, world.lenght * 1.5);  

controls = new THREE.OrbitControls( camera, renderer.domElement ); 

function addLight(...pos) {
    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(...pos);
    scene.add(light);
  }
addLight(-1, 2, 4);
addLight( 1, -1, -2);

let firstElement = world.getElementByCoords(15,15,15).born();
let neighours = world.getElementNeighbors(firstElement);
neighours.forEach(n => {
    if(Math.random() >= 0.5)
        n.born();
})

world.elements.forEach(e => {
    if(e != undefined) {
        const cube = new THREE.Mesh( geometry, material );

        cube.position.x = e.position.x;
        cube.position.y = e.position.y;
        cube.position.z = e.position.z;
        
        cube.visible = e.isAlive;

        scene.add( cube );
        cubes.push( cube );
    }
})

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
};
animate();

function countAliveNeighbors(element) {
    const neighours = world.getElementNeighbors(element);
    let counter = 0;
    neighours.forEach(n => {
        if(n != undefined) {
            if(n.isAlive)
            counter++;
        }
    });
    return counter;
}

function step() {
    for(let i = 0; i < world.elements.length; i++) {
        e = world.elements[i];
        let aliveNeighbors = countAliveNeighbors(e);

        if(e.isAlive) 
        {
            if(aliveNeighbors < 2) {
                e.shouldDie = true;
                continue;
            }
            else if(aliveNeighbors > 3) {
                e.shouldDie = true;
                continue;
            }
        }
        else if(!e.isAlive) 
        {
            if(aliveNeighbors == 3)
                e.shouldBorn = true;
                continue
        }
    }

    for(let i = 0; i < world.elements.length; i++) {
        e = world.elements[i];
        if(e.shouldDie && e.isAlive) {
            e.die();
        }
        if (e.shouldBorn && !e.isAlive) {
            e.born();
        }

        cubes[i].visible = e.isAlive;

        e.shouldBorn = false;
        e.shouldDie = false;
    }
}

document.addEventListener( 'keydown', onKeyDown, false );

function onKeyDown(event) {
    if(event.keyCode == 32) {
        step();
    }
}