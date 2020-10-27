class Game {
    constructor(gameSettings) {
        this.world = new World(gameSettings.worldSettings.width, gameSettings.worldSettings.length, gameSettings.worldSettings.depth);
        this.sceneManager = new SceneManager(gameSettings.sceneSettings, gameSettings.cameraSettings)

        this.geometry = new THREE.BoxGeometry();
        this.material = new THREE.MeshNormalMaterial({
            opacity: 0.5,
            transparent: true,
        }); 
    
        this.cubes = [];
        this.populateWorld();
    }

    populateWorld() {
        this.world.cells.forEach(c => {
            if(c != undefined) {
                let cube = this.sceneManager.addMesh(this.geometry, this.material, c.position, c.isAlive)
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

    toggleCellAtCoords(x, y, z) {
        const cell = this.world.getCellByCoords(x, y, z).toggle();
        this.cubes[cell.index].visible = cell.isAlive;
    }
}