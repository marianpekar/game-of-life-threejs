class Gui {
    constructor(game) {
        this.game = game;
        this.controller = this.game.controller;
        this.world = this.game.world;
        this.settings = this.game.settings;
        this.appearance = this.game.appearance;

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
            underpopulated: game.rules.underpopulated,
            overpopulated: game.rules.overpopulated,
            ideal: game.rules.ideal
        }

        this.setupCursorFolder();
        this.setupWorldFolder();
        this.setupAppearanceFolder();
        this.setupSimulationFolder();
        this.setupRulesFolder();
        this.setupSourceCodeLinkButton();
    }

    setupCursorFolder() {
        const cursorControlls = this.gui.addFolder("Cursor")
        cursorControlls.add(this.cursorPosition, 'x', 0, this.world.width - 1).name('X').step(1).onChange(this.updateCursorPosition.bind(this));
        cursorControlls.add(this.cursorPosition, 'y', 0, this.world.width - 1).name('Y').step(1).onChange(this.updateCursorPosition.bind(this));
        cursorControlls.add(this.cursorPosition, 'z', 0, this.world.width - 1).name('Z').step(1).onChange(this.updateCursorPosition.bind(this));

        const toggleButton = { toggle: () => { 
            this.game.toggleCellAtCoords((this.controller.cursor.position)); 
        }};
        cursorControlls.add(toggleButton, 'toggle').name("Toggle Cell");
        cursorControlls.open();

        this.setupRandomizeNBRsFolder(cursorControlls);
    }

    setupRandomizeNBRsFolder(parentFolder) {
        const randomizeNbrsFolder = parentFolder.addFolder("Randomize NBRs");
        const randomizeAroundCursorButton = { randomize: () => {
            this.game.randomizeNeighbors(this.controller.cursor.position, this.nbrsBecomeAliveProbability)
        }};
        randomizeNbrsFolder.add(this, 'nbrsBecomeAliveProbability', 0.1, 1).name('Probability').step(0.1);
        randomizeNbrsFolder.add(randomizeAroundCursorButton, 'randomize').name('Randomize');

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
        
        const clearButton = { clear: () => this.game.clear() };
        worldControlls.add(clearButton, 'clear').name("Clear");
        worldControlls.add(this.settings.appearance, 'showBorderLines').name('Show Borders').onChange(() => { this.appearance.showBorderLines(this.settings.appearance.showBorderLines) });

        const worldSerializer = new WorldSerializer(this.game);
        this.setupSaveButton(worldControlls, worldSerializer);
        this.setupOpenButton(worldControlls, worldSerializer);

        worldControlls.open();
    }

    setupSaveButton(worldControlls, worldSerializer) {
        const saveButton = { save: () => { 
            const worldSerialized = worldSerializer.serialize();
            FileIO.saveAs(worldSerialized, `world-${Date.now()}.txt`);
        }};
        worldControlls.add(saveButton, 'save').name("Save As...");
    }

    setupOpenButton(worldControlls, worldSerializer) {
        this.fileIO = new FileIO(worldSerializer);
        const openButton = { open: () => {
            this.fileIO.open();
        }};
        worldControlls.add(openButton, 'open').name("Open...");
    }

    setupAppearanceFolder() {
        const appearanceControlls = this.gui.addFolder("Cells Appearance");

        appearanceControlls.add(this.settings.appearance, 'showNormalMaterial').name('Show Normal').onChange(() => this.appearance.showCubesNormalMaterial(this.settings.appearance.showNormalMaterial));
        appearanceControlls.add(this.settings.appearance, 'materialOpacity', 0.01, 1).name('Opacity').step(0.01).onChange(() => this.appearance.setMaterialOpacity(this.settings.appearance.materialOpacity));
        appearanceControlls.addColor(this.settings.appearance, 'materialColor').name('Color').onChange(() => this.appearance.setCubesMaterialColor(this.settings.appearance.materialColor));
    }


    setupSimulationFolder() {
        const simulationControlls = this.gui.addFolder("Simulation");

        this.stepButton = { step: () => this.game.step() };
        simulationControlls.add(this.stepButton, 'step').name("Step");

        simulationControlls.add(this.simulation, 'speed', 0.25, 2).name('Speed').step(0.25).onChange(this.setSimulationSpeed.bind(this));
        simulationControlls.add(this.simulation, 'isRunning').name('Run').onChange(this.switchSimulationState.bind(this));

        simulationControlls.open();
    }

    switchSimulationState() {
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

    setupSourceCodeLinkButton() {
        const linkSourceButton = { link: () => {
            window.open(game.settings.sourceCodeLink);    
        }};
        this.gui.add(linkSourceButton, 'link').name("🔗 GitHub");
    }
}