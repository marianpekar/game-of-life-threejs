class Game {
    constructor(settings) {
        this.settings = settings.allSettings;
        this.rules = this.settings.game.rules;

        this.boxGeometry = new THREE.BoxGeometry();

        this.world = new World(this.settings.world.width, this.settings.world.height, this.settings.world.depth);
        this.sceneManager = new SceneManager(this.settings.scene, this.settings.camera)
        this.controller = new Controller(this);

        this.cubes = [];
        this.appearance = new Appearance(this);

        this.populateWorld();

        //this.sceneManager.addAmbientLight(this.settings.scene.ambientLightColor);
        this.sceneManager.addLight({x:-1, y: 2, z: 4}, 0xFFFFFF, 1);
        this.sceneManager.addLight({x: 1, y:-1, z:-2}, 0xFFFFFF, 1);

        this.isRunning = false;
        this.simulationSpeed = 1; // 1 = one step per second
        this.timers = [];
    }

    populateWorld() {
        this.world.cells.forEach(c => {
            if(c != undefined) {
                let cube = this.sceneManager.addMesh(this.boxGeometry, this.appearance.selectedMaterial, c.position, c.isAlive)
                this.cubes.push(cube);
            }
        });
    }
 
    randomizeNeighbors(position, probability) {
        const centerCell = this.world.getCellByCoords(position.x, position.y, position.z);
        const neighbors = this.world.getCellNeighbors(centerCell);
        neighbors.forEach(n => {
            if(Math.random() >= 1.0 - probability && n != undefined) 
                n.born();
            else
                n.die();
        });

        this.setCellStates();
    }

    step() {
        this.applyRules();
        this.setCellStates();
    }

    run() {
        // first stop and remove all previous intervals
        stop();

        // now set the new one
        this.timers.push(setInterval(this.step.bind(this), 1000 / this.simulationSpeed));
        this.isRunning = true;
    }

    stop() {
        if(!this.isRunning)
            return;

        this.timers.forEach(t => {
            clearInterval(t);
        });

        this.timers = [];
        this.isRunning = false;
    }

    setSimulationSpeed(speed) {
        if(this.isRunning) {
            this.stop();
            this.simulationSpeed = speed;
            this.run();
            
            return;
        }

        this.simulationSpeed = speed;
    }

    applyRules() {
        for(let i = 0; i < this.world.cells.length; i++) {
            const cell = this.world.cells[i];
            let aliveNeighbors = this.countAliveNeighbors(cell);
    
            if(cell.isAlive) 
            {
                if(aliveNeighbors <= this.rules.underpopulated) {
                    cell.shouldDie = true;
                    continue;
                }
                else if(aliveNeighbors >= this.rules.overpopulated) {
                    cell.shouldDie = true;
                    continue;
                }
            }
            else if(!cell.isAlive) 
            {
                if(aliveNeighbors == this.rules.ideal)
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

    updateCubesVisibility() {
        for(let i = 0; i < this.world.cells.length; i++) {
            const cell = this.world.cells[i]; 
            this.cubes[i].visible = cell.isAlive;
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