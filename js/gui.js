class Gui {
    constructor(game) {
        this.controller = game.controller;
        this.world = game.world;
        this.game = game;

        this.gui = new dat.GUI({ autoPlace: true });

        this.cursorPosition = {
            x: this.controller.cursor.position.x,
            y: this.controller.cursor.position.y,
            z: this.controller.cursor.position.z,
        }

        this.nbrsBecomeAliveProbability = 0.5;

        this.simulation = {
            isRunning: false, 
            speed: 1
        }

        this.gameRules = {
            underpopulated: 3,
            overpopulated: 7,
            ideal: 5
        }

        this.showBorderLines = true;

        this.setupCursorFolder();
        this.setupWorldFolder();
        this.setupSimulationFolder();
        this.setupRulesFolder();
    }

    setupCursorFolder() {
        const cursorControlls = this.gui.addFolder("Cursor")
        cursorControlls.add(this.cursorPosition, 'x', 0, this.world.width - 1).name('X').step(1).onChange(this.updateCursorPosition.bind(this));
        cursorControlls.add(this.cursorPosition, 'y', 0, this.world.width - 1).name('Y').step(1).onChange(this.updateCursorPosition.bind(this));
        cursorControlls.add(this.cursorPosition, 'z', 0, this.world.width - 1).name('Z').step(1).onChange(this.updateCursorPosition.bind(this));

        this.toggleButton = { toggle: () => { 
            this.game.toggleCellAtCoords(this.controller.cursor.position); 
        }};
        cursorControlls.add(this.toggleButton, 'toggle').name("Toggle Cell");
        cursorControlls.open();

        this.setupRandomizeNBRsFolder(cursorControlls);
    }

    setupRandomizeNBRsFolder(cursorControlls) {
        const randomizeNbrsFolder = cursorControlls.addFolder("Randomize NBRs");
        this.randomizeAroundCursorButton = { randomize: () => {
            this.game.setRandomNeighborsAlive(this.controller.cursor.position, this.nbrsBecomeAliveProbability)
        }};
        randomizeNbrsFolder.add(this, 'nbrsBecomeAliveProbability', 0.1, 1).name('Probability').step(0.1);
        randomizeNbrsFolder.add(this.randomizeAroundCursorButton, 'randomize').name('Randomize');

        randomizeNbrsFolder.open();
    }

    
    updateCursorPosition() {
        this.controller.setCursorPosition(this.cursorPosition.x, this.cursorPosition.y, this.cursorPosition.z);
    }

    toggleCell() {
        this.game.toggleCellAtCoords(this.cursor.position); 
    }

    setupWorldFolder() {
        const worldControlls = this.gui.addFolder("World");
        
        this.clearButton = { clear: () => { 
            this.game.clear(); 
        }};
        worldControlls.add(this.clearButton, 'clear').name("Clear");

        worldControlls.add(this, 'showBorderLines').name('Show Borders').onChange(() => { this.game.showBorderLines(this.showBorderLines) });

        worldControlls.open();
    }

    setupSimulationFolder() {
        const simulationControlls = this.gui.addFolder("Simulation");

        this.stepButton = { step: () => { 
            this.game.step(); 
        }};
        simulationControlls.add(this.stepButton, 'step').name("Step");

        simulationControlls.add(this.simulation, 'speed', 0.5, 2).name('Speed').step(0.1).onChange(this.setSimulationSpeed.bind(this));
        simulationControlls.add(this.simulation, 'isRunning').name('Run').onChange(this.switchSimulationState.bind(this));

        simulationControlls.open();
    }

    switchSimulationState() {
        this.setSimulationSpeed();

        if(this.simulation.isRunning)
            this.game.run();
        else
            this.game.stop();
    }

    setSimulationSpeed() {
        this.game.setSimulationSpeed(this.simulation.speed);
    }

    setupRulesFolder() {
        const rulesControlls = this.gui.addFolder("Rules");
        rulesControlls.add(this.gameRules, 'underpopulated', 0, 26).name('Underpopulation').step(1).onChange(this.changeRules.bind(this));
        rulesControlls.add(this.gameRules, 'overpopulated', 0, 26).name('Overpopulation').step(1).onChange(this.changeRules.bind(this));
        rulesControlls.add(this.gameRules, 'ideal', 0, 26).name('Ideal').step(1).onChange(this.changeRules.bind(this));

        rulesControlls.open();
    }

    changeRules() {
        this.game.rules = this.gameRules;
    }
}