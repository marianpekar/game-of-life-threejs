const settings = new Settings();
const game = new Game(settings);

game.setRandomNeighborsAlive(game.world.center, 0.5);

const gui = new Gui(game);
new THREE.OrbitControls( game.sceneManager.camera, game.sceneManager.renderer.domElement );