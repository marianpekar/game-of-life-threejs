let world = new World(32, 32, 32);

const sceneSettings = {
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: 0x010b1a
}

const cameraSettings = {
    fov: 75,
    position: {
        x: world.width * 1.5,
        y: world.lenght * 1.5,
        z: world.depth * 1.5
    },
    nearClip: 0.1,
    farClip: 1000
}

let sceneManager, geometry, material;

let cubes = [];

function init() {
    setSceneManager();
    setBoxGeometry();

    bornFewRandomElements();
    populateSpace();

    new THREE.OrbitControls( sceneManager.camera, sceneManager.renderer.domElement ); 
}

function setSceneManager() {
    sceneManager = new SceneManager(sceneSettings, cameraSettings);
    sceneManager.addLight({x:-1, y: 2, z: 4}, 0xFFFFFF, 1);
    sceneManager.addLight({x: 1, y:-1, z:-2}, 0xFFFFFF, 1);
}

function setBoxGeometry() {
    geometry = new THREE.BoxGeometry();
    material = new THREE.MeshNormalMaterial({
        opacity: 0.5,
        transparent: true,
    }); 
}

function bornFewRandomElements() {
    const firstElement = world.getElementByCoords(15,15,15).born();
    const neighours = world.getElementNeighbors(firstElement);
    neighours.forEach(n => {
        if(Math.random() >= 0.5)
            n.born();
    })
}

function populateSpace() {
    world.elements.forEach(e => {
        if(e != undefined) {
            cube = sceneManager.addMesh(geometry, material, e.position, e.isAlive)
            cubes.push( cube );
        }
    })
}

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
    applyRules();
    setElementStates();
}

function applyRules() {
    for(let i = 0; i < world.elements.length; i++) {
        e = world.elements[i];
        let aliveNeighbors = countAliveNeighbors(e);

        if(e.isAlive) 
        {
            if(aliveNeighbors < 3) {
                e.shouldDie = true;
                continue;
            }
            else if(aliveNeighbors > 5) {
                e.shouldDie = true;
                continue;
            }
        }
        else if(!e.isAlive) 
        {
            if(aliveNeighbors == 5)
                e.shouldBorn = true;
                continue
        }
    }
}

function setElementStates() {
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

init();

function animate() {
    requestAnimationFrame(animate);
    sceneManager.renderer.render(sceneManager.scene, sceneManager.camera);
};
animate();