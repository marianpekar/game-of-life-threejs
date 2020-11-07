const settings = new Settings();
const game = new Game(settings);

game.randomizeNeighbors(game.world.center, 1);

const gui = new Gui(game);
new THREE.OrbitControls( game.sceneManager.camera, game.sceneManager.renderer.domElement );