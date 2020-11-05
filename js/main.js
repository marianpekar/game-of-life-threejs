const settings = new Settings();
const game = new Game(settings);

game.setFewRandomCellsAlive();

const gui = new Gui(game);
new THREE.OrbitControls( game.sceneManager.camera, game.sceneManager.renderer.domElement );