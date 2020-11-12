class WorldSerializer {
    constructor(game) {
        this.game = game;
        this.world = this.game.world;
    }

    serialize() {
        return JSON.stringify(this.worldToArrayOfAliveCells(this.world));
    }

    deserialize(jsonStringOfAliveCells) {
        const aliveCellsIndexes = JSON.parse(jsonStringOfAliveCells);
        this.arrayOfLifeCellsToWorld(aliveCellsIndexes);
        this.game.updateCubesVisibility();
    }

    worldToArrayOfAliveCells() {
        let aliveCellsIndexes = [];
        this.world.cells.forEach(cell => {
            if(cell.isAlive)
                aliveCellsIndexes.push(cell.index);
        });

        return aliveCellsIndexes;
    }

    arrayOfLifeCellsToWorld(aliveCellsIndexes) {
        this.game.clear();
        
        aliveCellsIndexes.forEach(cellIndex => {
            this.world.cells[cellIndex].isAlive = true;
        });
    }
}