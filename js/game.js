class Game {
    constructor(settings) {
        this.settings = settings;

        this.boxGeometry = new THREE.BoxGeometry();
        this.cellMaterial = new THREE.MeshNormalMaterial({ opacity: 0.5, transparent: true });

        this.world = new World(this.settings.world.width, this.settings.world.length, this.settings.world.depth);
        this.sceneManager = new SceneManager(this.settings.scene, this.settings.camera)
        this.controller = new Controller(this);

        this.cubes = [];
        this.populateWorld();

        this.sceneManager.addAmbientLight(this.settings.scene.ambientLightColor);
    }

    populateWorld() {
        this.world.cells.forEach(c => {
            if(c != undefined) {
                let cube = this.sceneManager.addMesh(this.boxGeometry, this.cellMaterial, c.position, c.isAlive)
                this.cubes.push(cube);
            }
        });
    }

    setFewRandomCellsAlive() {
        const initialCell = this.world.getCellByCoords(15, 15, 15).born();
        const neighbors = this.world.getCellNeighbors(initialCell);
        neighbors.forEach(n => {
            if(Math.random() >= 0.5)
                n.born();
        });

        this.setCellStates();
    }

    step() {
        this.applyRules();
        this.setCellStates();
    }

    applyRules() {
        for(let i = 0; i < this.world.cells.length; i++) {
            const cell = this.world.cells[i];
            let aliveNeighbors = this.countAliveNeighbors(cell);
    
            if(cell.isAlive) 
            {
                if(aliveNeighbors < 3) {
                    cell.shouldDie = true;
                    continue;
                }
                else if(aliveNeighbors > 5) {
                    cell.shouldDie = true;
                    continue;
                }
            }
            else if(!cell.isAlive) 
            {
                if(aliveNeighbors == 5)
                    cell.shouldBorn = true;
                    continue
            }
        }
    }

    countAliveNeighbors(cell) {
        const neighbors = this.world.getCellNeighbors(cell);
        let counter = 0;
        neighbors.forEach(n => {
            if(n != undefined) {
                if(n.isAlive)
                counter++;
            }
        });
        return counter;
    }

    setCellStates() {
        for(let i = 0; i < this.world.cells.length; i++) {
            const cell = this.world.cells[i];
            if(cell.shouldDie && cell.isAlive) {
                cell.die();
            }
            if (cell.shouldBorn && !cell.isAlive) {
                cell.born();
            }
    
            this.cubes[i].visible = cell.isAlive;
    
            cell.shouldBorn = false;
            cell.shouldDie = false;
        }
    }

    toggleCellAtCoords(position) {
        const cell = this.world.getCellByCoords(position.x, position.y, position.z).toggle();
        this.cubes[cell.index].visible = cell.isAlive;
    }

    clear() {
        this.world.cells.forEach(c => {
            c.isAlive = false;
            this.cubes[c.index].visible = c.isAlive;
        });
    }
}